
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HopeAtHand.Models;
using HopeAtHand.SearchRepositories;

namespace HopeAtHand.Controllers
{
    [Route("api/[controller]/[Action]")]
    public class SearchController : Controller
    {
        ILessonPlanRepository lessonPlanRepo;
        IPoemRepo poemRepo;
        IPoemSearchRepository poemSearch;
        IWritingAssignmentSearchRepository writingSearch;
        ILessonPlanSearchRepository lessonPLanSearch;
        IArtPieceSearchRepository artPieceSearchRepository;
        IThemeSearchRepositroy themeSearch;

        public SearchController(ILessonPlanRepository lessonPlanRepo,
        IPoemRepo poemRepo,
        IPoemSearchRepository poemSearch,
        IWritingAssignmentSearchRepository writingSearch,
        ILessonPlanSearchRepository lessonPLanSearch,
        IArtPieceSearchRepository artPieceSearchRepository,
        IThemeSearchRepositroy themeSearch)
        {
            this.lessonPlanRepo = lessonPlanRepo;
            this.poemRepo = poemRepo;
            this.poemSearch = poemSearch;
            this.writingSearch = writingSearch;
            this.lessonPLanSearch = lessonPLanSearch;
            this.artPieceSearchRepository = artPieceSearchRepository;
            this.themeSearch = themeSearch;
        }
        
        [HttpPost]
        public IActionResult FindLessonPlan([FromBody]LessonSearchDTO lessie)
        {
            LessonPlan[] lessonDTO = lessonPlanRepo.FindLessonPlan(lessie.theme).ToArray();
            for (int x = 0; x < lessonDTO.Length; x++)
            {
            }
            return Ok(lessonDTO);
        }

        [HttpPost]
        public IActionResult SearchForPoems([FromBody] PoemSearchDTO poemSearchDTO)
        {
            return Ok(poemSearch.SeachForPoem(poemSearchDTO));
        }
        [HttpPost]
        public IActionResult SearchForArtPieces([FromBody] ArtPieceSearchDTO artSearchDTO)
        {
            return Ok(artPieceSearchRepository.SeachForArtPiece(artSearchDTO));
        }
        [HttpPost]
        public IActionResult SearchForWritingAssignments([FromBody] WritingAssignmentSearchDTO writingSearchDTO)
        {
            return Ok(writingSearch.SeachForWritingAssignment(writingSearchDTO));
        }
        [HttpPost]
        public IActionResult SearchForLessons([FromBody] LessonPlanSearchDTO lessonSearchDTO)
        {
            return Ok(lessonPLanSearch.SeachForLessonPlan(lessonSearchDTO));
        }
        [HttpPost]
        public IActionResult SearchForThemes([FromBody] ThemeSearchDTO themeSearchDTO)
        {
            return Ok(themeSearch.SearchThemes(themeSearchDTO.Themes));
        }

    }

        public class PoemSearchDTO
        {
            public string Name { get; set; }
            public string Author { get; set; }
        }
}






/*public SearchController(ILessonPlanRepository less, IPoemRepo mydependency)
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

    
        [HttpGet]
        public IActionResult GetEnvior()
        {
            return Ok(Environment.GetEnvironmentVariable("storageconnectionstring"));
        }
*/
