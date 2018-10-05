﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models
{
    public interface IWritingAssignmentRepository
    {
        IEnumerable<WritingAssignment> GetWritingAssigment(string writingAssignmentTagResult, string writingAssignmentThemeResult);
    }

    public class WritingAssignmentRepository : IWritingAssignmentRepository
    {
        public IEnumerable<WritingAssignment> GetWritingAssigment(string writingAssignmentTagResult, string writingAssignmentThemeResult)
        {
            IEnumerable<WritingAssignment> writingAssignments = WritingAssignmentRepo.WritingAssignments.Values.Where(W => W.Tag == writingAssignmentTagResult || W.Theme == writingAssignmentThemeResult).ToList();
            return writingAssignments;
        }
    }
}