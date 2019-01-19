using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models.Managers
{
    public interface IThemeManager
    {
        List<string> GetThemes();
        string CreateTheme(string themeName);
        string ConnectEntity(List<Themes> Themes, int ID, string type);
    }
    /*Responsible for CRUD oppurations on Themes*/
    public class ThemeManager : IThemeManager
    {
        ApplicationDbContext Data;
        public ThemeManager(ApplicationDbContext data)
        {
            Data = data;
        }

        //Returns a List of all Themes
        public List<string> GetThemes(){
            List<string> themes = new List<string>();
            foreach(Themes theme in Data.Themes){
                themes.Add(theme.ThemeName);
            }
            return themes;
        }

        public string CreateTheme(string themeName){

            if (Data.Themes.Where(w => w.ThemeName == themeName).FirstOrDefault() != null){
                return "Theme already exists";
            }
            Themes themeToCreate = new Themes { ThemeName = themeName };
            Data.Add(themeToCreate);
            Data.SaveChanges();
            return "Sucess";
        }

        public string ConnectEntity(List<Themes> Themes, int ID, string type)
        {
            if(Themes.Count() < 1)
            {
                return "No Themes To Add";
            }

            foreach(Themes theme in Themes)
            {
                if (type == "Poem")
                    Data.PoemThemes.Add(new PoemThemes { ThemeName = theme.ThemeName, PoemId = ID });
                else if (type == "Lesson Plan")
                    Data.LessonThemes.Add(new LessonThemes { ThemeName = theme.ThemeName, LessonId = ID });
                else if (type == "Writing")
                    Data.WritingThemes.Add(new WritingThemes { ThemeName = theme.ThemeName, WritingAssignemntId = ID });
                else if (type == "Art")
                    Data.ArtThemes.Add(new ArtThemes { ThemeName = theme.ThemeName, ArtPieceId = ID });
                else
                    return "Invalid document type";
            }
            //Data.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.PoemThemes ON");
            Data.SaveChanges();
            //Data.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.PoemThemes OFF");
            

            return "Success";
        }
    }
}
