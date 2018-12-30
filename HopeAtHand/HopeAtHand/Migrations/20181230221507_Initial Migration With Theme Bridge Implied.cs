using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HopeAtHand.Migrations
{
    public partial class InitialMigrationWithThemeBridgeImplied : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ArtPieces",
                columns: table => new
                {
                    ArtPieceId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(nullable: true),
                    Tag = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtPieces", x => x.ArtPieceId);
                });

            migrationBuilder.CreateTable(
                name: "Poems",
                columns: table => new
                {
                    PoemId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(nullable: true),
                    Author = table.Column<string>(nullable: true),
                    Tag = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Poems", x => x.PoemId);
                });

            migrationBuilder.CreateTable(
                name: "Themes",
                columns: table => new
                {
                    ThemeName = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Themes", x => x.ThemeName);
                });

            migrationBuilder.CreateTable(
                name: "WritingAssignments",
                columns: table => new
                {
                    WritingAssignmentId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(nullable: true),
                    Tag = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WritingAssignments", x => x.WritingAssignmentId);
                });

            migrationBuilder.CreateTable(
                name: "ArtThemes",
                columns: table => new
                {
                    ThemeName = table.Column<string>(nullable: false),
                    ArtPieceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ArtThemes", x => new { x.ThemeName, x.ArtPieceId });
                    table.ForeignKey(
                        name: "FK_ArtThemes_ArtPieces_ArtPieceId",
                        column: x => x.ArtPieceId,
                        principalTable: "ArtPieces",
                        principalColumn: "ArtPieceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PoemThemes",
                columns: table => new
                {
                    ThemeName = table.Column<string>(nullable: false),
                    PoemId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PoemThemes", x => new { x.ThemeName, x.PoemId });
                    table.ForeignKey(
                        name: "FK_PoemThemes_Poems_PoemId",
                        column: x => x.PoemId,
                        principalTable: "Poems",
                        principalColumn: "PoemId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Lessonplans",
                columns: table => new
                {
                    LessonPlanId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    PoemId = table.Column<int>(nullable: false),
                    WritingAssignmentId = table.Column<int>(nullable: false),
                    ArtPieceId = table.Column<int>(nullable: false),
                    Tag = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lessonplans", x => x.LessonPlanId);
                    table.ForeignKey(
                        name: "FK_Lessonplans_ArtPieces_ArtPieceId",
                        column: x => x.ArtPieceId,
                        principalTable: "ArtPieces",
                        principalColumn: "ArtPieceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Lessonplans_Poems_PoemId",
                        column: x => x.PoemId,
                        principalTable: "Poems",
                        principalColumn: "PoemId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Lessonplans_WritingAssignments_WritingAssignmentId",
                        column: x => x.WritingAssignmentId,
                        principalTable: "WritingAssignments",
                        principalColumn: "WritingAssignmentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WritingThemes",
                columns: table => new
                {
                    ThemeName = table.Column<string>(nullable: false),
                    WritingAssignemntId = table.Column<int>(nullable: false),
                    WritingAssignmentId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WritingThemes", x => new { x.ThemeName, x.WritingAssignemntId });
                    table.ForeignKey(
                        name: "FK_WritingThemes_WritingAssignments_WritingAssignmentId",
                        column: x => x.WritingAssignmentId,
                        principalTable: "WritingAssignments",
                        principalColumn: "WritingAssignmentId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LessonThemes",
                columns: table => new
                {
                    ThemeName = table.Column<string>(nullable: false),
                    LessonId = table.Column<int>(nullable: false),
                    LessonPlanId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonThemes", x => new { x.ThemeName, x.LessonId });
                    table.ForeignKey(
                        name: "FK_LessonThemes_Lessonplans_LessonPlanId",
                        column: x => x.LessonPlanId,
                        principalTable: "Lessonplans",
                        principalColumn: "LessonPlanId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ArtThemes_ArtPieceId",
                table: "ArtThemes",
                column: "ArtPieceId");

            migrationBuilder.CreateIndex(
                name: "IX_Lessonplans_ArtPieceId",
                table: "Lessonplans",
                column: "ArtPieceId");

            migrationBuilder.CreateIndex(
                name: "IX_Lessonplans_PoemId",
                table: "Lessonplans",
                column: "PoemId");

            migrationBuilder.CreateIndex(
                name: "IX_Lessonplans_WritingAssignmentId",
                table: "Lessonplans",
                column: "WritingAssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonThemes_LessonPlanId",
                table: "LessonThemes",
                column: "LessonPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_PoemThemes_PoemId",
                table: "PoemThemes",
                column: "PoemId");

            migrationBuilder.CreateIndex(
                name: "IX_WritingThemes_WritingAssignmentId",
                table: "WritingThemes",
                column: "WritingAssignmentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ArtThemes");

            migrationBuilder.DropTable(
                name: "LessonThemes");

            migrationBuilder.DropTable(
                name: "PoemThemes");

            migrationBuilder.DropTable(
                name: "Themes");

            migrationBuilder.DropTable(
                name: "WritingThemes");

            migrationBuilder.DropTable(
                name: "Lessonplans");

            migrationBuilder.DropTable(
                name: "ArtPieces");

            migrationBuilder.DropTable(
                name: "Poems");

            migrationBuilder.DropTable(
                name: "WritingAssignments");
        }
    }
}
