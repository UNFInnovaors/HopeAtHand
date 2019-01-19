﻿// <auto-generated />
using System;
using HopeAtHand.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace HopeAtHand.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("HopeAtHand.Models.ArtPiece", b =>
                {
                    b.Property<int>("ArtPieceId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DocumentBlobURL");

                    b.Property<string>("ImageURL");

                    b.Property<string>("SuppliesNeeded");

                    b.Property<string>("Title");

                    b.HasKey("ArtPieceId");

                    b.ToTable("ArtPieces");
                });

            modelBuilder.Entity("HopeAtHand.Models.ArtThemes", b =>
                {
                    b.Property<string>("ThemeName");

                    b.Property<int>("ArtPieceId");

                    b.HasKey("ThemeName", "ArtPieceId");

                    b.HasIndex("ArtPieceId");

                    b.ToTable("ArtThemes");
                });

            modelBuilder.Entity("HopeAtHand.Models.LessonPlan", b =>
                {
                    b.Property<int>("LessonPlanId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ImageURL");

                    b.Property<string>("Name");

                    b.HasKey("LessonPlanId");

                    b.ToTable("Lessonplans");
                });

            modelBuilder.Entity("HopeAtHand.Models.LessonPlan_ArtPiece", b =>
                {
                    b.Property<int>("ArtPieceId");

                    b.Property<int>("LessonPlanId");

                    b.HasKey("ArtPieceId", "LessonPlanId");

                    b.HasIndex("LessonPlanId");

                    b.ToTable("LessonPlan_ArtPiece");
                });

            modelBuilder.Entity("HopeAtHand.Models.LessonPlan_Poem", b =>
                {
                    b.Property<int>("LessonPlanId");

                    b.Property<int>("PoemId");

                    b.HasKey("LessonPlanId", "PoemId");

                    b.HasIndex("PoemId");

                    b.ToTable("LessonPlan_Poem");
                });

            modelBuilder.Entity("HopeAtHand.Models.LessonPlan_WritingAssignment", b =>
                {
                    b.Property<int>("LessonPlanId");

                    b.Property<int>("WritingAssignmentId");

                    b.HasKey("LessonPlanId", "WritingAssignmentId");

                    b.HasAlternateKey("WritingAssignmentId", "LessonPlanId");

                    b.ToTable("LessonPlan_WritingAssignment");
                });

            modelBuilder.Entity("HopeAtHand.Models.LessonThemes", b =>
                {
                    b.Property<string>("ThemeName");

                    b.Property<int>("LessonId");

                    b.Property<int?>("LessonPlanId");

                    b.HasKey("ThemeName", "LessonId");

                    b.HasIndex("LessonPlanId");

                    b.ToTable("LessonThemes");
                });

            modelBuilder.Entity("HopeAtHand.Models.Poem", b =>
                {
                    b.Property<int>("PoemId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Author");

                    b.Property<string>("DocumentBlobURL");

                    b.Property<string>("ImageURL");

                    b.Property<string>("Title");

                    b.HasKey("PoemId");

                    b.ToTable("Poems");
                });

            modelBuilder.Entity("HopeAtHand.Models.PoemThemes", b =>
                {
                    b.Property<string>("ThemeName");

                    b.Property<int>("PoemId");

                    b.HasKey("ThemeName", "PoemId");

                    b.HasIndex("PoemId");

                    b.ToTable("PoemThemes");
                });

            modelBuilder.Entity("HopeAtHand.Models.Themes", b =>
                {
                    b.Property<string>("ThemeName")
                        .ValueGeneratedOnAdd();

                    b.HasKey("ThemeName");

                    b.ToTable("Themes");
                });

            modelBuilder.Entity("HopeAtHand.Models.WritingAssignment", b =>
                {
                    b.Property<int>("WritingAssignmentId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AgeGroup");

                    b.Property<string>("DocumentBlobURL");

                    b.Property<string>("ImageURL");

                    b.Property<string>("Title");

                    b.HasKey("WritingAssignmentId");

                    b.ToTable("WritingAssignments");
                });

            modelBuilder.Entity("HopeAtHand.Models.WritingThemes", b =>
                {
                    b.Property<string>("ThemeName");

                    b.Property<int>("WritingAssignemntId");

                    b.Property<int?>("WritingAssignmentId");

                    b.HasKey("ThemeName", "WritingAssignemntId");

                    b.HasIndex("WritingAssignmentId");

                    b.ToTable("WritingThemes");
                });

            modelBuilder.Entity("HopeAtHand.Models.ArtThemes", b =>
                {
                    b.HasOne("HopeAtHand.Models.ArtPiece")
                        .WithMany("ArtThemes")
                        .HasForeignKey("ArtPieceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HopeAtHand.Models.LessonPlan_ArtPiece", b =>
                {
                    b.HasOne("HopeAtHand.Models.ArtPiece", "ArtPiece")
                        .WithMany("Lesson_Art")
                        .HasForeignKey("ArtPieceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HopeAtHand.Models.LessonPlan", "LessonPlan")
                        .WithMany("Lesson_Art")
                        .HasForeignKey("LessonPlanId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HopeAtHand.Models.LessonPlan_Poem", b =>
                {
                    b.HasOne("HopeAtHand.Models.LessonPlan", "LessonPLan")
                        .WithMany("Lesson_Poems")
                        .HasForeignKey("LessonPlanId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HopeAtHand.Models.Poem", "Poem")
                        .WithMany("Lesson_Poem")
                        .HasForeignKey("PoemId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HopeAtHand.Models.LessonPlan_WritingAssignment", b =>
                {
                    b.HasOne("HopeAtHand.Models.LessonPlan", "LessonPLan")
                        .WithMany("Lesson_Writing")
                        .HasForeignKey("LessonPlanId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HopeAtHand.Models.WritingAssignment", "WritingAssignment")
                        .WithMany("Lesson_Writing")
                        .HasForeignKey("WritingAssignmentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HopeAtHand.Models.LessonThemes", b =>
                {
                    b.HasOne("HopeAtHand.Models.LessonPlan")
                        .WithMany("Themes")
                        .HasForeignKey("LessonPlanId");
                });

            modelBuilder.Entity("HopeAtHand.Models.PoemThemes", b =>
                {
                    b.HasOne("HopeAtHand.Models.Poem")
                        .WithMany("Themes")
                        .HasForeignKey("PoemId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HopeAtHand.Models.WritingThemes", b =>
                {
                    b.HasOne("HopeAtHand.Models.WritingAssignment")
                        .WithMany("Themes")
                        .HasForeignKey("WritingAssignmentId");
                });
#pragma warning restore 612, 618
        }
    }
}
