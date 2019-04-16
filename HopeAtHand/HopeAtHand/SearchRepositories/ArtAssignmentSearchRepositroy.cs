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
        List<ArtPiece> SeachForArtPieceWithThemes(ArtPieceSearchThemesDTO artSearchDTO);
    }

    public class ArtPieceSearchDTO
    {
        public string Name { get; set; } = "";
        public string SuppliesNeeded { get; set; } = "";
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
            ArtPieceSearchDTO.Name = ArtPieceSearchDTO.Name.ToLower();
            List<ArtPiece> ArtPieces;

            if (ArtPieceSearchDTO.Name.Length > 0 && ArtPieceSearchDTO.SuppliesNeeded.Length > 0)
                return ArtPieces = Data.ArtPieces.Where(p => p.Title.ToLower().Contains(ArtPieceSearchDTO.Name) || p.SuppliesNeeded.ToLower().Contains(ArtPieceSearchDTO.SuppliesNeeded)).ToList();
            else if (ArtPieceSearchDTO.SuppliesNeeded.Length > 0 && ArtPieceSearchDTO.Name.Length == 0)
                return ArtPieces = Data.ArtPieces.Where(p => p.SuppliesNeeded.ToLower().Contains(ArtPieceSearchDTO.SuppliesNeeded)).ToList();
            else if (ArtPieceSearchDTO.SuppliesNeeded.Length == 0 && ArtPieceSearchDTO.Name.Length > 0)
                return ArtPieces = Data.ArtPieces.Where(p => p.Title.ToLower().Contains(ArtPieceSearchDTO.Name)).ToList();
            return new List<ArtPiece>();
        }

        public object SeachForArtPieceThemes(ArtPieceSearchThemesDTO artSearchDTO)
        {
            List<ArtPiece> lessonPlans = new List<ArtPiece>();
            Dictionary<int, string> foundId = new Dictionary<int, string>();

            foreach (var lesson in Data.ArtThemes)
            {
                foreach (string theme in artSearchDTO.Themes)
                {
                    if (theme == lesson.ThemeName)
                    {
                        if (foundId.GetValueOrDefault(lesson.ArtPieceId) is null)
                            lessonPlans.Add(Data.ArtPieces.Find(lesson.ArtPieceId));
                        break;
                    }
                }
            }
            foreach (var lesson in Data.ArtPieces)
            {
                if (lesson.Title.ToLower().Contains(artSearchDTO.Name) && foundId.GetValueOrDefault(lesson.ArtPieceId) is null)
                    lessonPlans.Add(lesson);
            }
            List<ArtPiece   > finalized = lessonPlans.Where(l => l != null).ToList();
            return finalized;
        }

        public List<ArtPiece> SeachForArtPieceWithThemes(ArtPieceSearchThemesDTO artSearchDTO)
        {
            List<ArtPiece> artPieces = new List<ArtPiece>();
            Dictionary<int, string> foundId = new Dictionary<int, string>();

            foreach (var lesson in Data.ArtThemes)
            {
                foreach (string theme in artSearchDTO.Themes)
                {
                    if (theme == lesson.ThemeName)
                    {
                        if (foundId.GetValueOrDefault(lesson.ArtPieceId) is null)
                        {
                            artPieces.Add(Data.ArtPieces.Find(lesson.ArtPieceId));
                            foundId.Add(lesson.ArtPieceId, "");
                        }
                        break;
                    }
                }
            }
            foreach (var lesson in Data.ArtPieces)
            {
                if (foundId.GetValueOrDefault(lesson.ArtPieceId) is null && lesson.Title == artSearchDTO.Name)
                {
                    artPieces.Add(lesson);
                    foundId.Add(lesson.ArtPieceId, "");
                }
            }
            List<ArtPiece> finalized = artPieces.Where(l => l != null).ToList();
            return finalized;
        }
    }
}
