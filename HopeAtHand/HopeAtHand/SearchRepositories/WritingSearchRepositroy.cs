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
        List<WritingAssignment> SearchForWritingAssignmentsWithThemes(WritingAssignmentSearchDTO writingAssignmentSearch);
    }

    public class WritingAssignmentSearchDTO
    {
        public string Name { get; set; } = "";
        public int TemplateID { get; set; } = -1;
        public string[] Themes { get; set; }
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

            if (WritingAssignmentSearchDTO.Name.Length > 0 && WritingAssignmentSearchDTO.TemplateID > -1)
                return WritingAssignments = Data.WritingAssignments.Where(p => p.Title.ToLower().Contains(WritingAssignmentSearchDTO.Name) || p.TemplateId == WritingAssignmentSearchDTO.TemplateID).ToList();
            else if (WritingAssignmentSearchDTO.TemplateID > -1 && WritingAssignmentSearchDTO.Name.Length == 0)
                return WritingAssignments = Data.WritingAssignments.Where(p => p.TemplateId == WritingAssignmentSearchDTO.TemplateID).ToList();
            else if (WritingAssignmentSearchDTO.TemplateID < 0 && WritingAssignmentSearchDTO.Name.Length > 0)
                return WritingAssignments = Data.WritingAssignments.Where(p => p.Title.ToLower().Contains(WritingAssignmentSearchDTO.Name)).ToList();
            return new List<WritingAssignment>();
        }

        public List<WritingAssignment> SearchForWritingAssignmentsWithThemes(WritingAssignmentSearchDTO writingAssignmentSearch)
        {
            List<WritingAssignment> writingAssignments = new List<WritingAssignment>();
            Dictionary<int, string> foundId = new Dictionary<int, string>();

            foreach (var lesson in Data.WritingThemes)
            {
                foreach (string theme in writingAssignmentSearch.Themes)
                {
                    if (theme == lesson.ThemeName)
                    {
                        if (foundId.GetValueOrDefault(lesson.WritingAssignemntId) is null)
                        {
                            writingAssignments.Add(Data.WritingAssignments.Find(lesson.WritingAssignemntId));
                            foundId.Add(lesson.WritingAssignemntId, "");
                        }
                        break;
                    }
                }
            }
            if(writingAssignmentSearch.Name != "")
            {
                foreach (var lesson in Data.WritingAssignments)
                {
                    if (foundId.GetValueOrDefault(lesson.WritingAssignmentId) is null && lesson.Title == writingAssignmentSearch.Name)
                    {
                        writingAssignments.Add(lesson);
                        foundId.Add(lesson.WritingAssignmentId, "");
                    }

                }
            }
            List<WritingAssignment> finalized = writingAssignments.Where(l => l != null).ToList();
            return writingAssignments;
        }
    }
}
