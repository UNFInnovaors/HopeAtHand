using HopeAtHand.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.SearchRepositories
{
    public interface ILessonPlanSearchRepository
    {
        List<LessonPlan> SeachForLessonPlan(LessonPlanSearchDTO LessonPlanSearchDTO);
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
            return Data.Lessonplans.Where(p => p.Name.ToLower().Contains(LessonPlanSearchDTO.Name)).ToList();
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
