using HopeAtHand.Controllers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models.Managers
{
    public class CreateWritingAssignmentData
    {
        public string WritingAssignmentName { get; set; }
        public int TemplateId { get; set; }
        public string ImageURL { get; set; }
        public string WritingURL { get; set; }
        public List<Themes> Themes;
    }

    public interface IWritingTemplateManager
    {
        CreateResultDTO CreateWritingAssignment(CreateWritingAssignmentData createData);
        string CreateTemplateType(CreateTemplateDTO createTemplate);
        List<WritingTemplate> WritingTempaltes();
        string Find(int id);
    }

    public class WritingTemplateManager : IWritingTemplateManager
    {
        private ApplicationDbContext Data { get; }
        public IThemeManager themeManager { get; }

        public WritingTemplateManager(ApplicationDbContext Data, IThemeManager themeManager)
        {
            this.Data = Data;
            this.themeManager = themeManager;
        }

        public CreateResultDTO CreateWritingAssignment(CreateWritingAssignmentData create)
        {

            if (create.TemplateId == -1 || create.WritingAssignmentName == "")
            {
                return null;
            }
            WritingAssignment WAToAdd = TrackWA(3);
            themeManager.ConnectEntity(create.Themes, WAToAdd.WritingAssignmentId, "Writing");

            WAToAdd.Title = create.WritingAssignmentName;
            WAToAdd.ImageURL = create.ImageURL;
            WAToAdd.TemplateId = create.TemplateId;
            WAToAdd.DocumentBlobURL = create.WritingURL;
            Data.SaveChanges();
            return new CreateResultDTO
            {
                id = WAToAdd.WritingAssignmentId,
                imageURL = WAToAdd.ImageURL
            };
        }

        public WritingAssignment TrackWA(int numberToAdd)
        {
            WritingAssignment writing = new WritingAssignment();

            int count = Data.WritingAssignments.Count() + 1;
           

            string newID = count.ToString();
            for (int x = 0; x < newID.Length; x++)
            {
                numberToAdd *= 10;
            }
            writing.WritingAssignmentId = numberToAdd + count;
            while (Data.WritingAssignments.Find(writing.WritingAssignmentId) != null)
            {
                writing.WritingAssignmentId++;
            }
            Data.Database.OpenConnection();
            try
            {
                Data.Add(writing);
                Data.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.WritingAssignments ON");

                Data.SaveChanges();
                Data.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.WritingAssignments OFF");
            }
            finally
            {
                Data.Database.CloseConnection();
            }
            return writing;
        }

        public string CreateTemplateType(CreateTemplateDTO createTemplate)
        {
            var checkExistance = Data.WritingTemplates.Where(temp => temp.Name == createTemplate.TemplateName).FirstOrDefault();
            if(checkExistance == null)
            {
                Data.Add(new WritingTemplate
                {
                    Name = createTemplate.TemplateName
                });
                Data.SaveChanges();
                return "Success";
            }
            return "Failed";
           
        }

        public List<WritingTemplate> WritingTempaltes()
        {
            return Data.WritingTemplates.OrderBy(temp => temp.Name).ToList();
        }

        public string Find(int id)
        {
            var result = Data.WritingTemplates.Find(id);
            if(result == null)
            {
                return "Not Found";
            }
            return result.Name;
        }
    }
}
