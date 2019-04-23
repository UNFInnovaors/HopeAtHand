using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models.Managers
{
    public class CreateArtPieceData
    {
        public string Title { get; set; }
        public string SuppliesNeeded { get; set; }
        public string ImageURL { get; set; }
        public string WritingURL { get; set; }
        public List<Themes> Themes;
    }

    public interface IArtPieceManager
    {
        CreateResultDTO CreateArtPiece(CreateArtPieceData createData);
    }

    public class ArtPieceManager : IArtPieceManager
    {
        private ApplicationDbContext Data { get; }
        public IThemeManager themeManager { get; }

        public ArtPieceManager(ApplicationDbContext Data, IThemeManager themeManager)
        {
            this.Data = Data;
            this.themeManager = themeManager;
        }

        public CreateResultDTO CreateArtPiece(CreateArtPieceData create)
        {

            if (create.SuppliesNeeded == "" || create.Title == "")
            {
                return null;
            }
            ArtPiece ArtPieceToAdd = TrackArtPiece(1);
            themeManager.ConnectEntity(create.Themes, ArtPieceToAdd.ArtPieceId, "Art");

            ArtPieceToAdd.Title = create.Title;
            ArtPieceToAdd.ImageURL = create.ImageURL;
            ArtPieceToAdd.SuppliesNeeded = create.SuppliesNeeded;
            ArtPieceToAdd.DocumentBlobURL = create.WritingURL;
            Data.SaveChanges();
            return new CreateResultDTO
            {
                id = ArtPieceToAdd.ArtPieceId,
                imageURL = ArtPieceToAdd.ImageURL
            };
        }
        
        public ArtPiece TrackArtPiece(int numberToAdd)
        {
            ArtPiece art = new ArtPiece();
            ArtPiece trial = new ArtPiece();
            int count = Data.ArtPieces.Count() +1;


            string newID = art.ArtPieceId.ToString();
            for(int x = 0; x < newID.Length; x++)
            {
                numberToAdd *= 10;
            }
            art.ArtPieceId = numberToAdd + count;
            while(Data.ArtPieces.Find(art.ArtPieceId) != null)
            {
                art.ArtPieceId = art.ArtPieceId * 10;
            }
            Data.Database.OpenConnection();
            try
            {
                Data.Add(art);
                Data.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.ArtPieces ON");

                Data.SaveChanges();
                Data.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.ArtPieces OFF");
            }
            finally
            {
                Data.Database.CloseConnection();
            }
            return art;

        }
    }
}
