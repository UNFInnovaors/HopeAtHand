using HopeAtHand.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.SearchRepositories
{
    public interface IArtPieceSearchRepository
    {
        List<ArtPiece> SeachForArtPiece(ArtPieceSearchDTO ArtPieceSearchDTO);
    }

    public class ArtPieceSearchDTO
    {
        public string Name { get; set; }
        public string SuppliesNeeded { get; set; }
    }

    public class ArtPieceSearchRepository : IArtPieceSearchRepository
    {
        ApplicationDbContext Data;

        public ArtPieceSearchRepository(ApplicationDbContext Data)
        {
            this.Data = Data;
        }

        public List<ArtPiece> SeachForArtPiece(ArtPieceSearchDTO ArtPieceSearchDTO)
        {
            List<ArtPiece> ArtPieces;

            if (ArtPieceSearchDTO.Name.Length > 0 && ArtPieceSearchDTO.SuppliesNeeded.Length > 0)
                return ArtPieces = Data.ArtPieces.Where(p => p.Title.ToLower().Contains(ArtPieceSearchDTO.Name) || p.SuppliesNeeded.ToLower().Contains(ArtPieceSearchDTO.SuppliesNeeded)).ToList();
            else if (ArtPieceSearchDTO.SuppliesNeeded.Length > 0 && ArtPieceSearchDTO.Name.Length == 0)
                return ArtPieces = Data.ArtPieces.Where(p => p.SuppliesNeeded.ToLower().Contains(ArtPieceSearchDTO.SuppliesNeeded)).ToList();
            else if (ArtPieceSearchDTO.SuppliesNeeded.Length == 0 && ArtPieceSearchDTO.Name.Length > 0)
                return ArtPieces = Data.ArtPieces.Where(p => p.Title.ToLower().Contains(ArtPieceSearchDTO.Name)).ToList();
            return new List<ArtPiece>();
        }
    }
}
