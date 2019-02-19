using Microsoft.EntityFrameworkCore.Migrations;

namespace HopeAtHand.Migrations
{
    public partial class FixingNavigationProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtThemes_ArtPieces_ArtPieceId",
                table: "ArtThemes");

            migrationBuilder.DropForeignKey(
                name: "FK_lessonPlan_ArtPieces_ArtPieces_ArtPieceId",
                table: "lessonPlan_ArtPieces");

            migrationBuilder.DropForeignKey(
                name: "FK_lessonPlan_ArtPieces_Lessonplans_LessonPlanId",
                table: "lessonPlan_ArtPieces");

            migrationBuilder.DropForeignKey(
                name: "FK_lessonPlan_Poems_Lessonplans_LessonPlanId",
                table: "lessonPlan_Poems");

            migrationBuilder.DropForeignKey(
                name: "FK_lessonPlan_Poems_Poems_PoemId",
                table: "lessonPlan_Poems");

            migrationBuilder.DropForeignKey(
                name: "FK_lessonPlan_WritingAssignments_Lessonplans_LessonPlanId",
                table: "lessonPlan_WritingAssignments");

            migrationBuilder.DropForeignKey(
                name: "FK_lessonPlan_WritingAssignments_WritingAssignments_WritingAssignmentId",
                table: "lessonPlan_WritingAssignments");

            migrationBuilder.DropForeignKey(
                name: "FK_LessonThemes_Lessonplans_LessonPlanId",
                table: "LessonThemes");

            migrationBuilder.DropForeignKey(
                name: "FK_PoemThemes_Poems_PoemId",
                table: "PoemThemes");

            migrationBuilder.DropForeignKey(
                name: "FK_WritingThemes_WritingAssignments_WritingAssignmentId",
                table: "WritingThemes");

            migrationBuilder.DropIndex(
                name: "IX_WritingThemes_WritingAssignmentId",
                table: "WritingThemes");

            migrationBuilder.DropIndex(
                name: "IX_PoemThemes_PoemId",
                table: "PoemThemes");

            migrationBuilder.DropIndex(
                name: "IX_LessonThemes_LessonPlanId",
                table: "LessonThemes");

            migrationBuilder.DropIndex(
                name: "IX_lessonPlan_Poems_PoemId",
                table: "lessonPlan_Poems");

            migrationBuilder.DropIndex(
                name: "IX_lessonPlan_ArtPieces_LessonPlanId",
                table: "lessonPlan_ArtPieces");

            migrationBuilder.DropIndex(
                name: "IX_ArtThemes_ArtPieceId",
                table: "ArtThemes");

            migrationBuilder.DropColumn(
                name: "WritingAssignmentId",
                table: "WritingThemes");

            migrationBuilder.DropColumn(
                name: "LessonPlanId",
                table: "LessonThemes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "WritingAssignmentId",
                table: "WritingThemes",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LessonPlanId",
                table: "LessonThemes",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WritingThemes_WritingAssignmentId",
                table: "WritingThemes",
                column: "WritingAssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_PoemThemes_PoemId",
                table: "PoemThemes",
                column: "PoemId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonThemes_LessonPlanId",
                table: "LessonThemes",
                column: "LessonPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_lessonPlan_Poems_PoemId",
                table: "lessonPlan_Poems",
                column: "PoemId");

            migrationBuilder.CreateIndex(
                name: "IX_lessonPlan_ArtPieces_LessonPlanId",
                table: "lessonPlan_ArtPieces",
                column: "LessonPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_ArtThemes_ArtPieceId",
                table: "ArtThemes",
                column: "ArtPieceId");

            migrationBuilder.AddForeignKey(
                name: "FK_ArtThemes_ArtPieces_ArtPieceId",
                table: "ArtThemes",
                column: "ArtPieceId",
                principalTable: "ArtPieces",
                principalColumn: "ArtPieceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_lessonPlan_ArtPieces_ArtPieces_ArtPieceId",
                table: "lessonPlan_ArtPieces",
                column: "ArtPieceId",
                principalTable: "ArtPieces",
                principalColumn: "ArtPieceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_lessonPlan_ArtPieces_Lessonplans_LessonPlanId",
                table: "lessonPlan_ArtPieces",
                column: "LessonPlanId",
                principalTable: "Lessonplans",
                principalColumn: "LessonPlanId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_lessonPlan_Poems_Lessonplans_LessonPlanId",
                table: "lessonPlan_Poems",
                column: "LessonPlanId",
                principalTable: "Lessonplans",
                principalColumn: "LessonPlanId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_lessonPlan_Poems_Poems_PoemId",
                table: "lessonPlan_Poems",
                column: "PoemId",
                principalTable: "Poems",
                principalColumn: "PoemId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_lessonPlan_WritingAssignments_Lessonplans_LessonPlanId",
                table: "lessonPlan_WritingAssignments",
                column: "LessonPlanId",
                principalTable: "Lessonplans",
                principalColumn: "LessonPlanId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_lessonPlan_WritingAssignments_WritingAssignments_WritingAssignmentId",
                table: "lessonPlan_WritingAssignments",
                column: "WritingAssignmentId",
                principalTable: "WritingAssignments",
                principalColumn: "WritingAssignmentId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonThemes_Lessonplans_LessonPlanId",
                table: "LessonThemes",
                column: "LessonPlanId",
                principalTable: "Lessonplans",
                principalColumn: "LessonPlanId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PoemThemes_Poems_PoemId",
                table: "PoemThemes",
                column: "PoemId",
                principalTable: "Poems",
                principalColumn: "PoemId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WritingThemes_WritingAssignments_WritingAssignmentId",
                table: "WritingThemes",
                column: "WritingAssignmentId",
                principalTable: "WritingAssignments",
                principalColumn: "WritingAssignmentId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
