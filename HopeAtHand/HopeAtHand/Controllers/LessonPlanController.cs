using HopeAtHand.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Controllers
{
    public class LessonPlanController : Controller
    {
        public async Task<ActionResult> CreateLesson([FromBody] LessonPLanCreateDTO lessonPLanCreate)
        {

             return Ok();
        }
    }
}
