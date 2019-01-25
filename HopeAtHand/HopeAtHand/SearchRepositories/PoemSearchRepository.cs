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
    }

    public class PoemSearchRepository : IPoemSearchRepository
    {
        ApplicationDbContext Data;

        public PoemSearchRepository(ApplicationDbContext Data)
        {
            this.Data = Data;
        }

        public List<Poem> SeachForPoem(PoemSearchDTO poemSearchDTO)
        {
            List<Poem> poems;

            if (poemSearchDTO.Author.Length > 0 && poemSearchDTO.Name.Length > 0)
                return poems = Data.Poems.Where(p => p.Title.ToLower().Contains(poemSearchDTO.Name) || p.Author.ToLower().Contains(poemSearchDTO.Author)).ToList();
            else if (poemSearchDTO.Author.Length > 0 && poemSearchDTO.Name.Length == 0)
                return poems = Data.Poems.Where(p =>  p.Author.ToLower().Contains(poemSearchDTO.Author)).ToList();
            else if (poemSearchDTO.Author.Length == 0 && poemSearchDTO.Name.Length > 0)
                return poems = Data.Poems.Where(p => p.Title.ToLower().Contains(poemSearchDTO.Name)).ToList();
            return new List<Poem>();
        }
    }
}
