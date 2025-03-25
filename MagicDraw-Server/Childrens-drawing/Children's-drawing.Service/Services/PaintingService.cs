using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Children_s_drawing.Core.Entities;
using Children_s_drawing.Core.InterfacesRepositories;
using Children_s_drawing.Core.InterfacesServices;
using Childrens_drawing.Core.Dtos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using dotenv.net;
using Microsoft.AspNetCore.Http;
using ServiceStack.Text;

namespace Children_s_drawing.Service.Services
{
    public class PaintingService : IPaintingService
    {
        readonly IRepositoryManager _repositoryManager;
        readonly IMapper _mapper;

        public PaintingService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }
        public async Task<PaintingDto> AddAsync(PaintingDto paintingDto, IFormFile image)
        {
            var painting = _mapper.Map<Painting>(paintingDto);

            var user = await _repositoryManager._userRepository.GetByIdAsync(painting.UserId);
            if (user == null)
            {
                throw new Exception("User not found");
            }
            user.Paintings.Add(painting);

            var category = await _repositoryManager._categoryRepository.GetByNameAsync(paintingDto.Category);
            if (category == null)
            {
                throw new Exception("Category not found");
            }
            category.Paintings.Add(painting);

            // Set the CategoryId property
            painting.CategoryName = category.CategoryName;
            var url = await UploadToCloud(image);
            if (url == null)
                return null;
            painting.Url = url.ToString();

            painting = await _repositoryManager._paintingRepository.AddAsync(painting);
            if (painting != null)
            {
                await _repositoryManager.SaveAsync(); // Save changes to the database
            }

            return _mapper.Map<PaintingDto>(painting); // Return the PaintingDto
        }

        public async Task<bool> DeleteByIdAsync(Guid id)
        {
            bool succeed = await _repositoryManager._paintingRepository.DeleteByIdAsync(id);
            if (succeed)
                await _repositoryManager.SaveAsync();
            return succeed;
        }

        public async Task<IEnumerable<PaintingDto>> GetAllAsync()
        {
            var paintings = await _repositoryManager._paintingRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<PaintingDto>>(paintings);
        }

        public async Task<PaintingDto?> GetByIdAsync(Guid id)
        {
            var painting = await _repositoryManager._paintingRepository.GetByIdAsync(id);
            if (painting == null)
                return null;
            return _mapper.Map<PaintingDto>(painting);
        }

        public async Task<PaintingDto?> UpdateByIdAsync(Guid id, PaintingDto p)
        {
            var painting = _mapper.Map<Painting>(p);
            painting = await _repositoryManager._paintingRepository.UpdateByIdAsync(id, painting);
            if (painting != null)
                await _repositoryManager.SaveAsync();
            return _mapper.Map<PaintingDto>(painting);
        }

        private async Task<Uri> UploadToCloud(IFormFile imageFile)
        {
            // טען את קובץ ה-.env
            DotEnv.Load();
            Console.WriteLine(Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME"));
            // קבל את הערכים
            var cloudName = Environment.GetEnvironmentVariable("CLOUDINARY_CLOUD_NAME");
            var apiKey = Environment.GetEnvironmentVariable("CLOUDINARY_API_KEY");
            var apiSecret = Environment.GetEnvironmentVariable("CLOUDINARY_API_SECRET");

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
