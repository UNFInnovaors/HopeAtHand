﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models
{
    public class Poem
    {
        
        public int PoemId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string DocumentBlobURL { get; set; }
        public string ImageURL { get; set; }
        public List<PoemThemes> Themes { get; set; }
        public List<LessonPlan_Poem> Lesson_Poem { get; set; }
    }
    public class WritingAssignment
    {
        public int WritingAssignmentId { get; set; }
        public string Title { get; set; }
        public string DocumentBlobURL { get; set; }
        public string ImageURL { get; set; }
        public string AgeGroup { get; set; }
        public List<WritingThemes> Themes { get; set; }
        public List<LessonPlan_WritingAssignment> Lesson_Writing { get; set; }
    }
    public class ArtPiece
    {
        public int ArtPieceId { get; set; }
        public string Title { get; set; }
        public string DocumentBlobURL { get; set; }
        public string ImageURL { get; set; }
        public string SuppliesNeeded { get; set; }
        public List<ArtThemes> ArtThemes { get; set; }
        public List<LessonPlan_ArtPiece> Lesson_Art { get; set; }
    }
    public class LessonPlan
    {
        public int LessonPlanId { get; set; }
        public string Name { get; set;}
        public string ImageURL { get; set; }
        public List<LessonPlan_Poem> Lesson_Poems { get; set; }
        public List<LessonPlan_WritingAssignment> Lesson_Writing { get; set; }
        public List<LessonPlan_ArtPiece> Lesson_Art { get; set; }
        public List<LessonThemes> Themes { get; set; }
    }
    public class LessonPlan_WritingAssignment
    {
        public int LessonPlanId { get; set; }
        public LessonPlan LessonPLan { get; set; }

        public int WritingAssignmentId { get; set; }
        public WritingAssignment WritingAssignment { get; set; }
    }
    public class LessonPlan_Poem
    {
        public int LessonPlanId { get; set; }
        public LessonPlan LessonPLan { get; set; }

        public int PoemId { get; set; }
        public Poem Poem { get; set; }

    }
    public class LessonPlan_ArtPiece
    {
        public int LessonPlanId { get; set; }
        public LessonPlan LessonPlan { get; set; }

        public int ArtPieceId { get; set; }
        public ArtPiece ArtPiece { get; set; }



    }
    public class AzureStorageConfig
    {
        public string AccountName { get; set; }
        public string AccountKey { get; set; }
        public string ConnectionString { get; set; }
        public string QueueName { get; set; }
        public string ImageContainer { get; set; }
        public string ThumbnailContainer { get; set; }
    }
    public class Themes
    {
        [Key]
        public string ThemeName { get; set; }
    }
    public class PoemThemes
    {
        public string ThemeName { get; set; }
        public int PoemId { get; set; }
        public Poem poem { get; set; }

    }
    public class WritingThemes
    {
        public string ThemeName { get; set; }
        public int WritingAssignemntId { get; set; }
    }

    public class ArtThemes
    {
        public string ThemeName { get; set; }
        public int ArtPieceId { get; set; }
    }

    public class LessonThemes
    {
        public string ThemeName { get; set; }
        public int LessonId { get; set; }
    }
}

