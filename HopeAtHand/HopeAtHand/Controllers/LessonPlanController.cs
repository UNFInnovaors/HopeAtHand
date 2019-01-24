using HopeAtHand.Models;
using HopeAtHand.Models.Managers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Controllers
{
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
    }
}
