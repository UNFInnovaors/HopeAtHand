using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models.Managers
{
    public interface IDocumentManager
    {
        Poem GetPoem(int id);
        WritingAssignment GetWritingAssignment(int id);
        LessonPlan GetLessonPlan(int id);
        ArtPiece GetArtPiece(int id);
        string Document(string URL, string Location, int Id);
        string UpdateThemesFromEdit(UpdateDocumentDTO updateDTO);
        string UpdateName(UpdateDocumentDTO updateDTO);
    }
    public class DocumentManager : IDocumentManager
    {
        private readonly ApplicationDbContext Data;

        public DocumentManager( ApplicationDbContext Data)
        {
            this.Data = Data;
        }
        public ArtPiece GetArtPiece(int id)
        {
            ArtPiece artPiece = Data.ArtPieces.Where(A => A.ArtPieceId == id).FirstOrDefault();
            if (artPiece == null)
                return null;
            artPiece.Themes = Data.ArtThemes.Where(At => At.ArtPieceId == id).ToList();
            return artPiece;
        }

        public LessonPlan GetLessonPlan(int id)
        {
               return Data.Lessonplans
                    .Where( l => l.LessonPlanId == id)
                    .Include(lesson => lesson.Lesson_Art)
                    .Include(lesson => lesson.Lesson_Poems)
                    .Include(lesson => lesson.Lesson_Writing)
                    .Include(lesson => lesson.Themes)
                    .FirstOrDefault();
        }

        public Poem GetPoem(int id)
        {
            Poem poem = Data.Poems.Where(p => p.PoemId == id).FirstOrDefault();
            if (poem == null)
                return null;
            poem.Themes = Data.PoemThemes.Where(w => w.PoemId == id).ToList();
            return poem;
        }

        public WritingAssignment GetWritingAssignment(int id)
        {
            WritingAssignment writingAssignment = Data.WritingAssignments.Where(w => w.WritingAssignmentId == id).FirstOrDefault();
            if(writingAssignment == null)
            {
                return null;
            }
            writingAssignment.Themes = Data.WritingThemes.Where(w => w.WritingAssignemntId == id).ToList();
            return writingAssignment;
        }

        public string Document(string URL, string Location, int Id)
        {
            bool updateDocument = Location == "Document";
            switch (Id.ToString()[0])
            {
                case '1' :
                    var art = GetArtPiece(Id);
                    Data.Update(art);
                    if (updateDocument)
                    {
                        art.DocumentBlobURL = URL;
                    }
                    else
                    {
                        art.ImageURL = URL;
                    }
                    Data.SaveChanges();
                    break;
                case '2':
                    var poem = GetPoem(Id);
                    if (updateDocument)
                    {
                        poem.DocumentBlobURL = URL;
                    }
                    else
                    {
                        poem.ImageURL = URL;
                    }
                    Data.SaveChanges();
                    break;
                case '3':
                    var writing = GetWritingAssignment(Id);
                    if (updateDocument)
                    {
                        writing.DocumentBlobURL = URL;
                    }
                    else
                    {
                        writing.ImageURL = URL;
                    }
                    Data.SaveChanges();
                    break;
                default:
                    return "Bad";       
            }
            return "Ok";
        }

        public string UpdateThemesFromEdit(UpdateDocumentDTO updateDTO)
        {
            switch (updateDTO.id.ToString()[0])
            {
                case '1':
                    var art = GetArtPiece(updateDTO.id);
                    Data.Update(art);
                    changeArtThemes(art, updateDTO.update);
                    Data.SaveChanges();
                    break;
                case '2':
                    var poem = GetPoem(updateDTO.id);
                    changePoemThemes(poem, updateDTO.update);
                    Data.SaveChanges();
                    break;
                case '3':
                    var writing = GetWritingAssignment(updateDTO.id);
                    changeWritingThemes(writing, updateDTO.update);
                    Data.SaveChanges();
                    break;
                default:
                    return "Bad";
            }
            return "Ok";
        }

        public string UpdateName(UpdateDocumentDTO updateDTO)
        {
            switch (updateDTO.id.ToString()[0])
            {
                case '1':
                    var art = GetArtPiece(updateDTO.id);
                    Data.Update(art);
                    art.Title = updateDTO.update;
                    Data.SaveChanges();
                    return art.Title;
                case '2':
                    var poem = GetPoem(updateDTO.id);
                    poem.Title = updateDTO.update;
                    Data.SaveChanges();
                    return poem.Title;
                case '3':
                    var writing = GetWritingAssignment(updateDTO.id);
                    writing.Title = updateDTO.update;
                    Data.SaveChanges();
                    return writing.Title;
                default:
                    return "Bad";
            }
            return "Ok";
        }
        public void changeArtThemes(ArtPiece art, string themeString)
        { 
            if(themeString == "")
            {
                return;
            }
            var currentThemes = Data.ArtThemes.Where(l => l.ArtPieceId == art.ArtPieceId).ToArray();
            var NewThemeArray = themeString.Split(",");
            int[] actions = new int[currentThemes.Length];

            /*First Nested For Loop Checks to See What Themes Must be removed*/
            for (int x = 0; x < currentThemes.Length; x++)
            {
                var reject = true;
                for (int y = 0; y < NewThemeArray.Length; y++)
                {
                    if (currentThemes[x].ThemeName == NewThemeArray[y])
                    {
                        reject = false;
                    }
                }
                if (reject == true)
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
                    Data.Add(new ArtThemes { ThemeName = NewThemeArray[x], ArtPieceId = art.ArtPieceId });
                    Console.WriteLine(NewThemeArray[x] + " Was Added");
                }
            }
            Data.SaveChanges();
        }
        public void changeWritingThemes(WritingAssignment writing, string themeString)
        {
            if (themeString == "")
            {
                return;
            }
            var currentThemes = Data.WritingThemes.Where(l => l.WritingAssignemntId == writing.WritingAssignmentId).ToArray();
            var NewThemeArray = themeString.Split(",");
            int[] actions = new int[currentThemes.Length];

            /*First Nested For Loop Checks to See What Themes Must be removed*/
            for (int x = 0; x < currentThemes.Length; x++)
            {
                var reject = true;
                for (int y = 0; y < NewThemeArray.Length; y++)
                {
                    if (currentThemes[x].ThemeName == NewThemeArray[y])
                    {
                        reject = false;
                    }
                }
                if (reject == true)
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
                    Data.Add(new WritingThemes { ThemeName = NewThemeArray[x],WritingAssignemntId = writing.WritingAssignmentId });
                    Console.WriteLine(NewThemeArray[x] + " Was Added");
                }
            }
            Data.SaveChanges();
        }
        public void changePoemThemes(Poem poem, string themeString)
        {
            if (themeString == "")
            {
                return;
            }
            var currentThemes = Data.PoemThemes.Where(l => l.PoemId == poem.PoemId).ToArray();
            var NewThemeArray = themeString.Split(",");
            int[] actions = new int[currentThemes.Length];

            /*First Nested For Loop Checks to See What Themes Must be removed*/
            for (int x = 0; x < currentThemes.Length; x++)
            {
                var reject = true;
                for (int y = 0; y < NewThemeArray.Length; y++)
                {
                    if (currentThemes[x].ThemeName == NewThemeArray[y])
                    {
                        reject = false;
                    }
                }
                if (reject == true)
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
                    Data.Add(new PoemThemes { ThemeName = NewThemeArray[x], PoemId = poem.PoemId });
                    Console.WriteLine(NewThemeArray[x] + " Was Added");
                }
            }
            Data.SaveChanges();
        }
        /*
if (id.ToString()[0] == '1')
   {
       return Ok(new { Document = DocumentManager.GetArtPiece(id), Type = "Art Piece"});
   }
   else if (id.ToString()[0] == '2')
   {
       return Ok(new { Document = DocumentManager.GetPoem(id), Type = "Poem"});
   }
   else if (id.ToString()[0] == '3')
   {
       return Ok(new { Document = DocumentManager.GetWritingAssignment(id), Type = "Writing Assignment"});
   }*/
    }
}
