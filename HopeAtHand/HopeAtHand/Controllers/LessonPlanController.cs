using HopeAtHand.Models;
using HopeAtHand.Models.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Controllers
{
    [Route("api/[controller]/[Action]")]
    public class LessonPlanController : Controller
    {
        private readonly ILessonPlanCreateManager LessonPlanCreation;

        public LessonPlanController(ILessonPlanCreateManager lessonPlanCreateManager)
        {
            LessonPlanCreation = lessonPlanCreateManager;
        }

        /*public async Task<ActionResult> CreateLesson([FromBody]LessonPlanCreationDTO creationDTO)
        {
             return Ok();
        }*/

        public async Task<ActionResult>SaveLesson([FromBody] LessonPlanCreationDTO creationDTO)
        {
            LessonPlan lesson = LessonPlanCreation.SaveLessonPLan(creationDTO);
            if (lesson == null)
            {
                return BadRequest();
            }
            else return Ok(lesson);
        }

        [HttpGet]
        [AllowAnonymous]
        public PhysicalFileResult PDFToView()
        {
            var file = Path.Combine(Directory.GetCurrentDirectory(),
                                   "wwwRoot", "TestPDF.pdf");
            System.Net.Mime.ContentDisposition cd = new System.Net.Mime.ContentDisposition
            {
                FileName = "TestPDF.pdf",
                Inline = true  // false = prompt the user for downloading;  true = browser to try to show the file inline
            };
            HttpContext.Response.Headers.Add("Content-Disposition", cd.ToString());
            HttpContext.Response.Headers.Add("Cache-Control", "no-store");

            return PhysicalFile(file, "application/pdf");
        }
    }
}
