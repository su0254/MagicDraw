using AutoMapper;
using Children_s_drawing.Core.Entities;
using Childrens_drawing.Core.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Childrens_drawing.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<PaintedPainting, PaintedPaintingDto>().ReverseMap();
            CreateMap<Painting, PaintingDto>().ReverseMap();
        }
    }
}
