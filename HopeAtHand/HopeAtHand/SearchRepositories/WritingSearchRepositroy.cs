using HopeAtHand.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.SearchRepositories
{
    public interface IWritingAssignmentSearchRepository
    {
        List<WritingAssignment> SeachForWritingAssignment(WritingAssignmentSearchDTO WritingAssignmentSearchDTO);
    }

    public class WritingAssignmentSearchDTO
    {
        public string Name { get; set; }
        public string AgeGroups { get; set; }
    }

    public class WritingAssignmentSearchRepository : IWritingAssignmentSearchRepository
    {
        ApplicationDbContext Data;

        public WritingAssignmentSearchRepository(ApplicationDbContext Data)
        {
            this.Data = Data;
        }

        public List<WritingAssignment> SeachForWritingAssignment(WritingAssignmentSearchDTO WritingAssignmentSearchDTO)
        {
            List<WritingAssignment> WritingAssignments;

            if (WritingAssignmentSearchDTO.Name.Length > 0 && WritingAssignmentSearchDTO.AgeGroups.Length > 0)
                return WritingAssignments = Data.WritingAssignments.Where(p => p.Title.ToLower().Contains(WritingAssignmentSearchDTO.Name) || p.AgeGroup.ToLower().Contains(WritingAssignmentSearchDTO.AgeGroups)).ToList();
            else if (WritingAssignmentSearchDTO.AgeGroups.Length > 0 && WritingAssignmentSearchDTO.Name.Length == 0)
                return WritingAssignments = Data.WritingAssignments.Where(p => p.AgeGroup.ToLower().Contains(WritingAssignmentSearchDTO.AgeGroups)).ToList();
            else if (WritingAssignmentSearchDTO.AgeGroups.Length == 0 && WritingAssignmentSearchDTO.Name.Length > 0)
                return WritingAssignments = Data.WritingAssignments.Where(p => p.Title.ToLower().Contains(WritingAssignmentSearchDTO.Name)).ToList();
            return new List<WritingAssignment>();
        }
    }
}
