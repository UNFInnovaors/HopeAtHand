using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models
{
    public class LessonPLanCreateDTO
    {
        public int [] documentIds { get; set; }
        public string [] themes { get; set; }
        public string lessonPlanName { get; set; }
    }
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

    public class ThemeDto
    {
        
    }
    public class ThemesDTO
    {
        public Themes[] Themes { get; set; }
    }
}
