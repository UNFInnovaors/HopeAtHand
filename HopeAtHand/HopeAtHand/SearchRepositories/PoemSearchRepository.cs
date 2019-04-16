using HopeAtHand.Controllers;
using HopeAtHand.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.SearchRepositories
{
    public interface IPoemSearchRepository
    {
        List<Poem> SeachForPoem(PoemSearchDTO poemSearchDTO);
        List<Poem> SeachForPoemWithThemes(PoemSearchDTO poemSearchDTO);
    }

    public class PoemSearchRepository : IPoemSearchRepository
    {
        ApplicationDbContext Data;

        public PoemSearchRepository(ApplicationDbContext Data)
        {
            this.Data = Data;
        }

        public List<Poem> SeachForPoemWithThemes(PoemSearchDTO poemSearchDTO)
        {
            poemSearchDTO.Name = poemSearchDTO.Name.ToLower();
            poemSearchDTO.Author = poemSearchDTO.Author.ToLower();

            List<Poem> poems = new List<Poem>();
            Dictionary<int, string> foundId = new Dictionary<int, string>();

            foreach (var lesson in Data.PoemThemes)
            {
                foreach (string theme in poemSearchDTO.Themes)
                {
                    if (theme == lesson.ThemeName)
                    {
                        if (foundId.GetValueOrDefault(lesson.PoemId) is null)
                        { 
                            poems.Add(Data.Poems.Find(lesson.PoemId));
                            foundId.Add(lesson.PoemId, "");
                        }
                        break;
                    }
                }
            }
            foreach (var lesson in Data.Poems)
            {
                if ((foundId.GetValueOrDefault(lesson.PoemId) is null && (lesson.Title.ToLower().Contains(poemSearchDTO.Name)) || lesson.Author.ToLower().Contains(poemSearchDTO.Author)))
                    poems.Add(lesson);
            }
            List<Poem> finalized = poems.Where(l => l != null).ToList();
            return finalized;
        }

        public List<Poem> SeachForPoem(PoemSearchDTO poemSearchDTO)
        {
            poemSearchDTO.Name = poemSearchDTO.Name.ToLower();
            poemSearchDTO.Author = poemSearchDTO.Author.ToLower();
            List<Poem> poems;

            if (poemSearchDTO.Author.Length > 0 && poemSearchDTO.Name.Length > 0)
            {
                poems = Data.Poems.Where(p => p.Title.ToLower().Contains(poemSearchDTO.Name) || p.Author.ToLower().Contains(poemSearchDTO.Author)).ToList();
                foreach(var poem in poems)
                {
                    poem.Themes = Data.PoemThemes.Where(p => p.PoemId == poem.PoemId).ToList();
                }
                return poems;
            }
            else if (poemSearchDTO.Author.Length > 0 && poemSearchDTO.Name.Length == 0)
                return poems = Data.Poems.Where(p => p.Author.ToLower().Contains(poemSearchDTO.Author)).ToList();
            else if (poemSearchDTO.Author.Length == 0 && poemSearchDTO.Name.Length > 0)
                return poems = Data.Poems.Where(p => p.Title.ToLower().Contains(poemSearchDTO.Name)).ToList();
            return new List<Poem>();
        }
    }
}
