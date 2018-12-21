using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication1.Models;
using System.Web.Http.Cors;
using System.Web;
using System.IO;
using System.Net.Mail;
namespace WebApplication1.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmpController : ApiController
    {
        public string baseurl = "http://localhost:51199/Content/Img/";
        public string reseturl = "http://localhost:4200/resetpassword?uid=";


        private DemoEntities db = new DemoEntities();

        // GET api/Emp
        [HttpGet]
        public IQueryable<Employee> GetEmployees()
        {
            return db.Employees;
        }

        // GET api/Emp/5
        [HttpGet]
        [ResponseType(typeof(Employee))]
        public HttpResponseMessage GetEmployee(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "Employee Not Found.");
            return Request.CreateResponse(HttpStatusCode.OK, employee);
        }

        public HttpResponseMessage Login(User model)
        {
            User user = db.Users.SingleOrDefault(p => p.UserName == model.UserName && p.Password == model.Password);
            if (user == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "Login Failed");
            else
            {
                user.Image = baseurl + user.Image;
                var User = new UserModel(user);
                return Request.CreateResponse(HttpStatusCode.OK, User);
            }
        }


        public HttpResponseMessage GetUser(int Id)
        {
            User user = db.Users.SingleOrDefault(p => p.Id == Id);
            if (user == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "User Not found");
            else
            {
                user.Image = baseurl + user.Image;
                var User = new UserModel(user);
                return Request.CreateResponse(HttpStatusCode.OK, User);
            }
        }


        [HttpPost]
        public HttpResponseMessage FileUpload(int Id)
        {
            var file = HttpContext.Current.Request.Files[0];
            User user = db.Users.SingleOrDefault(p => p.Id == Id);
            if (user == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "User Not found");
            else
            {
                file.SaveAs(HttpContext.Current.Server.MapPath("~/Content/Img/" + file.FileName));
                user.Image = file.FileName;
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                user.Image = baseurl + file.FileName;
                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
        }


        public HttpResponseMessage Register(User model)
        {
            User user = db.Users.SingleOrDefault(p => p.UserName == model.UserName);
            if (user != null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "Registration Failed");
            else
            {
                var nuser = new User();
                nuser.FirstName = model.FirstName;
                nuser.LastName = model.LastName;
                nuser.Password = model.Password;
                nuser.UserName = model.UserName;
                db.Users.Add(nuser);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, nuser);
            }
        }

        // PUT api/Emp/5
        public HttpResponseMessage PutEmployee(int id, Employee employee)
        {
            if (!ModelState.IsValid)
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid Input");

            if (id != employee.EmpId)
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid Input");


            db.Entry(employee).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid Input");
                else
                    throw;
            }

            return Request.CreateResponse(HttpStatusCode.OK, "success");
        }

        [HttpPost]
        public HttpResponseMessage PutUser(User user)
        {

            if (!ModelState.IsValid && UserExists(user.Id))
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid Input");

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(user.Id))
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid Input");
                else
                    throw;
            }

            return Request.CreateResponse(HttpStatusCode.OK, "success");
        }

        [HttpGet]
        public HttpResponseMessage ForgotPassword(string email)
        {

            if (!db.Users.Any(p => p.UserName == email))
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid Email");
            else
            {
                var user = db.Users.SingleOrDefault(p => p.UserName == email);
                Guid g = Guid.NewGuid();
                string GuidString = Convert.ToBase64String(g.ToByteArray());
                GuidString = GuidString.Replace("=", "");
                GuidString = GuidString.Replace("+", "");
                user.Token = GuidString;
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                reseturl = string.Concat(reseturl, user.Token);
                //put the to and from mail address here
                using (MailMessage mm = new MailMessage("", email))
                {
                    mm.Subject = "Forgot Password";
                    mm.Body = "Please click the link to set the password <a target='blank' href=" + reseturl + ">link</a>";
                    mm.IsBodyHtml = true;
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "smtp.gmail.com";
                    smtp.EnableSsl = true;
                    //give credetials for the mail
                    NetworkCredential NetworkCred = new NetworkCredential();
                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = 587;
                    smtp.Send(mm);
                }
                return Request.CreateResponse(HttpStatusCode.OK, "success");
            }
        }

        [HttpGet]
        public HttpResponseMessage SavePassword(string t,string p)
        {

            if (!db.Users.Any(P=>P.Token==t))
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid Token");
            else
            {
                var user = db.Users.SingleOrDefault(P => P.Token == t);
                user.Password = p;
                db.Entry(user).State = EntityState.Modified;
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "success");
            }
        }


        // POST api/Emp
        [ResponseType(typeof(Employee))]
        public HttpResponseMessage PostEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Invalid Input");


            db.Employees.Add(employee);
            db.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK, employee);
        }

        // DELETE api/Emp/5
        [ResponseType(typeof(Employee))]
        public HttpResponseMessage DeleteEmployee(int id)
        {
            Employee employee = db.Employees.Find(id);
            if (employee == null)
                return Request.CreateResponse(HttpStatusCode.NotFound, "Employee Not Found.");

            db.Employees.Remove(employee);
            db.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK, employee);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EmployeeExists(int id)
        {
            return db.Employees.Count(e => e.EmpId == id) > 0;
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
    public class UserModel {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Image { get; set; }
        public UserModel(User model) {
            this.FirstName = model.FirstName;
            this.LastName = model.LastName;
            this.UserName = model.UserName;
            this.Id = model.Id;
            this.Password = model.Password;
            this.Image = model.Image;
        }
    }
}