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
        string UpdateLessonName(UpdateDTO updateDTO);
        string UpdateNotes(UpdateDTO updateDTO);
        string UpdateLocations(UpdateDTO updateDTO);
        string UpdateThemesFromEdit(UpdateDTO updateDTO);
        string Complete(string URL, string Location, int lessonPlanId);
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

        public string UpdateLessonName(UpdateDTO updateDTO)
        {
            LessonPlan lesson = Data.Lessonplans.Find(updateDTO.lessonPlanId);
            Data.Update(lesson);
            lesson.Title = updateDTO.update;
            Data.SaveChanges();
            return lesson.Title;
        }

        //Fromeditpage
        public string UpdateNotes(UpdateDTO updateDTO)
        {
            LessonPlan lesson = Data.Lessonplans.Find(updateDTO.lessonPlanId);
            Data.Update(lesson);
            lesson.Notes = updateDTO.update;
            Data.SaveChanges();
            return lesson.Notes;
        }
        //Fromeditpage
        public string UpdateLocations(UpdateDTO updateDTO)
        {
            LessonPlan lesson = Data.Lessonplans.Find(updateDTO.lessonPlanId);
            Data.Update(lesson);
            lesson.Locations = updateDTO.update;
            Data.SaveChanges();
            return lesson.Notes;
        }

        public string UpdateThemesFromEdit(UpdateDTO updateDTO)
        {
            LessonPlan lesson = Data.Lessonplans.Find(updateDTO.lessonPlanId);
            var currentThemes = Data.LessonThemes.Where(l => l.LessonId == updateDTO.lessonPlanId).ToArray();
            var NewThemeArray = updateDTO.update.Split(",");
            int[] actions = new int[currentThemes.Length];

            /*First Nested For Loop Checks to See What Themes Must be removed*/
            for(int x = 0; x < currentThemes.Length; x++)
            {
                var reject = true;
                for(int y = 0; y < NewThemeArray.Length; y++)
                {
                    if (currentThemes[x].ThemeName == NewThemeArray[y])
                    {
                        reject = false;
                    }                    
                }
                if(reject == true)
                {
                    Console.WriteLine(currentThemes[x].ThemeName + " Was Removed");
                    Data.Remove(currentThemes[x]);
                }
            }
            //Second For Loop checks to see what themes need to be added
            for (int x = 0; x < NewThemeArray.Length; x++)
            {
                var add = true;
                for (int y = 0; y < currentThemes.Length; y++)
                {
                    if (currentThemes[y].ThemeName == NewThemeArray[x])
                    {
                        add = false;
                    }
                }
                if (add == true)
                {
                    Data.Add( new LessonThemes {ThemeName= NewThemeArray[x], LessonId = updateDTO.lessonPlanId});
                    Console.WriteLine(NewThemeArray[x] + " Was Added");
                }
            }
            Data.SaveChanges();
            return "Ok";
        }

        public string Complete(string URL, string Location, int lessonPlanId)
        {
            LessonPlan lesson = Data.Lessonplans.Find(lessonPlanId);
            Data.Update(lesson);
            switch (Location)
            {
                case "Complete":
                    lesson.CompleteLessonPlanURL = URL;
                    break;
                case "Outline":
                    lesson.OutlineURl = URL;
                    break;
                case "Picture":
                    lesson.ImageURL = URL;
                    break;
            }
            Data.SaveChanges();
            return "Ok";
        }
    }
}
