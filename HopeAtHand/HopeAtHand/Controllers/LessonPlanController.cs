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
        private readonly ILessonPlanRepository LessonPlanRepo;

        public LessonPlanController(ILessonPlanCreateManager lessonPlanCreateManager, ILessonPlanRepository lessonPlanRepository)
        {
            LessonPlanCreation = lessonPlanCreateManager;
            LessonPlanRepo = lessonPlanRepository;
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

        public IActionResult UpdateNotes([FromBody] UpdateDTO updateDTO)
        {
            return Ok(LessonPlanRepo.UpdateNote(updateDTO));
        }

        public IActionResult UpdateLocations([FromBody] UpdateDTO updateDTO)
        {
            return Ok(LessonPlanRepo.UpdateLocation(updateDTO));
        }
    }
}
