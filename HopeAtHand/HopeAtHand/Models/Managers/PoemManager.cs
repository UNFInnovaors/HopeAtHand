using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models.Managers
{
    public class CreatePoemData
    {
        public string PoemName { get; set; }
        public string Author { get; set; }
        public string ImageURL { get; set; }
        public string PoemURL { get;set; }
        public List<Themes> Themes;

    }
    public interface IPoemManager
    {
         CreateResultDTO CreatePoem(CreatePoemData create);
    }

    public class PoemManager : IPoemManager
    {
        ApplicationDbContext Data;
        public IThemeManager themeManager { get; set; }

        public PoemManager(ApplicationDbContext Data, IThemeManager themeManager)
        {
            this.Data = Data;
            this.themeManager = themeManager;
        }

        public CreateResultDTO CreatePoem(CreatePoemData create)
        {
            if(create.Author == "" || create.PoemName == "" || create.PoemURL == "")
            {
                return null;
            }
            Poem poemToAdd = TrackPoem(2);
            themeManager.ConnectEntity(create.Themes, poemToAdd.PoemId, "Poem");

            poemToAdd.Title = create.PoemName;
            poemToAdd.ImageURL = create.ImageURL;
            poemToAdd.Author = create.Author;
            poemToAdd.DocumentBlobURL = create.PoemURL;

            Data.SaveChanges();
            return new CreateResultDTO { id = poemToAdd.PoemId, imageURL = create.ImageURL};
        }

        public Poem TrackPoem(int numberToAdd)
        {
            Poem poem = new Poem();
            int count = Data.Poems.Count() + 1;
            
            string newID = count.ToString();
            for (int x = 0; x < newID.Length; x++)
            {
                numberToAdd *= 10;
            }
            count += numberToAdd;
            poem.PoemId = count;

            Data.Database.OpenConnection();
            try
            { 
            Data.Add(poem);
            Data.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Poems ON");

            Data.SaveChanges();
            Data.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Poems OFF");
            }
            finally
            {
                Data.Database.CloseConnection();
            }
            return poem;
        }
    }
}
