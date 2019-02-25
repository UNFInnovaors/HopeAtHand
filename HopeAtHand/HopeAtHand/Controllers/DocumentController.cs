using HopeAtHand.AzureHelper;
using HopeAtHand.Models;
using HopeAtHand.Models.Managers;
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
    public class DocumentController : Controller
    {
        private readonly ApplicationDbContext Data;
        private readonly IDocumentManager DocumentManager;
        private readonly AzureStorageConfig StorageConfig;

        public DocumentController(ApplicationDbContext Data, IDocumentManager DocumentManager, IOptions<AzureStorageConfig> config)
        {
            this.Data = Data;
            this.DocumentManager = DocumentManager;
            StorageConfig = config.Value;
        }
        [HttpGet]
        [Route("api/[controller]/[Action]/{id}")]
        public IActionResult GetDocument(int id)
        {
            if(id.ToString()[0] == '1')
            {
                return Ok(new {Document = DocumentManager.GetArtPiece(id), Type="Art Piece", Id = DocumentManager.GetArtPiece(id).ArtPieceId });
            }
            else if(id.ToString()[0] == '2')
            {
                return Ok(new { Document = DocumentManager.GetPoem(id), Type = "Poem", Id = DocumentManager.GetPoem(id).PoemId });
            }
            else if (id.ToString()[0] == '3')
            {
                return Ok(new { Document = DocumentManager.GetWritingAssignment(id), Type = "Writing Assignment", Id = DocumentManager.GetWritingAssignment(id).WritingAssignmentId });
            }
            else if (id.ToString()[0] == '5')
            {
                return Ok(new { Document = DocumentManager.GetLessonPlan(id), Type = "Lesson Plan", Id = DocumentManager.GetLessonPlan(id).LessonPlanId });
            }
            return NotFound();
        }
        [Route("api/[controller]/[Action]/{id}")]
        public IActionResult GetFullDocument(int id)
        {
            if (id.ToString()[0] == '1')
            {
                return Ok(new { Document = DocumentManager.GetArtPiece(id), Type = "Art Piece"});
            }
            else if (id.ToString()[0] == '2')
            {
                return Ok(new { Document = DocumentManager.GetPoem(id), Type = "Poem"});
            }
            else if (id.ToString()[0] == '3')
            {
                return Ok(new { Document = DocumentManager.GetWritingAssignment(id), Type = "Writing Assignment"});
            }
            return NotFound();
        }
        [HttpPost]
        [Route("api/[Controller]/[Action]")]
        public async Task<IActionResult> Document()
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
                        return Ok(DocumentManager.Document(blockBlob.Uri.ToString(), "Document", ID));

                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                return BadRequest(null);
            }
        }

        [HttpPost]
        [Route("api/[Controller]/[Action]")]
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
                        return Ok(DocumentManager.Document(blockBlob.Uri.ToString(), "Picture", ID));
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                return BadRequest(null);
            }
        }

        [HttpPost]
        [Route("api/[Controller]/[Action]")]
        public IActionResult UpdateName([FromBody] UpdateDocumentDTO updateDTO)
        {
            return Ok(DocumentManager.UpdateName(updateDTO));
        }

        [HttpPost]
        [Route("api/[Controller]/[Action]")]
        public IActionResult UpdateThemesFromEdit([FromBody] UpdateDocumentDTO updateDTO)
        {
            return Ok(DocumentManager.UpdateThemesFromEdit(updateDTO));
        }
    }
}
