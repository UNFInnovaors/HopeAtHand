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
            return Ok( new ThemesDTO { Themes = new Themes[] {
                new Themes { ThemeName= "Female Empowerment" },
                new Themes { ThemeName = "Male Empowermet" },
                new Themes { ThemeName= "Self Acceptance" },
                new Themes { ThemeName= "Connectivity" },
                new Themes { ThemeName= "Final Option" },
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
