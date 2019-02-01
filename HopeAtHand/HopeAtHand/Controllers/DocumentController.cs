using HopeAtHand.Models;
using HopeAtHand.Models.Managers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Controllers
{
    public class DocumentController : Controller
    {
        private readonly ApplicationDbContext Data;
        private readonly IDocumentManager DocumentManager;

        public DocumentController(ApplicationDbContext Data, IDocumentManager DocumentManager)
        {
            this.Data = Data;
            this.DocumentManager = DocumentManager;
        }
        [HttpGet]
        [Route("api/[controller]/[Action]/{id}")]
        public IActionResult GetDocument(int id)
        {
            if(id.ToString()[0] == '1')
            {
                return Ok(new {Document = DocumentManager.GetArtPiece(id), Type="Art Piece", Id = DocumentManager.GetArtPiece(id).ArtPieceId });
            }
            else if(id.ToString()[0] == '2')
            {
                return Ok(new { Document = DocumentManager.GetPoem(id), Type = "Poem", Id = DocumentManager.GetPoem(id).PoemId });
            }
            else if (id.ToString()[0] == '3')
            {
                return Ok(new { Document = DocumentManager.GetWritingAssignment(id), Type = "Writing Assignment", Id = DocumentManager.GetWritingAssignment(id).WritingAssignmentId });
            }
            else if (id.ToString()[0] == '5')
            {
                return Ok(new { Document = DocumentManager.GetLessonPlan(id), Type = "Lesson Plan", Id = DocumentManager.GetLessonPlan(id).LessonPlanId });
            }
            return NotFound();
        }
    }
}
