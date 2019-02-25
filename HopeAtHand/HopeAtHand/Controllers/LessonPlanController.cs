using HopeAtHand.AzureHelper;
using HopeAtHand.Models;
using HopeAtHand.Models.Managers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Controllers
{
    [Route("api/[controller]/[Action]")]
    public class LessonPlanController : Controller
    {
        private readonly AzureStorageConfig StorageConfig;
        private readonly ILessonPlanCreateManager LessonPlanCreation;
        private readonly ILessonPlanRepository LessonPlanRepo;

        public LessonPlanController(ILessonPlanCreateManager lessonPlanCreateManager, ILessonPlanRepository lessonPlanRepository, 
            IOptions<AzureStorageConfig> config)
        {
            LessonPlanCreation = lessonPlanCreateManager;
            LessonPlanRepo = lessonPlanRepository;
            StorageConfig = config.Value;
        }

        /*public async Task<ActionResult> CreateLesson([FromBody]LessonPlanCreationDTO creationDTO)
        {
             return Ok();
        }*/

        public async Task<ActionResult> SaveLesson([FromBody] LessonPlanCreationDTO creationDTO)
        {
            LessonPlan lesson = LessonPlanCreation.SaveLessonPLan(creationDTO);
            if (lesson == null)
            {
                return BadRequest();
            }
            else return Ok(lesson);
        }

        public IActionResult UpdateNotes([FromBody] UpdateDTO updateDTO)
        {
            return Ok(LessonPlanRepo.UpdateNote(updateDTO));
        }

        public IActionResult UpdateLocations([FromBody] UpdateDTO updateDTO)
        {
            return Ok(LessonPlanRepo.UpdateLocation(updateDTO));
        }

        [HttpPost]
        public IActionResult UpdateName([FromBody] UpdateDTO updateDTO)
        {
            return Ok(LessonPlanRepo.UpdateLessonName(updateDTO));
        }
        //Fromeditpage
        [HttpPost]
        public IActionResult UpdateNotesFromEdit([FromBody] UpdateDTO updateDTO)
        {
            return Ok(LessonPlanRepo.UpdateNotes(updateDTO));
        }
        //From Edit Page
        [HttpPost]
        public IActionResult UpdateLocationsFromEdit([FromBody] UpdateDTO updateDTO)
        {
            return Ok(LessonPlanRepo.UpdateLocations(updateDTO));
        }

        [HttpPost]
        public IActionResult UpdateThemesFromEdit([FromBody] UpdateDTO updateDTO)
        {
            return Ok(LessonPlanRepo.UpdateThemesFromEdit(updateDTO));
        }

        public async Task<IActionResult> Complete()
        {
            int ID = Int32.Parse(HttpContext.Request.Form["Id"]);
            try
            {
                if (StorageConfig.AccountKey == string.Empty || StorageConfig.AccountName == string.Empty)
                    return BadRequest("sorry, can't retrieve your azure storage details from appsettings.js, make sure that you add azure storage details there");
                if (StorageConfig.ImageContainer == string.Empty)
                    return BadRequest("Please provide a name for your image container in the azure blob storage");

                IFormFile formFile = HttpContext.Request.Form.Files[0];
                if (formFile != null)
                {
                    using (Stream stream = formFile.OpenReadStream())
                    {
                        CloudBlockBlob blockBlob = await StorageHelper.UploadFileToStorage(stream, formFile.FileName, StorageConfig);
                        return Ok(LessonPlanRepo.Complete(blockBlob.Uri.ToString(), "Complete", ID));
                        
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                return BadRequest(null);
            }
        }
    
        public async Task<IActionResult> Outline()
        {
            int ID = Int32.Parse(HttpContext.Request.Form["Id"]);
            try
            {
                if (StorageConfig.AccountKey == string.Empty || StorageConfig.AccountName == string.Empty)
                    return BadRequest("sorry, can't retrieve your azure storage details from appsettings.js, make sure that you add azure storage details there");
                if (StorageConfig.ImageContainer == string.Empty)
                    return BadRequest("Please provide a name for your image container in the azure blob storage");

                IFormFile formFile = HttpContext.Request.Form.Files[0];
                if (formFile != null)
                {
                    using (Stream stream = formFile.OpenReadStream())
                    {
                        CloudBlockBlob blockBlob = await StorageHelper.UploadFileToStorage(stream, formFile.FileName, StorageConfig);
                        return Ok(LessonPlanRepo.Complete(blockBlob.Uri.ToString(), "Outline", ID));

                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                return BadRequest(null);
            }
        }

        public async Task<IActionResult> Picture()
        {
            int ID = Int32.Parse(HttpContext.Request.Form["Id"]);
            try
            {
                if (StorageConfig.AccountKey == string.Empty || StorageConfig.AccountName == string.Empty)
                    return BadRequest("sorry, can't retrieve your azure storage details from appsettings.js, make sure that you add azure storage details there");
                if (StorageConfig.ImageContainer == string.Empty)
                    return BadRequest("Please provide a name for your image container in the azure blob storage");

                IFormFile formFile = HttpContext.Request.Form.Files[0];
                if (formFile != null)
                {
                    using (Stream stream = formFile.OpenReadStream())
                    {
                        CloudBlockBlob blockBlob = await StorageHelper.UploadFileToStorage(stream, formFile.FileName, StorageConfig);
                        return Ok(LessonPlanRepo.Complete(blockBlob.Uri.ToString(), "Picture", ID));

                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                return BadRequest(null);
            }
        }
    }
}
