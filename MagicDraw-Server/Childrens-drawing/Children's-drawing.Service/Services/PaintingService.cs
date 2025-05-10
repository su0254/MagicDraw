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
using Childrens_drawing.Service.Services;
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
        readonly UpLoadPainting _upLoadPainting = new UpLoadPainting();

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
            Console.WriteLine(painting.CategoryName);
            var category = await _repositoryManager._categoryRepository.GetByNameAsync(painting.CategoryName);
            if (category == null)
            {
                throw new Exception("Category not found");
            }
            category.Paintings.Add(painting);

            // Set the CategoryId property
            painting.CategoryName = category.CategoryName;
            var url = await _upLoadPainting.UploadToCloud(image);
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
            var image = await _repositoryManager._paintingRepository.GetByIdAsync(id);
            var imageUrl = image.Url;
            string publicId = imageUrl.Substring(imageUrl.LastIndexOf('/') + 1).Split('.')[0];
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
            cloudinary.Api.Secure = true; // 

            // מחיקת התמונה
            var deleteParams = new DeletionParams(publicId);
            var result = cloudinary.Destroy(deleteParams);

            Console.WriteLine("תמונה נמחקה: " + result.Result);

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

        public async Task<IEnumerable<Painting>> GetPaintingsByCategoryAsync(string categoryName)
        {
            if (string.IsNullOrEmpty(categoryName))
            {
                return await Task.FromResult<IEnumerable<Painting>>(new List<Painting>());
            }
            // Check if the category exists
            var category = _repositoryManager._categoryRepository.GetByNameAsync(categoryName);
            if (category == null)
            {
                return await Task.FromResult<IEnumerable<Painting>>(new List<Painting>());
            }

            var paintings = await _repositoryManager._paintingRepository.GetPaintingsByCategoryAsync(categoryName);
            if (paintings != null)
                await _repositoryManager.SaveAsync();
            return paintings;
        }


    }
}
