using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhotoAlbum.Core.Entities;
using PhotoAlbum.Data;

namespace PhotoAlbum.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PictureController : Controller
    {
        private readonly DataContext _context;

        public PictureController(DataContext context)
        {
            _context = context;
        }


        // POST: api/pictures
        // מתודה להוספת תמונה חדשה
        [HttpPost]
        public async Task<ActionResult<Picture>> AddPicture([FromBody] Picture picture)
        {
            if (picture == null)
            {
                return BadRequest("הנתונים שהתקבלו ריקים.");
            }

            // אם נשלחו תגיות עם התמונה (רשימת PictureTags) – נבדוק שהתגיות קיימות במסד הנתונים
            if (picture.PictureTags != null && picture.PictureTags.Any())
            {
                foreach (var pictureTag in picture.PictureTags)
                {
                    // בדיקה האם התגית עם המזהה הנתון קיימת
                    bool tagExists = await _context.Tags.AnyAsync(t => t.TagId == pictureTag.TagId);
                    if (!tagExists)
                    {
                        return BadRequest($"תגית עם מזהה {pictureTag.TagId} לא קיימת.");
                    }
                }
            }

            // הוספת האובייקט למסד הנתונים ושמירה
            _context.Pictures.Add(picture);
            await _context.SaveChangesAsync();

            // מחזירים תגובת Created עם המידע של התמונה שנוצרה
            return CreatedAtAction(nameof(GetPicture), new { id = picture.Id }, picture);
        }

        // GET: api/pictures/{id}
        // מתודה לקריאת תמונה על פי מזהה, המשמשת גם ליצירת ה-URI בהודעת CreatedAtAction
        [HttpGet("{id}")]
        public async Task<ActionResult<Picture>> GetPicture(int id)
        {
            var picture = await _context.Pictures
                .Include(p => p.PictureTags)
                .ThenInclude(pt => pt.Tag)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (picture == null)
            {
                return NotFound();
            }

            return picture;
        }
    }
}
