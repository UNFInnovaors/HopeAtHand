using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models.Managers
{
    public interface IDocumentManager
    {
        Poem GetPoem(int id);
        WritingAssignment GetWritingAssignment(int id);
        LessonPlan GetLessonPlan(int id);
        ArtPiece GetArtPiece(int id);
    }
    public class DocumentManager : IDocumentManager
    {
        private readonly ApplicationDbContext Data;

        public DocumentManager( ApplicationDbContext Data)
        {
            this.Data = Data;
        }
        public ArtPiece GetArtPiece(int id)
        {
            ArtPiece artPiece = Data.ArtPieces.Where(A => A.ArtPieceId == id).FirstOrDefault();
            if (artPiece == null)
                return null;
            artPiece.ArtThemes = Data.ArtThemes.Where(At => At.ArtPieceId == id).ToList();
            return artPiece;
        }

        public LessonPlan GetLessonPlan(int id)
        {
               return Data.Lessonplans
                    .Where( l => l.LessonPlanId == id)
                    .Include(lesson => lesson.Lesson_Art)
                    .Include(lesson => lesson.Lesson_Poems)
                    .Include(lesson => lesson.Lesson_Writing)
                    .Include(lesson => lesson.Themes)
                    .FirstOrDefault();
        }

        public Poem GetPoem(int id)
        {
            Poem poem = Data.Poems.Where(p => p.PoemId == id).FirstOrDefault();
            if (poem == null)
                return poem;
            poem.Themes = Data.PoemThemes.Where(w => w.PoemId == id).ToList();
            return poem;
        }

        public WritingAssignment GetWritingAssignment(int id)
        {
            WritingAssignment writingAssignment = Data.WritingAssignments.Where(w => w.WritingAssignmentId == id).FirstOrDefault();
            if(writingAssignment == null)
            {
                return null;
            }
            writingAssignment.Themes = Data.WritingThemes.Where(w => w.WritingAssignemntId == id).ToList();
            return writingAssignment;
        }
    }
}
