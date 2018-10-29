using HopeAtHand.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Controllers
{
    [Route("api/[controller]/[Action]")]
    public class BlobCreatorController : Controller
    {
        [HttpPost]
        public IActionResult createNewBlob()
        {
            var file = HttpContext.Request.Form.Files[0];
            return Ok(file);
        }
    }
}
