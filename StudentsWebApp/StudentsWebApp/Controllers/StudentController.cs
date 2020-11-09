using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using StudentsWebApp.Core;
using StudentsWebApp.Models;

namespace StudentsWebApp.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {

        private readonly Student_DBContext _context;

        public StudentController(Student_DBContext context)
        {
            this._context = context;

        }

        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Student>> Get()
        {
            return _context.Student.ToList();
        }


        [HttpGet("{id}", Name = "GetStudent")]
        public ActionResult<Student> GetById ([FromRoute]long id)
        {
            var student = _context.Student.FirstOrDefault( s => s.Id == id);

            if(student == null)
            {
                return NotFound();
            }

            return student;
        }

        [HttpPost]
        public IActionResult Create([FromBody] Student student)
        {
            try
            {
               

                if (student == null)
                {
                    return BadRequest();
                }

                var studentCreated = _context.Student.FirstOrDefault(s => s.Id == student.Id 
                                                                     || s.Username.Equals(student.Username));

                if(studentCreated != null)
                {
                    return BadRequest("The Id and Username must be unique");
                }

                _context.Student.Add(student);
                _context.SaveChanges();

                return CreatedAtRoute("GetStudent", new { id = student.Id }, student);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
           


        }


        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody] Student student)
        {
            try
            {
                if (student == null || student.Id != id)
                {
                    return BadRequest();
                }


                var studentCurrent = _context.Student.FirstOrDefault(s => s.Id == id);
                if (studentCurrent == null)
                {
                    return NotFound();
                }

                studentCurrent.Username = student.Username;
                studentCurrent.FirstName = student.FirstName;
                studentCurrent.LastName = student.LastName;
                studentCurrent.Age = student.Age;
                studentCurrent.Career = student.Career;



                _context.Student.Update(studentCurrent);
                _context.SaveChanges();

                return new NoContentResult();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            try
            {
                var student = _context.Student.FirstOrDefault(s => s.Id == id);
                if (student == null)
                {
                    return NotFound();
                }

                _context.Student.Remove(student);
                _context.SaveChanges();

                return new NoContentResult();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }


        }




    }
}