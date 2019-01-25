using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models.Managers
{
    public class FavoriteCreateDTO
    {
        public int DocumentId { get; set; }
        public int FascilitatorId { get; set; }
    }

    public interface IFavoriteManager
    {
        Favorite CreateFavoriate(FavoriteCreateDTO create);
    }

    public class FavoriteManager : IFavoriteManager
    {
        private readonly ApplicationDbContext Data;

        public FavoriteManager(ApplicationDbContext Data)
        {
            this.Data = Data; 
        }

        public Favorite CreateFavoriate(FavoriteCreateDTO create )
        {
            Favorite favorite = new Favorite()
            {
                DocumentID = create.DocumentId,
                FacilitatorID = create.DocumentId,
                DocumentType = DetermineDocumentType(create.DocumentId)
            };
            Data.Database.OpenConnection();
            try
            {
                Data.Add(favorite);
                Data.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Favorites ON");

                Data.SaveChanges();
                Data.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Favorites OFF");
            }
            finally
            {
                Data.Database.CloseConnection();
            }
            return favorite;
        }

        public string DetermineDocumentType(int id)
        {
            switch ((int)char.GetNumericValue(id.ToString()[0]))
            {
                case 1:
                    return "Art Piece";
                case 2:
                    return "Poem";
                case 3:
                    return "Writing Assignment";
                case 5:
                    return "Lesson Plan";
                default:
                    return "Error";
            }
        }
    }
}
