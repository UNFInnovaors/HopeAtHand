using HopeAtHand.Models;
using HopeAtHand.Models.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Controllers
{
    [Authorize]
    [Route("api/[controller]/[Action]")]
    public class FavoritesController : Controller
    {
        private readonly IFavoriteManager favoriteManager;
        private readonly ApplicationDbContext Data;

        public FavoritesController(IFavoriteManager favoriteManager, ApplicationDbContext Data )
        {
            this.favoriteManager = favoriteManager;
            this.Data = Data;
        }

        [HttpPost]
        public IActionResult AddFavorite([FromBody] FavoriteCreateDTO favoriteDTO)
        {
            Favorite fav = favoriteManager.CreateFavoriate(favoriteDTO);
            if (fav == null)
                return NotFound();
            return Ok(fav);
        }

        public IActionResult GetFavorites([FromBody] FavoriteFindDTO favoriteFindDTO)
        {

            List<ArtPiece> art = new List<ArtPiece>();
            List<Poem> poem = new List<Poem>();
            List<WritingAssignment> writing = new List<WritingAssignment>();
            List <LessonPlan> lessonplans = new List<LessonPlan>();
            
            var favs = favoriteManager.FindFavorites(favoriteFindDTO);
            foreach (var fav in favs)
            {
                switch (fav.DocumentType)
                {
                    case ("Art Piece"):
                        art.Add(Data.ArtPieces.Where(w => w.ArtPieceId == fav.DocumentID).FirstOrDefault());
                        break;
                    case ("Poem"):
                        poem.Add(Data.Poems.Where(w => w.PoemId == fav.DocumentID).FirstOrDefault());
                        break;
                    case ("Writing Assignment"):
                        writing.Add(Data.WritingAssignments.Where(w => w.WritingAssignmentId == fav.DocumentID).FirstOrDefault());
                        break;
                    case ("Lesson Plan"):
                        lessonplans.Add(Data.Lessonplans.Where(w => w.LessonPlanId == fav.DocumentID).FirstOrDefault());
                        break;
                    default:
                        break;
                }
            }
            return Ok(new { art, poem, writing, lessonplans });
        }
    }
}
