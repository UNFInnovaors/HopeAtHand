﻿// <auto-generated />
using System;
using HopeAtHand.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace HopeAtHand.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20190324172619_Filled User")]
    partial class FilledUser
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

                    b.ToTable("ArtThemes");
                });

            modelBuilder.Entity("HopeAtHand.Models.Facilitator", b =>
                {
                    b.Property<int>("FacilitatorID")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.Property<string>("Org");

                    b.Property<byte[]>("Password");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("Phone");

                    b.Property<string>("Role");

                    b.Property<DateTime>("UserSince");

                    b.HasKey("FacilitatorID");

                    b.ToTable("Facilitators");
                });

            modelBuilder.Entity("HopeAtHand.Models.Favorite", b =>
                {
                    b.Property<int>("DocumentID");

                    b.Property<int>("FacilitatorID");

                    b.Property<string>("DocumentType");

                    b.HasKey("DocumentID", "FacilitatorID");

                    b.HasIndex("FacilitatorID");

                    b.ToTable("Favorites");
                });

            modelBuilder.Entity("HopeAtHand.Models.LessonPlan", b =>
                {
                    b.Property<int>("LessonPlanId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CompleteLessonPlanURL");

                    b.Property<string>("ImageURL");

                    b.Property<string>("Locations");

                    b.Property<string>("Notes");

                    b.Property<string>("OutlineURl");

                    b.Property<string>("Title");

                    b.HasKey("LessonPlanId");

                    b.ToTable("Lessonplans");
                });

            modelBuilder.Entity("HopeAtHand.Models.LessonPlan_ArtPiece", b =>
                {
                    b.Property<int>("ArtPieceId");

                    b.Property<int>("LessonPlanId");

                    b.HasKey("ArtPieceId", "LessonPlanId");

                    b.ToTable("lessonPlan_ArtPieces");
                });

            modelBuilder.Entity("HopeAtHand.Models.LessonPlan_Poem", b =>
                {
                    b.Property<int>("LessonPlanId");

                    b.Property<int>("PoemId");

                    b.HasKey("LessonPlanId", "PoemId");

                    b.ToTable("lessonPlan_Poems");
                });

            modelBuilder.Entity("HopeAtHand.Models.LessonPlan_WritingAssignment", b =>
                {
                    b.Property<int>("LessonPlanId");

                    b.Property<int>("WritingAssignmentId");

                    b.HasKey("LessonPlanId", "WritingAssignmentId");

                    b.HasAlternateKey("WritingAssignmentId", "LessonPlanId");

                    b.ToTable("lessonPlan_WritingAssignments");
                });

            modelBuilder.Entity("HopeAtHand.Models.LessonThemes", b =>
                {
                    b.Property<string>("ThemeName");

                    b.Property<int>("LessonId");

                    b.HasKey("ThemeName", "LessonId");

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

                    b.HasKey("ThemeName", "WritingAssignemntId");

                    b.ToTable("WritingThemes");
                });

            modelBuilder.Entity("HopeAtHand.Models.Favorite", b =>
                {
                    b.HasOne("HopeAtHand.Models.Facilitator", "Facilitator")
                        .WithMany()
                        .HasForeignKey("FacilitatorID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
