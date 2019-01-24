using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models.Managers
{
    public class LessonPlanCreationDTO
    {
        public string name { get; set; }
        public List<string> themes { get; set; }
        public List<int> documents { get; set; }
        public string imageURL { get; set; }
    }
    public interface ILessonPlanCreateManager
    {
        LessonPlan SaveLessonPLan(LessonPlanCreationDTO createDTO);
    }
    public class LessonPlanCreateManager : ILessonPlanCreateManager
    {
        ApplicationDbContext Data;
        private readonly IThemeManager themeManager;
        private readonly IDocumentConnector documentConnector;

        public LessonPlanCreateManager(ApplicationDbContext Data, IThemeManager themeManager, IDocumentConnector documentConnector)
        {
            Data = this.Data;
            this.themeManager = themeManager;
            this.documentConnector = documentConnector;
        }

        public LessonPlan SaveLessonPLan(LessonPlanCreationDTO createDTO)
        {
            LessonPlan lessonPlan = CreateLessonPLan(createDTO);
            if (lessonPlan == null)
                return null;

            themeManager.ConnectEntity(createDTO.themes, lessonPlan.LessonPlanId, "Lesson Plan");
            bool ConnectionsCreateResult = CreateConnections(createDTO.documents, lessonPlan);
            if(ConnectionsCreateResult == false)
                return null;
            
            return lessonPlan;
        }

        public bool CreateConnections(List<int> documents, LessonPlan lessonPlan)
        {
            foreach (int id in documents)
            {
                int identifier = (int)char.GetNumericValue(id.ToString()[0]);
                bool success = true;
                switch (identifier)
                {
                    case 1:
                        success = documentConnector.ConnectArt(lessonPlan, id);
                        break;
                    case 2:
                        success = documentConnector.ConnectPoem(lessonPlan, id);
                        break;
                    case 3:
                        success = documentConnector.ConnectWriting(lessonPlan, id);
                        break;
                    default:
                        Console.WriteLine("Invalid Document Id");
                        success = false;
                        break;
                }
                if (success == false)
                    return false;
            }
            return true;
        }

        public LessonPlan CreateLessonPLan(LessonPlanCreationDTO createDTO)
        {
            LessonPlan newLesson = new LessonPlan()
            {
                LessonPlanId = CreateId(5),
                Name = createDTO.name
            };
            Data.Database.OpenConnection();
            try
            {
                Data.Add(newLesson);
                Data.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Poems ON");

                Data.SaveChanges();
                Data.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Poems OFF");
            }
            catch
            {
                return null;
            }
            finally
            {
                Data.Database.CloseConnection();
            }
            return newLesson;
        }

        public int CreateId(int numberToAdd)
        {
            int count = Data.Lessonplans.Count() + 1;
            string newID = count.ToString();
            for (int x = 0; x < newID.Length; x++)
            {
                numberToAdd *= 10;
            }
            count += numberToAdd;

            return count;


        }
    }
}