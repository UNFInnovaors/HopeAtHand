using HopeAtHand.AzureHelper;
using HopeAtHand.Models;
using HopeAtHand.Models.Managers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Controllers
{
    public class URLContainer
    {
        public string CompleteDocumentURL { get; set; } = "";
        public string DocumentOutlineURL { get; set; } = "";
        public string DocumentOutlinePicture { get; set; } = "";

    }
    [Route("api/[controller]/[Action]")]
    public class BlobCreatorController : Controller
    {
        private readonly AzureStorageConfig storageConfig;
        private readonly IPoemManager poemManager;
        private readonly IWritingTemplateManager WritingTemplate;
        private readonly IArtPieceManager ArtPieceManager;

        public BlobCreatorController(IOptions<AzureStorageConfig> config, 
                                    IPoemManager poemManager, 
                                    IWritingTemplateManager writingTemplate, 
                                    IArtPieceManager artPieceManager)
        {
            storageConfig = config.Value;
            this.poemManager = poemManager;
            WritingTemplate = writingTemplate;
            ArtPieceManager = artPieceManager;
        }

    [HttpPost]
    public async Task<IActionResult> createNewBlob()
    {
        CreateResultDTO result = new CreateResultDTO();
        IFormFile formFile = HttpContext.Request.Form.Files[0];
        var something = HttpContext.Request.Form.Keys;
        Dictionary<string, string> keyValuePairs = new Dictionary<string, string>();
        foreach (string key in something)
        {
            keyValuePairs.Add(key, HttpContext.Request.Form[key]);
        }
        List<Themes> themes = new List<Themes>();

        foreach (string themeName in keyValuePairs.GetValueOrDefault("theme").Split(","))
        {
            themes.Add(new Models.Themes { ThemeName = themeName });
        }
        keyValuePairs.Remove("theme");
        var cont = HttpContext;
        try
        {
            string imageURL = "";
            string documentURL = "";
            if (storageConfig.AccountKey == string.Empty || storageConfig.AccountName == string.Empty)

                return BadRequest("sorry, can't retrieve your azure storage details from appsettings.js, make sure that you add azure storage details there");

            if (storageConfig.ImageContainer == string.Empty)

                return BadRequest("Please provide a name for your image container in the azure blob storage");
            if (AzureHelper.StorageHelper.IsImage(formFile))
            {
                Uri blockBlobURI = null;
                if (HttpContext.Request.Form.Files.Count > 1 && HttpContext.Request.Form.Files[1].Length > 0)
                {
                    formFile = HttpContext.Request.Form.Files[1];
                    using (Stream stream = formFile.OpenReadStream())
                    {

                        CloudBlockBlob blockBlob = await StorageHelper.UploadFileToStorage(stream, formFile.FileName, storageConfig);
                        blockBlobURI = blockBlob.Uri;
                        imageURL = blockBlob.Uri.ToString();
                        formFile = HttpContext.Request.Form.Files[0];
                    }
                }
                if (formFile.Length > 0)
                {
                    using (Stream stream = formFile.OpenReadStream())
                    {
                        CloudBlockBlob blockBlob = await StorageHelper.UploadFileToStorage(stream, formFile.FileName, storageConfig);
                        if (blockBlobURI != null)
                        {
                            blockBlob.Metadata.Add("ImageURI", blockBlobURI.ToString());
                            await blockBlob.SetMetadataAsync();
                        }
                        documentURL = blockBlob.Uri.ToString();
                    }
                }
                
                if (keyValuePairs.GetValueOrDefault("type") == "Poem")
                {
                    result = poemManager.CreatePoem(new CreatePoemData
                    {
                        Author = keyValuePairs.GetValueOrDefault("author"),
                        ImageURL = imageURL,
                        PoemURL = documentURL,
                        PoemName = keyValuePairs.GetValueOrDefault("name"),
                        Themes = themes
                    });
                }
                else if(keyValuePairs.GetValueOrDefault("type") == "Writing Template")
                {
                    result = WritingTemplate.CreateWritingAssignment(new CreateWritingAssignmentData
                    {
                        AgeGroup = keyValuePairs.GetValueOrDefault("writingType"),
                        ImageURL = imageURL,
                        WritingURL = documentURL,
                        Themes = themes,
                        WritingAssignmentName = keyValuePairs.GetValueOrDefault("name")


                    });
                }
                else if(keyValuePairs.GetValueOrDefault("type") == "Art Piece")
                {
                    result = ArtPieceManager.CreateArtPiece(new CreateArtPieceData
                    {
                        ImageURL = imageURL,
                        WritingURL = documentURL,
                        Themes = themes,
                        SuppliesNeeded = keyValuePairs.GetValueOrDefault("supplies"),
                        Title = keyValuePairs.GetValueOrDefault("name"),
                    });
                }
            }
            else
            {
                return new UnsupportedMediaTypeResult();
            }
                
            return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpPost]
        public async Task<IActionResult> UploadLessonPlanBlobs()
        {
            var files = HttpContext.Request.Form.Files;
            var keys = HttpContext.Request.Form.Keys;

            URLContainer urls = new URLContainer();
            try
            {
                if (storageConfig.AccountKey == string.Empty || storageConfig.AccountName == string.Empty)
                    return BadRequest("sorry, can't retrieve your azure storage details from appsettings.js, make sure that you add azure storage details there");
                if (storageConfig.ImageContainer == string.Empty)
                    return BadRequest("Please provide a name for your image container in the azure blob storage");

                IFormFile formFile = HttpContext.Request.Form.Files[0];
                if (formFile != null)
                {
                    using (Stream stream = formFile.OpenReadStream())
                    {
                        CloudBlockBlob blockBlob = await StorageHelper.UploadFileToStorage(stream, formFile.FileName, storageConfig);
                        
                            urls.CompleteDocumentURL = blockBlob.Uri.ToString();
                    }
                }

                formFile = HttpContext.Request.Form.Files[1];
                if(formFile != null)
                {
                    using (Stream stream = formFile.OpenReadStream())
                    {
                        CloudBlockBlob blockBlob = await StorageHelper.UploadFileToStorage(stream, formFile.FileName, storageConfig);
                        urls.DocumentOutlineURL = blockBlob.Uri.ToString();
                    }
                }

                formFile = HttpContext.Request.Form.Files[2];
                if (formFile != null)
                {
                    using (Stream stream = formFile.OpenReadStream())
                    {
                        CloudBlockBlob blockBlob = await StorageHelper.UploadFileToStorage(stream, formFile.FileName, storageConfig);
                        urls.DocumentOutlinePicture = blockBlob.Uri.ToString();
                    }
                }
                return Ok(urls);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

    public static class ThemeManager
    {
        public static List<Themes> IdToTheme(Themes[] Themes, string[] idsToConvert)
        {
            List<Themes> themes = new List<Themes>();
            foreach(string id in idsToConvert)
            {
                themes.Add(Themes.FirstOrDefault());
            }
            return themes;
        }
    }
}


//CloudStorageAccount storageAccount = null;
//CloudBlobContainer cloudBlobContainer = null;
//string sourceFile = null;
//string destinationFile = null;

//Console.WriteLine(Environment.GetEnvironmentVariable("storageconnectionstring"));
//string connector = Environment.GetEnvironmentVariable("storageconnectionstring");
//if (CloudStorageAccount.TryParse(connector, out storageAccount))
//{
/** try
 {
     CloudBlobClient cloudBlobClient = storageAccount.CreateCloudBlobClient();

     cloudBlobClient = storageAccount.CreateCloudBlobClient();

     cloudBlobContainer = cloudBlobClient.GetContainerReference("htmljs");
     cloudBlobContainer.CreateIfNotExistsAsync();
 }
 catch
 {

 }
}*/
