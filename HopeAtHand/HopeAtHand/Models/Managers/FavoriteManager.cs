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
        public string Username { get; set; }
    }

    public interface IFavoriteManager
    {
        Favorite CreateFavoriate(FavoriteCreateDTO create);
        List<Favorite> FindFavorites(FavoriteFindDTO findDTO);
    }

    public class FavoriteManager : IFavoriteManager
    {
        private readonly ApplicationDbContext Data;

        public FavoriteManager(ApplicationDbContext Data)
        {
            this.Data = Data; 
        }

        public Favorite CreateFavoriate(FavoriteCreateDTO create)
        {
            Facilitator f = Data.Facilitators.Where(w => w.Username == create.Username).FirstOrDefault();
            Favorite favor = Data.Favorites.Where(w => w.DocumentID == create.DocumentId && w.FacilitatorID == f.FacilitatorID).FirstOrDefault();
            if (favor != null)
                return null;
            Favorite favorite = new Favorite()
            {
                DocumentID = create.DocumentId,
                FacilitatorID = Data.Facilitators.Where( w => w.Username == create.Username).First().FacilitatorID,
                DocumentType = DetermineDocumentType(create.DocumentId)
            };
            Data.Database.OpenConnection();
            try
            {
                Data.Add(favorite);
                //Data.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Favorites ON");

                Data.SaveChanges();
                //Data.Database.ExecuteSqlCommand("SET IDENTITY_INSERT dbo.Favorites OFF");
            }
            finally
            {
                Data.Database.CloseConnection();
            }
            return favorite;
        }
        public List<Favorite> FindFavorites(FavoriteFindDTO findDTO)
        {
            Facilitator f = Data.Facilitators.Where(w => w.Username == findDTO.username).FirstOrDefault();
            return Data.Favorites.Where(fav => fav.FacilitatorID == f.FacilitatorID).ToList();
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
