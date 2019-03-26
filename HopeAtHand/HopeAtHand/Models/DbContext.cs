using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HopeAtHand.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<ArtPiece>().Property(b => b.ArtPieceId);
           
            modelBuilder.Entity<LessonPlan_ArtPiece>().HasKey(at => new { at.ArtPieceId, at.LessonPlanId });
            //modelBuilder.Entity<LessonPlan_ArtPiece>().HasOne( o =>o.ArtPiece).WithMany( o => o.Lesson_Art).HasForeignKey( o => o.ArtPieceId);
            //modelBuilder.Entity<LessonPlan_ArtPiece>().HasOne(o => o.LessonPlan).WithMany(o => o.Lesson_Art).HasForeignKey(o => o.LessonPlanId);

            modelBuilder.Entity<Favorite>().HasKey(at => new { at.DocumentID, at.FacilitatorID });

            modelBuilder.Entity<Poem>().Property(p => p.PoemId).ValueGeneratedOnAdd();

            modelBuilder.Entity<LessonPlan_Poem>().HasKey(at => new { at.LessonPlanId, at.PoemId });
            //modelBuilder.Entity<LessonPlan_Poem>().HasOne(o => o.LessonPLan).WithMany(o => o.Lesson_Poems).HasForeignKey(o => o.LessonPlanId);
            //modelBuilder.Entity<LessonPlan_Poem>().HasOne(o => o.Poem).WithMany(o => o.Lesson_Poem).HasForeignKey(o => o.PoemId);
            
            modelBuilder.Entity<LessonPlan_WritingAssignment>().HasKey(at => new { at.WritingAssignmentId, at.LessonPlanId });
            //modelBuilder.Entity<LessonPlan_WritingAssignment>().HasOne(o => o.LessonPLan).WithMany(o => o.Lesson_Writing).HasForeignKey(o => o.LessonPlanId);
            //modelBuilder.Entity<LessonPlan_WritingAssignment>().HasOne(o => o.WritingAssignment).WithMany(o => o.Lesson_Writing).HasForeignKey(o => o.WritingAssignmentId);

            modelBuilder.Entity<ArtThemes>().HasKey(at => new { at.ThemeName, at.ArtPieceId });
            modelBuilder.Entity<PoemThemes>().HasKey(at => new { at.ThemeName, at.PoemId });
            modelBuilder.Entity<LessonThemes>().HasKey(at => new { at.ThemeName, at.LessonId });
            modelBuilder.Entity<WritingThemes>().HasKey(at => new { at.ThemeName, at.WritingAssignemntId });
/*
            modelBuilder.Entity<LessonPlan_Poem>().HasKey(at => new
            {
                at.LessonPlanId
            }
            modelBuilder.Entity<PoemThemes>().HasKey(at => new
            {
                at.ThemeName
            });
            modelBuilder.Entity<LessonPlan_ArtPiece>().HasKey(at => new
            {
                at.ArtPieceId
            });*/
            modelBuilder.Entity<LessonPlan_WritingAssignment>().HasKey(at => new { at.LessonPlanId, at.WritingAssignmentId });

        }

        public DbSet<WritingTemplate> WritingTemplates { get; set; }

        public DbSet<LessonPlan> Lessonplans { get; set; }

        public DbSet<Themes> Themes {get;set;}

        public DbSet<ArtThemes> ArtThemes { get; set; }

        public DbSet<WritingThemes> WritingThemes { get; set; }

        public DbSet<LessonThemes> LessonThemes { get; set; }

        public DbSet<PoemThemes> PoemThemes { get; set; }

        public DbSet<Poem> Poems {get;set;}

        public DbSet<WritingAssignment> WritingAssignments{get;set;}

        public DbSet<ArtPiece> ArtPieces {get;set;}

        public DbSet<Facilitator> Facilitators {get;set;}

        public DbSet<Favorite> Favorites { get; set; }

        public DbSet<LessonPlan_Poem> lessonPlan_Poems { get; set; }

        public DbSet<LessonPlan_ArtPiece> lessonPlan_ArtPieces { get; set; }

        public DbSet<LessonPlan_WritingAssignment> lessonPlan_WritingAssignments { get; set; }

        public DbSet<LessonThemes> lesson_Themes { get; set; }

    }
}
