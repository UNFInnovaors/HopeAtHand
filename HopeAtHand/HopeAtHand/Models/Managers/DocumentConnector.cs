using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models.Managers
{
    public interface IDocumentConnector
    {
        bool ConnectPoem(LessonPlan lesson, int poemId);
        bool ConnectWriting(LessonPlan lesson, int writing);
        bool ConnectArt(LessonPlan lesson, int artPiece);
    }
    public class DocumentConnector : IDocumentConnector
    {
        ApplicationDbContext Data;

        public DocumentConnector(ApplicationDbContext Data)
        {
            this.Data = Data;
        }

        public bool ConnectPoem(LessonPlan lesson, int poemId)
        {
            try
            {
                Data.Add(new LessonPlan_Poem
                {
                    LessonPlanId = lesson.LessonPlanId,
                    PoemId = poemId
                }  );
            }
            catch
            {
                return false;
            }
            return true;
        }

        public bool ConnectWriting(LessonPlan lesson, int writing)
        {
            try
            {
                Data.Add(new LessonPlan_WritingAssignment()
                {
                    LessonPlanId = lesson.LessonPlanId,
                    WritingAssignmentId = writing
                });
            }
            catch
            {
                return false;
            }
            return true;
        }

        public bool ConnectArt(LessonPlan lesson, int art)
        {
            try
            {
                Data.Add( new LessonPlan_ArtPiece()
                {
                    ArtPieceId = art,
                    LessonPlanId = lesson.LessonPlanId
                });
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}
