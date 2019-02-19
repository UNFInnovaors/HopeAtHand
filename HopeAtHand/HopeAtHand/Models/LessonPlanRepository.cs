using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HopeAtHand.Models;

namespace HopeAtHand.Models
{
    public interface ILessonPlanRepository
    {
        IEnumerable<LessonPlan> FindLessonPlan(string Theme);
        string UpdateNote(UpdateDTO updateDTO);
        string UpdateLocation(UpdateDTO updateDTO);
    }
    public class LessonPlanRepository  : ILessonPlanRepository
    {
        public const string DELEMETER = "@!@";
        ApplicationDbContext Data;
       public LessonPlanRepository(ApplicationDbContext Data)
        {
            this.Data = Data;
        }

        public IEnumerable<LessonPlan> FindLessonPlan(string Theme)
        {
            return null;
        }

        public string UpdateNote(UpdateDTO updateDTO)
        {
            LessonPlan lesson = Data.Lessonplans.Find(updateDTO.lessonPlanId);
            string currentNotes = lesson.Notes;

            Data.Update(lesson);
            if (currentNotes == null)
            {
                lesson.Notes = updateDTO.update;
            }
            else
            {
                lesson.Notes = lesson.Notes + DELEMETER + updateDTO.update;
            }

            Data.SaveChanges();
            
            return lesson.Notes;
        }

        public string UpdateLocation(UpdateDTO updateDTO)
        {
            LessonPlan lesson = Data.Lessonplans.Find(updateDTO.lessonPlanId);
            string currentLocations = lesson.Locations;

            Data.Update(lesson);
            if (currentLocations == null)
            {
                lesson.Locations = updateDTO.update;
            }
            else
            {
                lesson.Locations = lesson.Locations + DELEMETER + updateDTO.update;
            }

            Data.SaveChanges();

            return lesson.Locations;
        }
    }
}
