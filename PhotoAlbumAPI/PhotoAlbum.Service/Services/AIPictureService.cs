using Microsoft.Extensions.Configuration;
using PhotoAlbum.Core.Dto;
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

        public AIPictureService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<string> AnalyzeImageAsync(PictureDto imageRequest)
        {
            // המרת התמונה ל-base64 ושליחת הבקשה ל-Gemini
            //var base64Image = Convert.ToBase64String(imageRequest.Base64ImageData);
            var base64Image = imageRequest.Base64ImageData;


            var requestBody = new
            {
                contents = new[]
                {
                new
                {
                    parts = new object[]
                    {
                        new { text = "תאר לי את התמונה" },
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

            var apiKey = _configuration["Gemini:ApiKey"]; // שמור את המפתח ב-secret
            var response = await _httpClient.PostAsync($"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={apiKey}", content);

            return await response.Content.ReadAsStringAsync();
        }
    }
}
