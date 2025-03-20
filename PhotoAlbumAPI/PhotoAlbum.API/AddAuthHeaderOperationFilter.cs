using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace PhotoAlbum.API
{
    public class AddAuthHeaderOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            // לדוגמה, נניח שבנתיב (RelativePath) מופיעים "login" או "register" עבור הפעולות האלו
            var path = context.ApiDescription.RelativePath.ToLower();
            if (path.Contains("login") || path.Contains("register"))
            {
                // אם זו אחת מהפעולות הללו, לא מוסיפים את הפרמטר
                return;
            }

            if (operation.Parameters == null)
                operation.Parameters = new List<OpenApiParameter>();

            operation.Parameters.Add(new OpenApiParameter
            {
                Name = "Authorization",
                In = ParameterLocation.Header,
                Required = false, // שנה ל-true אם צריך
                Description = "Bearer token (לדוגמא: Bearer eyJhbGciOiJIUzI1NiIsInR...)",
                Schema = new OpenApiSchema { Type = "string" }
            });
        }
    }
}
