using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HopeAtHand.Models;

namespace HopeAtHand.Models
{
    public interface IPoemRepo
    {
        IEnumerable<Poem> GetPoem(string poemTagResult, string poemThemeResult);

    }

    public class PoemRepository : IPoemRepo
    {

        public IEnumerable<Poem> GetPoem(string poemTagResult, string poemThemeResult)
        {
            IEnumerable<Poem> PoemPieces = (IEnumerable<Poem>)PoemRepo.Poems.Values.Where(P => P.Tag == poemTagResult || P.Theme == poemThemeResult).ToList();

            return PoemPieces;
        }
    }
}