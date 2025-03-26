using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using dotenv.net;
using Microsoft.AspNetCore.Http;

namespace Childrens_drawing.Service.Services
{
    internal class UpLoadPainting
    {
        public UpLoadPainting() { }
        public async Task<Uri> UploadToCloud(IFormFile imageFile)
        {
            // טען את קובץ ה-.env
            DotEnv.Load();
            Console.WriteLine(Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME"));
            // קבל את הערכים
            var cloudName = Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME");
            var apiKey = Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY");
            var apiSecret = Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET");
            Console.WriteLine($"Cloud Name: {cloudName}");
            Console.WriteLine($"API Key: {apiKey}");
            Console.WriteLine($"API Secret: {apiSecret}");


            // הגדרות עם הנתונים שלך (החלף עם הערכים האמיתיים שלך)
            var account = new Account(
                cloudName,      // שנה לערך מה-Cloudinary Dashboard
                apiKey,         // שנה לערך מה-Cloudinary Dashboard
                apiSecret       // שנה לערך מה-Cloudinary Dashboard
            );

            var cloudinary = new Cloudinary(account);
            cloudinary.Api.Secure = true; // שימוש ב-HTTPS
            try
            {
                using (var stream = new MemoryStream())
                {
                    await imageFile.CopyToAsync(stream); // העתקת הקובץ ל-MemoryStream
                    stream.Position = 0; // החזרת המצביע להתחלה

                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(imageFile.FileName, stream),
                        PublicId = imageFile.FileName,  // שם הקובץ בענן
                        Overwrite = false,  // מחיקת קובץ קודם עם אותו שם
                        Transformation = new Transformation().Width(500).Height(500).Crop("limit") // שינוי גודל
                    };
                    var uploadResult = await cloudinary.UploadAsync(uploadParams);
                    return uploadResult.SecureUrl;
                }
            }
            catch (Exception)
            {
                //Console.WriteLine(ex.Message);
                return null;
            }
        }
    }
}
