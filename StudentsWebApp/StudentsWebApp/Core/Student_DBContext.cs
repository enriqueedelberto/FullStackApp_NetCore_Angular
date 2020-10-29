using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using StudentsWebApp.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace StudentsWebApp.Core
{
    public class Student_DBContext : DbContext
    {

        public DbSet<Student> Student { get; set; }

        public Student_DBContext(DbContextOptions<Student_DBContext> options) : base(options)
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
           

            options.UseSqlite("Filename=./sample.db3");
        }
       
    }
}
