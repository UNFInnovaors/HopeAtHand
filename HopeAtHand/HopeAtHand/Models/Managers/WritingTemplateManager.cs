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
        public string AgeGroup { get; set; }
        public string ImageURL { get; set; }
        public string WritingURL { get; set; }
        public List<Themes> Themes;
    }

    public interface IWritingTemplateManager
    {
        int CreateWritingAssignment(CreateWritingAssignmentData createData);
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

        public int CreateWritingAssignment(CreateWritingAssignmentData create)
        {

            if (create.AgeGroup == "" || create.WritingAssignmentName == "")
            {
                return -1;
            }
            WritingAssignment WAToAdd = TrackWA(3);
            themeManager.ConnectEntity(create.Themes, WAToAdd.WritingAssignmentId, "Writing");

            WAToAdd.Title = create.WritingAssignmentName;
            WAToAdd.ImageURL = create.ImageURL;
            WAToAdd.AgeGroup = create.AgeGroup;
            WAToAdd.DocumentBlobURL = create.WritingURL;
            Data.SaveChanges();
            return WAToAdd.WritingAssignmentId;
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
    }
}
