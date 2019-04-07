using HopeAtHand.Models;
using HopeAtHand.Models.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Controllers
{
    [Authorize]
    [Route("api/[controller]/[Action]")]
    public class ThemeController : Controller
    {
        IThemeManager ThemeManager;

        public ThemeController(IThemeManager themeManager){
            ThemeManager = themeManager;
        }

        [HttpGet]
        public IActionResult GetThemes(){
            return Ok(ThemeManager.GetThemes());
        }

        public class CreateThemeDTO{
            public string ThemeName { get; set; }
        }

        [HttpPost]
        public IActionResult CreateTheme([FromBody]CreateThemeDTO createThemeDTO)
        {
            return Ok(ThemeManager.CreateTheme(createThemeDTO.ThemeName));
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
