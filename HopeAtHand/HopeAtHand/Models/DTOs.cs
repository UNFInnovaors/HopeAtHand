using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models
{
    public class LessonSearchDTO
    {
        public string theme { get; set; }
        public string tags { get; set; }
    }

    public class PoemDTO
    {
        public string theme { get; set; }
        public string tags { get; set; }
    }

    public class UploadFileDTO
    {
        public Dictionary<string, string> values { get; set; }
        public ThemesDTO themes { get; set; }
    }

    public class UpdateDTO
    {
        public string update { get; set; }
        public int lessonPlanId { get; set; }
    }

    public class ThemeDto
    {

    }
    public class ThemesDTO
    {
        public Themes[] Themes { get; set; }
    }

    public class ChangeRoleDTO
    {
        public string NewRole { get; set; }
        public int FacilitatorId { get; set; }
    }

    public class FascilitatorSearchDTO
    {
        public string SearchString { get; set; }
    }

    public class SearchRoleDTO
    {
        public string role { get; set; }
    }

    public class FavoriteFindDTO
    {
        public string username { get; set; }
    }
    public class CreateResultDTO
    {
        public int id { get; set; }
        public string imageURL { get; set; }
    }
    public class LessonPlanThemeSearch
    {
        public string LesssonName { get; set; } = "";
        public string[] Themes { get; set; }
    }

}
