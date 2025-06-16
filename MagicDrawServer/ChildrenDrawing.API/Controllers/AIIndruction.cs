using System.Net.Http.Headers;
using System.Text;
using dotenv.net;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.IO;
using System.Text.Json;
using Childrens_drawing.API.PostModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Childrens_drawing.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AIIndruction : ControllerBase
    {
        private readonly HttpClient _httpClient;
        //private const string Prompt = "Color the image.";

        public AIIndruction(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpPost("aiDrawingInstructions")]
        public async Task<string> AiDrawingInstructions([FromBody] ImageUrl imageUrl)
        {
            var base64Image = await ConvertImageToBase64Async(imageUrl.Path);

            DotEnv.Load();
            var apiKey = Environment.GetEnvironmentVariable("API_KEY");
            var endpoint = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={apiKey}";

            var payload = new
            {
                contents = new[]
                {
                     new {
                        parts = new object[]
                        {
                            new { text = "ללא פתיח תכתוב את הכותרת הוראות לצביעה: תכתוב בסוף איחולי צביעה מהנה .תן לי הוראות מפורטות איך לצבוע את התמונה הנתונה, תן פרוט על כל אלמנט בתמונה באיזה צבע לצבוע אותו" },
                            new {
                                inlineData = new {
                                mimeType = "image/jpeg",
                                data = base64Image
                                }
                            }
                        }
                     }
                }
            };

            var json = System.Text.Json.JsonSerializer.Serialize(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync(endpoint, content);
            var result = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                return $"API Error: {result}";
            }

            using JsonDocument doc = JsonDocument.Parse(result);
            var root = doc.RootElement;

            if (root.TryGetProperty("candidates", out var candidates) &&
                candidates.GetArrayLength() > 0)
            {
                var firstCandidate = candidates[0];

                if (firstCandidate.TryGetProperty("content", out var content2) &&
                    content2.TryGetProperty("parts", out var parts) &&
                    parts.GetArrayLength() > 0)
                {
                    var firstPart = parts[0];
                    if (firstPart.TryGetProperty("text", out var text))
                    {
                        return text.GetString();
                    }
                }
            }

            return "No text found in the response.";
        }

        private async Task<string> ConvertImageToBase64Async(string imageUrl)
        {
            Console.WriteLine(" first "+imageUrl);
            //imageUrl = imageUrl.Substring(2);
            Console.WriteLine("second "+imageUrl);
            using (var httpClient = new HttpClient())
            {
                // הורדת התמונה מה-URL
                byte[] imageBytes = await httpClient.GetByteArrayAsync(imageUrl);

                // המרה ל-base64
                return Convert.ToBase64String(imageBytes);
            }
        }

    }
}
