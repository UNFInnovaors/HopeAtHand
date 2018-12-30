using HopeAtHand.AzureHelper;
using HopeAtHand.Models;
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
    [Route("api/[controller]/[Action]")]
    public class BlobCreatorController : Controller
    {
        public Themes[] Themes = new Themes[] {
                new Themes { ThemeName = "Female Empowerment" },
                new Themes { ThemeName =  "Male Empowermet" },
                new Themes { ThemeName =  "Self Acceptance" },
                new Themes { ThemeName =  "Connectivity" },
                new Themes { ThemeName =  "Final Option" }, };

        private readonly AzureStorageConfig storageConfig;
        public BlobCreatorController(IOptions<AzureStorageConfig> config)
        {
            storageConfig = config.Value;
        }

        [HttpPost]
        public async Task<IActionResult> createNewBlob()
        {
            //Recieve Files From Cliet
            IFormFile formFile = HttpContext.Request.Form.Files[0];
            var something = HttpContext.Request.Form.Keys;
            Dictionary<string, string> keyValuePairs = new Dictionary<string, string>();
            foreach (string key in something)
            {
                keyValuePairs.Add(key, HttpContext.Request.Form[key]);
            }
            List<Themes> themes = ThemeManager.IdToTheme(Themes, keyValuePairs.GetValueOrDefault("theme").Split(","));
            keyValuePairs.Remove("theme");
            var cont = HttpContext;
            bool isUploaded = false;

            try
            {

                if (storageConfig.AccountKey == string.Empty || storageConfig.AccountName == string.Empty)

                    return BadRequest("sorry, can't retrieve your azure storage details from appsettings.js, make sure that you add azure storage details there");

                if (storageConfig.ImageContainer == string.Empty)

                    return BadRequest("Please provide a name for your image container in the azure blob storage");
                if (AzureHelper.StorageHelper.IsImage(formFile))
                {
                    if (formFile.Length > 0)
                    {
                        using (Stream stream = formFile.OpenReadStream())
                        {
                            CloudBlockBlob blockBlob = await StorageHelper.UploadFileToStorage(stream, formFile.FileName, storageConfig);
                            foreach(string key in keyValuePairs.Keys)
                            {
                                blockBlob.Metadata.Add(key, keyValuePairs.GetValueOrDefault(key));
                            }
                            for(int x = 1; x < themes.Count()+1; x++)
                            {
                                blockBlob.Metadata.Add("theme" + x, JsonConvert.SerializeObject(themes.ToArray()[x - 1]));
                            }
                            await blockBlob.SetMetadataAsync();
                        }
                    }
                }
                else
                {
                    return new UnsupportedMediaTypeResult();
                }

                if (isUploaded)
                {
                    if (storageConfig.ThumbnailContainer != string.Empty)

                        return new AcceptedAtActionResult("GetThumbNails", "BlobCreatorController", null, null);

                    else

                        return new AcceptedResult();
                }
                else

                    return BadRequest("Look like the image couldnt upload to the storage");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("thumbnails")]
        public async Task<IActionResult> GetThumbNails()
        {

            try
            {
                if (storageConfig.AccountKey == string.Empty || storageConfig.AccountName == string.Empty)

                    return BadRequest("sorry, can't retrieve your azure storage details from appsettings.js, make sure that you add azure storage details there");

                if (storageConfig.ImageContainer == string.Empty)

                    return BadRequest("Please provide a name for your image container in the azure blob storage");

                List<string> thumbnailUrls = await StorageHelper.GetThumbNailUrls(storageConfig);

                return new ObjectResult(thumbnailUrls);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> CreateList()
        {

            List<string> urls = await StorageHelper.GetThumbNailUrls(storageConfig);
            return Ok(urls);
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
