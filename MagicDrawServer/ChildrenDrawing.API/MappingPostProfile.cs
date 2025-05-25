using AutoMapper;
using Children_s_drawing.Core.Entities;
using Childrens_drawing.Core.Dtos;
using Childrens_drawing.Core.PostModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Childrens_drawing.API
{
    public class MappingPostProfile:Profile
    {
        public MappingPostProfile() 
        {
            CreateMap<UserPostModel, UserDto>();
            CreateMap<CategoryPostModel, CategoryDto>();
            CreateMap<PaintedPaintingPostModel, PaintedPaintingDto>();
            CreateMap<PaintingPostModel, PaintingDto>();
        }
    }
}
