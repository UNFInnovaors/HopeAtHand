
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;
using HopeAtHand.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]/[Action]")]
    public class SearchController : Controller
    {
        ILessonPlanRepository lessonPlanRepo;

        public SearchController(ILessonPlanRepository less)
        {
            lessonPlanRepo = less;
        }
        public IActionResult Poems()
        {
            var poemz = JsonConvert.SerializeObject(PoemRepo.Poems);
            return Ok(poemz);
        }
        
        public IActionResult WritingAssingnments()
        {
            return Ok(WrittingAssignmentRepo.WritingAssignments);
        }

        public IActionResult ArtPieces()
        {
            return Ok(ArtPiecesRepo.ArtPieces);

        }
        public IActionResult LessonPlans()
        {
            return Ok();
        }
        [HttpPost]
        public IActionResult FindLessonPlan([FromBody]LessonSearchDTO lessie)
        {
            LessonPlan[] lessonDTO = lessonPlanRepo.FindLessonPlan(lessie.theme, lessie.tags).ToArray();
            for(int x = 0; x < lessonDTO.Length; x++)
            {
                lessonDTO[x].poem = PoemRepo.Poems.Where(p => p.Value.PoemId == lessonDTO[x].PoemId).FirstOrDefault().Value;
                lessonDTO[x].Writing = WrittingAssignmentRepo.WritingAssignments.Where(w => w.Value.WritingAssignmentId == lessonDTO[x].WritingAssignmentId).FirstOrDefault().Value;
                lessonDTO[x].artPiece = ArtPiecesRepo.ArtPieces.Where(a => a.Value.ArtPieceId == lessonDTO[x].ArtPieceId).FirstOrDefault().Value;
            }
            return Ok(lessonDTO);
        }
    }
}