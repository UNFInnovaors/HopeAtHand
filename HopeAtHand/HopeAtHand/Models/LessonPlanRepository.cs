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
    }
    public class LessonPlanRepository 
    {
       

        public IEnumerable<LessonPlan> FindLessonPlan(string Theme)
        {
            return null;
        }
    }
}
