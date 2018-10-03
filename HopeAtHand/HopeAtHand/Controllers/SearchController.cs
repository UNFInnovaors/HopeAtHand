
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HopeAtHand.Models;

namespace HopeAtHand.Controllers
{
    [Route("api/[controller]/[Action]")]
    public class SearchController : Controller
    {
        ILessonPlanRepository lessonPlanRepo;
        IPoemRepo poemRepo;

        public SearchController(ILessonPlanRepository less, IPoemRepo mydependency)
        {
            lessonPlanRepo = less;
            poemRepo = mydependency;
        }
        public IActionResult Poems()
        {
            var poemz = JsonConvert.SerializeObject(PoemRepo.Poems);
            return Ok(poemz);
        }

        [HttpPost]
        public IActionResult GetPoemSearchText([FromBody] PoemDTO poemie)
        {
            Poem[] poemDTO = poemRepo.GetPoem(poemie.tags, poemie.theme).ToArray();
            return Ok(poemDTO);
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