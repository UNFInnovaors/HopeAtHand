using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HopeAtHand.Models;

namespace HopeAtHand.Models
{
    public interface ILessonPlanRepository
    {
        IEnumerable<LessonPlan> FindLessonPlan(string Theme, string Tag);
    }
    public class LessonPlanRepository : ILessonPlanRepository
    {
       

        public IEnumerable<LessonPlan> FindLessonPlan(string Theme, string Tag)
        {
            IEnumerable<LessonPlan> lessonPlans = (IEnumerable<LessonPlan>)LessonPlanRepo.LessonPLans.Values.Where(l => l.Themes.First().ThemeName == Theme || l.Tag == Tag).ToList();
            return lessonPlans;
        }
    }
}
