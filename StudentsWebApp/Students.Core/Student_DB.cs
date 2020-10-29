using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Students.Model;

namespace Students.Core
{
    public class Student_DB: DbContext
    {
         public virtual DbSet<Student> Students { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
           => options.UseSqlite(@"Data Source=AppData/sample.db3");
    }
}
