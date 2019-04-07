using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HopeAtHand.Models.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HopeAtHand.Controllers
{
    public class CreateTemplateDTO
    {
        public string TemplateName { get; set; }
    }
    [Authorize]
    [Route("api/[controller]/[Action]")]
    public class WritingTemplateController : Controller
    {
        IWritingTemplateManager writingTemplateManager;

        public WritingTemplateController(IWritingTemplateManager writingTempalteManager)
        {
            this.writingTemplateManager = writingTempalteManager;
        }
        [HttpGet]
        public IActionResult GetTemplates()
        {
            return Ok(writingTemplateManager.WritingTempaltes());
        }
        [HttpPost]
        public IActionResult CreateTemplate([FromBody] CreateTemplateDTO createTemplate)
        {

            return Ok(writingTemplateManager.CreateTemplateType(createTemplate));
        }
        [HttpGet("{id}")]
        public IActionResult Find(int id)
        {
            var result = writingTemplateManager.Find(id);
            return Ok(writingTemplateManager.Find(id));
        }
    }
}
