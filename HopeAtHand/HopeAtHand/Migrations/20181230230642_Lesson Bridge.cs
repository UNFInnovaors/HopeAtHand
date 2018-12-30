using Microsoft.EntityFrameworkCore.Migrations;

namespace HopeAtHand.Migrations
{
    public partial class LessonBridge : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lessonplans_ArtPieces_ArtPieceId",
                table: "Lessonplans");

            migrationBuilder.DropForeignKey(
                name: "FK_Lessonplans_Poems_PoemId",
                table: "Lessonplans");

            migrationBuilder.DropForeignKey(
                name: "FK_Lessonplans_WritingAssignments_WritingAssignmentId",
                table: "Lessonplans");

            migrationBuilder.DropIndex(
                name: "IX_Lessonplans_ArtPieceId",
                table: "Lessonplans");

            migrationBuilder.DropIndex(
                name: "IX_Lessonplans_PoemId",
                table: "Lessonplans");

            migrationBuilder.DropIndex(
                name: "IX_Lessonplans_WritingAssignmentId",
                table: "Lessonplans");

            migrationBuilder.DropColumn(
                name: "ArtPieceId",
                table: "Lessonplans");

            migrationBuilder.DropColumn(
                name: "PoemId",
                table: "Lessonplans");

            migrationBuilder.DropColumn(
                name: "WritingAssignmentId",
                table: "Lessonplans");

            migrationBuilder.CreateTable(
                name: "LessonPlan_ArtPiece",
                columns: table => new
                {
                    LessonPlanId = table.Column<int>(nullable: false),
                    ArtPieceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonPlan_ArtPiece", x => new { x.ArtPieceId, x.LessonPlanId });
                    table.ForeignKey(
                        name: "FK_LessonPlan_ArtPiece_ArtPieces_ArtPieceId",
                        column: x => x.ArtPieceId,
                        principalTable: "ArtPieces",
                        principalColumn: "ArtPieceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LessonPlan_ArtPiece_Lessonplans_LessonPlanId",
                        column: x => x.LessonPlanId,
                        principalTable: "Lessonplans",
                        principalColumn: "LessonPlanId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LessonPlan_Poem",
                columns: table => new
                {
                    LessonPlanId = table.Column<int>(nullable: false),
                    PoemId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonPlan_Poem", x => new { x.LessonPlanId, x.PoemId });
                    table.ForeignKey(
                        name: "FK_LessonPlan_Poem_Lessonplans_LessonPlanId",
                        column: x => x.LessonPlanId,
                        principalTable: "Lessonplans",
                        principalColumn: "LessonPlanId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LessonPlan_Poem_Poems_PoemId",
                        column: x => x.PoemId,
                        principalTable: "Poems",
                        principalColumn: "PoemId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LessonPlan_WritingAssignment",
                columns: table => new
                {
                    LessonPlanId = table.Column<int>(nullable: false),
                    WritingAssignmentId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonPlan_WritingAssignment", x => new { x.LessonPlanId, x.WritingAssignmentId });
                    table.UniqueConstraint("AK_LessonPlan_WritingAssignment_WritingAssignmentId_LessonPlanId", x => new { x.WritingAssignmentId, x.LessonPlanId });
                    table.ForeignKey(
                        name: "FK_LessonPlan_WritingAssignment_Lessonplans_LessonPlanId",
                        column: x => x.LessonPlanId,
                        principalTable: "Lessonplans",
                        principalColumn: "LessonPlanId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_LessonPlan_WritingAssignment_WritingAssignments_WritingAssignmentId",
                        column: x => x.WritingAssignmentId,
                        principalTable: "WritingAssignments",
                        principalColumn: "WritingAssignmentId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LessonPlan_ArtPiece_LessonPlanId",
                table: "LessonPlan_ArtPiece",
                column: "LessonPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonPlan_Poem_PoemId",
                table: "LessonPlan_Poem",
                column: "PoemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LessonPlan_ArtPiece");

            migrationBuilder.DropTable(
                name: "LessonPlan_Poem");

            migrationBuilder.DropTable(
                name: "LessonPlan_WritingAssignment");

            migrationBuilder.AddColumn<int>(
                name: "ArtPieceId",
                table: "Lessonplans",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PoemId",
                table: "Lessonplans",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WritingAssignmentId",
                table: "Lessonplans",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.AddForeignKey(
                name: "FK_Lessonplans_ArtPieces_ArtPieceId",
                table: "Lessonplans",
                column: "ArtPieceId",
                principalTable: "ArtPieces",
                principalColumn: "ArtPieceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lessonplans_Poems_PoemId",
                table: "Lessonplans",
                column: "PoemId",
                principalTable: "Poems",
                principalColumn: "PoemId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lessonplans_WritingAssignments_WritingAssignmentId",
                table: "Lessonplans",
                column: "WritingAssignmentId",
                principalTable: "WritingAssignments",
                principalColumn: "WritingAssignmentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
