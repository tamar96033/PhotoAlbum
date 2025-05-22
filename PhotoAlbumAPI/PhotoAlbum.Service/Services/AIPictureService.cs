using Microsoft.Extensions.Configuration;
using PhotoAlbum.Core.Dto;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Core.IRepositories;
using PhotoAlbum.Core.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static PhotoAlbum.Service.Services.AIPictureService;

namespace PhotoAlbum.Service.Services
{
    public class AIPictureService : IAIPictureService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly IAlbumRepository _albumRepository;
        private readonly IAlbumService _albumService;
        private readonly IPictureRepository _pictureRepository;
        private readonly IRepositoryManager _repositoryManager;

        public AIPictureService(HttpClient httpClient, IConfiguration configuration, IAlbumRepository albumRepository, IAlbumService albumService, IPictureRepository pictureRepository, IRepositoryManager repositoryManager)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _albumRepository = albumRepository;
            _albumService = albumService;
            _pictureRepository = pictureRepository;
            _repositoryManager = repositoryManager;
        }

        //public async Task<string> AnalyzeImageAsync(PictureDto imageRequest)
        //{
        //    // המרת התמונה ל-base64 ושליחת הבקשה ל-Gemini
        //    //var base64Image = Convert.ToBase64String(imageRequest.Base64ImageData);
        //    var base64Image = imageRequest.Base64ImageData;

        //    var albums = await _albumService.GetAlbumsAsync();
        //    var albumNames = albums?.Select(a => $"'{a.Title}'").ToList() ?? new List<string>();
        //    var albumsListString = string.Join(", ", albumNames);

        //    var promptText = $"הבן את התמונה המצורפת וכתוב רק את שם האלבום המתאים ביותר מתוך הרשימה הבאה: {albumsListString}. תן את התשובה בשפה בה שלחתי את שם האלבום, ללא מילים נוספות.";

        //    var requestBody = new
        //    {
        //        contents = new[]
        //        {
        //        new
        //        {
        //            parts = new object[]
        //            {
        //                new { text = promptText },
        //                new {
        //                    inline_data = new {
        //                        mime_type = "image/jpeg",
        //                        data = base64Image
        //                    }
        //                }
        //            }
        //        }
        //    }
        //    };

        //    var json = JsonSerializer.Serialize(requestBody);
        //    var content = new StringContent(json, Encoding.UTF8, "application/json");

        //    var apiKey = _configuration["Gemini:ApiKey"]; // שמור את המפתח ב-secret
        //    var response = await _httpClient.PostAsync($"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={apiKey}", content);

        //    return await response.Content.ReadAsStringAsync();
        //}
        public async Task<string> AnalyzeImageAsync(PictureDto imageRequest, int id)
        {
            var base64Image = imageRequest.Base64ImageData;

            // 1. בניית רשימת שמות האלבומים
            var albums = await _albumRepository.GetAlbumsByUserIdAsync(id);
            var titles = albums?.Select(a => $"'{a.Title}'") ?? Enumerable.Empty<string>();
            var prompt = $"הבן את התמונה המצורפת וכתוב רק את שם האלבום המתאים ביותר מתוך הרשימה הבאה: {string.Join(", ", titles)}. תן את התשובה כפי שהיא ללא מילים נוספות. אם זה לא מתאים לשום ערך תתן את הערך 'others";

            // 2. קריאה ל‑Gemini
            //var requestBody = new { /* … כמו קודם … */ };
                var requestBody = new
                {
                    contents = new[]
                    {
                    new
                    {
                        parts = new object[]
                        {
                            new { text = prompt },
                            new {
                                inline_data = new {
                                    mime_type = "image/jpeg",
                                    data = base64Image
                                }
                            }
                        }
                    }
                }
                };
            var json = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var apiKey = _configuration["Gemini:ApiKey"];

            var geminiResp = await _httpClient.PostAsync(
                $"https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key={apiKey}",
                content);

            var geminiJson = await geminiResp.Content.ReadAsStringAsync();
            var albumTitle = ExtractAlbumName(geminiJson); // פונקציה קטנה שפשוט שולפת את המחרוזת החוזרת

            // 3. אחזור / יצירת האלבום
            //var album = await _albumRepository.GetByTitleAsync(albumTitle)
            //          ?? _albumRepository.AddAlbumAsync(new Album { Title = albumTitle });

            var album = await _albumRepository.GetByTitleAsync(albumTitle);

            if (album == null)
            {
                album = new Album { Title = albumTitle, UserId = imageRequest.UserId };
                await _albumRepository.AddAlbumAsync(album);
            }
            // 4. יצירת ה‑Picture ושיוך לאלבום
            var picture = new Picture
            {
                Name = imageRequest.Name,
                Url = imageRequest.Url,
                Album = album,           // קישור לאלבום
                AlbumId = album.Id,
                UserId = imageRequest.UserId,
                // …שדות נוספים…
            };

            _pictureRepository.AddPicture(picture);
            await _repositoryManager.SaveAsync();

            //return geminiJson; // או רק albumTitle אם זה מה שאתה צריך
            return albumTitle;
        }

        private string ExtractAlbumName(string geminiJson)
        {
            using var document = JsonDocument.Parse(geminiJson);
            var root = document.RootElement;

            // עבור לתוך המבנה JSON עד שתגיע לתוצאה
            var text = root
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();

            return text?.Trim() ?? string.Empty;
        }
    }
}
