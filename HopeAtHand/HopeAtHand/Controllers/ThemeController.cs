using HopeAtHand.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Controllers
{
    [Route("api/[controller]/[Action]")]
    public class ThemeController : Controller
    {
        [HttpGet]
        public IActionResult GetThemes()
        { 
            return Ok( new ThemesDTO { Themes = new Theme[] {
                new Theme { ThemeId = 0, Label="Female Empowerment", Value= "Female Empowerment" },
                new Theme { ThemeId = 1, Label="Male Empowermet", Value= "Male Empowermet" },
                new Theme { ThemeId = 2, Label = "Self Acceptance", Value = "Self Acceptance" },
                new Theme { ThemeId = 3, Label = "Connectivity", Value = "Connectivity" },
                new Theme { ThemeId = 4, Label = "Fial Option", Value = "Final Option" },
            }});
        }
        [HttpPost]
        public IActionResult SeePost()
        {
            IFormFile formFile = HttpContext.Request.Form.Files[0];
            var something = HttpContext.Request.Form.Keys;
            Dictionary<string, string> keyValuePairs = new Dictionary<string, string>();
            foreach (string key in something)
            {
                keyValuePairs.Add(key, HttpContext.Request.Form[key]);
            }
            var cont = HttpContext;
            return Ok();
        }
    }
}
