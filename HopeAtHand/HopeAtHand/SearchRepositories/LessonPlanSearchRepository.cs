using HopeAtHand.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace HopeAtHand.SearchRepositories
{
    public interface ILessonPlanSearchRepository
    {
        List<LessonPlan> SeachForLessonPlan(LessonPlanSearchDTO LessonPlanSearchDTO);
        List<LessonPlan> SearchForLessonPlan(LessonPlanThemeSearch lessonPlanSearchDTO);
        LessonPlan GetLessonPlanById(int id);

    }

    public class LessonPlanSearchDTO
    {
        public string Name { get; set; }
        //public string SuppliesNeeded { get; set; }
    }

    public class LessonPlanSearchRepository : ILessonPlanSearchRepository
    {
        ApplicationDbContext Data;

        public LessonPlanSearchRepository(ApplicationDbContext Data)
        {
            this.Data = Data;
        }

        public List<LessonPlan> SeachForLessonPlan(LessonPlanSearchDTO LessonPlanSearchDTO)
        {
            return Data.Lessonplans.Where(p => p.Title.ToLower().Contains(LessonPlanSearchDTO.Name)).ToList();
        }

        public List<LessonPlan> SearchForLessonPlan(LessonPlanThemeSearch lessonPlanSearchDTO)
        {
            List<LessonPlan> lessonPlans = new List<LessonPlan>();
            Dictionary<int, string> foundId = new Dictionary<int, string>();

            foreach ( var lesson in Data.LessonThemes)
            {
                foreach(string theme in lessonPlanSearchDTO.Themes)
                {
                    if (theme == lesson.ThemeName)
                    {
                        if(foundId.GetValueOrDefault(lesson.LessonId) is null)
                            lessonPlans.Add(Data.Lessonplans.Find(lesson.LessonId));
                        break;
                    }
                }
            }
            foreach(var lesson in Data.Lessonplans)
            {
                if (lesson.Title == lessonPlanSearchDTO.LesssonName && foundId.GetValueOrDefault(lesson.LessonPlanId) is null)
                    lessonPlans.Add(lesson);
            }
            List<LessonPlan> finalized = lessonPlans.Where(l => l != null).ToList();
            return finalized;
        }

        public LessonPlan GetLessonPlanById(int id)
        {
            LessonPlan otherMethod = Data.Lessonplans.Where(l => l.LessonPlanId == id).FirstOrDefault();
            otherMethod.Lesson_Art = Data.lessonPlan_ArtPieces.Where(l => l.LessonPlanId == id).ToList();
            otherMethod.Lesson_Poems = Data.lessonPlan_Poems.Where(l => l.LessonPlanId == id).ToList();
            otherMethod.Lesson_Writing = Data.lessonPlan_WritingAssignments.Where(l => l.LessonPlanId == id).ToList();
            otherMethod.Themes = Data.LessonThemes.Where(l => l.LessonId == id).ToList();
            otherMethod.ArtPieces = new List<ArtPiece>();
            otherMethod.poems = new List<Poem>();
            otherMethod.WritingAssignments = new List<WritingAssignment>();
            foreach (LessonPlan_ArtPiece art in otherMethod.Lesson_Art)
                otherMethod.ArtPieces.Add(Data.ArtPieces.Where(w => w.ArtPieceId == art.ArtPieceId).FirstOrDefault());
            foreach (var poem in otherMethod.Lesson_Poems)
                otherMethod.poems.Add(Data.Poems.Find(poem.PoemId));
            foreach (var writing in otherMethod.Lesson_Writing)
                otherMethod.WritingAssignments.Add(Data.WritingAssignments.Find(writing.WritingAssignmentId));
            return otherMethod;
        }
    }
}


//List<LessonPlan> LessonPlans = new List<LessonPlan>();

// if (LessonPlanSearchDTO.Name.Length > 0) // && LessonPlanSearchDTO.SuppliesNeeded.Length > 0
/*|| p.SuppliesNeeded.ToLower().Contains(LessonPlanSearchDTO.SuppliesNeeded)).ToList();
  else if (LessonPlanSearchDTO.SuppliesNeeded.Length > 0 && LessonPlanSearchDTO.Name.Length == 0)
      return LessonPlans = Data.LessonPlans.Where(p => p.SuppliesNeeded.ToLower().Contains(LessonPlanSearchDTO.SuppliesNeeded)).ToList();
  else if (LessonPlanSearchDTO.SuppliesNeeded.Length == 0 && LessonPlanSearchDTO.Name.Length > 0)
      return LessonPlans = Data.LessonPlans.Where(p => p.Title.ToLower().Contains(LessonPlanSearchDTO.Name)).ToList();
  return new List<LessonPlan>();*/
