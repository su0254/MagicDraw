﻿using Children_s_drawing.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Children_s_drawing.Data
{
    public class DataContext:DbContext
    {
        public DbSet<User>  Users { get; set; }
        public DbSet<Painting> Paintings { get; set; }
        public DbSet<PaintedPainting> PaintedPaintings { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    base.OnConfiguring(optionsBuilder);
        //    optionsBuilder.LogTo(mesege => Console.Write(mesege));
        //}

        //localhost
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("Data Source=DESKTOP-7TLL0C3\\SQLEXPRESS01; Initial Catalog=Magic_Draw; Integrated Security=True; TrustServerCertificate=True");
        //}
        //
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=sqlsrv; Initial Catalog=Magic_Draw; Integrated Security=True; TrustServerCertificate=True");
        }
    }
}
