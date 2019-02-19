using Microsoft.EntityFrameworkCore.Migrations;

namespace HopeAtHand.Migrations
{
    public partial class Tryingtoremovenullexception : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtPieces_Lessonplans_LessonPlanId",
                table: "ArtPieces");

            migrationBuilder.DropForeignKey(
                name: "FK_Poems_Lessonplans_LessonPlanId",
                table: "Poems");

            migrationBuilder.DropForeignKey(
                name: "FK_WritingAssignments_Lessonplans_LessonPlanId",
                table: "WritingAssignments");

            migrationBuilder.DropIndex(
                name: "IX_WritingAssignments_LessonPlanId",
                table: "WritingAssignments");

            migrationBuilder.DropIndex(
                name: "IX_Poems_LessonPlanId",
                table: "Poems");

            migrationBuilder.DropIndex(
                name: "IX_ArtPieces_LessonPlanId",
                table: "ArtPieces");

            migrationBuilder.DropColumn(
                name: "LessonPlanId",
                table: "WritingAssignments");

            migrationBuilder.DropColumn(
                name: "LessonPlanId",
                table: "Poems");

            migrationBuilder.DropColumn(
                name: "LessonPlanId",
                table: "ArtPieces");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LessonPlanId",
                table: "WritingAssignments",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LessonPlanId",
                table: "Poems",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LessonPlanId",
                table: "ArtPieces",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WritingAssignments_LessonPlanId",
                table: "WritingAssignments",
                column: "LessonPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Poems_LessonPlanId",
                table: "Poems",
                column: "LessonPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtPieces_LessonPlanId",
                table: "ArtPieces",
                column: "LessonPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArtPieces_Lessonplans_LessonPlanId",
                table: "ArtPieces",
                column: "LessonPlanId",
                principalTable: "Lessonplans",
                principalColumn: "LessonPlanId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Poems_Lessonplans_LessonPlanId",
                table: "Poems",
                column: "LessonPlanId",
                principalTable: "Lessonplans",
                principalColumn: "LessonPlanId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WritingAssignments_Lessonplans_LessonPlanId",
                table: "WritingAssignments",
                column: "LessonPlanId",
                principalTable: "Lessonplans",
                principalColumn: "LessonPlanId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
