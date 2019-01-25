using HopeAtHand.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.SearchRepositories
{
    public interface IThemeSearchRepositroy
    {
        List<int> SearchThemes(List<Themes> themes);
    }

    public class ThemeSearchDTO
    {
        public List<Themes> Themes { get; set; }
    }
    public class ThemeSearchRepository : IThemeSearchRepositroy
    {
        public List<int> SearchThemes(List<Themes> themes)
        {
            return null;
        }
    }
}
