using Microsoft.EntityFrameworkCore.Migrations;

namespace HopeAtHand.Migrations
{
    public partial class WillThisChangeAnything : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlan_ArtPiece_ArtPieces_ArtPieceId",
                table: "LessonPlan_ArtPiece");

            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlan_ArtPiece_Lessonplans_LessonPlanId",
                table: "LessonPlan_ArtPiece");

            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlan_Poem_Lessonplans_LessonPlanId",
                table: "LessonPlan_Poem");

            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlan_Poem_Poems_PoemId",
                table: "LessonPlan_Poem");

            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlan_WritingAssignment_Lessonplans_LessonPlanId",
                table: "LessonPlan_WritingAssignment");

            migrationBuilder.DropForeignKey(
                name: "FK_LessonPlan_WritingAssignment_WritingAssignments_WritingAssignmentId",
                table: "LessonPlan_WritingAssignment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LessonPlan_WritingAssignment",
                table: "LessonPlan_WritingAssignment");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_LessonPlan_WritingAssignment_WritingAssignmentId_LessonPlanId",
                table: "LessonPlan_WritingAssignment");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LessonPlan_Poem",
                table: "LessonPlan_Poem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LessonPlan_ArtPiece",
                table: "LessonPlan_ArtPiece");

            migrationBuilder.RenameTable(
                name: "LessonPlan_WritingAssignment",
                newName: "lessonPlan_WritingAssignments");

            migrationBuilder.RenameTable(
                name: "LessonPlan_Poem",
                newName: "lessonPlan_Poems");

            migrationBuilder.RenameTable(
                name: "LessonPlan_ArtPiece",
                newName: "lessonPlan_ArtPieces");

            migrationBuilder.RenameIndex(
                name: "IX_LessonPlan_Poem_PoemId",
                table: "lessonPlan_Poems",
                newName: "IX_lessonPlan_Poems_PoemId");

            migrationBuilder.RenameIndex(
                name: "IX_LessonPlan_ArtPiece_LessonPlanId",
                table: "lessonPlan_ArtPieces",
                newName: "IX_lessonPlan_ArtPieces_LessonPlanId");

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

            migrationBuilder.AddPrimaryKey(
                name: "PK_lessonPlan_WritingAssignments",
                table: "lessonPlan_WritingAssignments",
                columns: new[] { "LessonPlanId", "WritingAssignmentId" });

            migrationBuilder.AddUniqueConstraint(
                name: "AK_lessonPlan_WritingAssignments_WritingAssignmentId_LessonPlanId",
                table: "lessonPlan_WritingAssignments",
                columns: new[] { "WritingAssignmentId", "LessonPlanId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_lessonPlan_Poems",
                table: "lessonPlan_Poems",
                columns: new[] { "LessonPlanId", "PoemId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_lessonPlan_ArtPieces",
                table: "lessonPlan_ArtPieces",
                columns: new[] { "ArtPieceId", "LessonPlanId" });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArtPieces_Lessonplans_LessonPlanId",
                table: "ArtPieces");

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

            migrationBuilder.DropPrimaryKey(
                name: "PK_lessonPlan_WritingAssignments",
                table: "lessonPlan_WritingAssignments");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_lessonPlan_WritingAssignments_WritingAssignmentId_LessonPlanId",
                table: "lessonPlan_WritingAssignments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_lessonPlan_Poems",
                table: "lessonPlan_Poems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_lessonPlan_ArtPieces",
                table: "lessonPlan_ArtPieces");

            migrationBuilder.DropColumn(
                name: "LessonPlanId",
                table: "WritingAssignments");

            migrationBuilder.DropColumn(
                name: "LessonPlanId",
                table: "Poems");

            migrationBuilder.DropColumn(
                name: "LessonPlanId",
                table: "ArtPieces");

            migrationBuilder.RenameTable(
                name: "lessonPlan_WritingAssignments",
                newName: "LessonPlan_WritingAssignment");

            migrationBuilder.RenameTable(
                name: "lessonPlan_Poems",
                newName: "LessonPlan_Poem");

            migrationBuilder.RenameTable(
                name: "lessonPlan_ArtPieces",
                newName: "LessonPlan_ArtPiece");

            migrationBuilder.RenameIndex(
                name: "IX_lessonPlan_Poems_PoemId",
                table: "LessonPlan_Poem",
                newName: "IX_LessonPlan_Poem_PoemId");

            migrationBuilder.RenameIndex(
                name: "IX_lessonPlan_ArtPieces_LessonPlanId",
                table: "LessonPlan_ArtPiece",
                newName: "IX_LessonPlan_ArtPiece_LessonPlanId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_LessonPlan_WritingAssignment",
                table: "LessonPlan_WritingAssignment",
                columns: new[] { "LessonPlanId", "WritingAssignmentId" });

            migrationBuilder.AddUniqueConstraint(
                name: "AK_LessonPlan_WritingAssignment_WritingAssignmentId_LessonPlanId",
                table: "LessonPlan_WritingAssignment",
                columns: new[] { "WritingAssignmentId", "LessonPlanId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_LessonPlan_Poem",
                table: "LessonPlan_Poem",
                columns: new[] { "LessonPlanId", "PoemId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_LessonPlan_ArtPiece",
                table: "LessonPlan_ArtPiece",
                columns: new[] { "ArtPieceId", "LessonPlanId" });

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlan_ArtPiece_ArtPieces_ArtPieceId",
                table: "LessonPlan_ArtPiece",
                column: "ArtPieceId",
                principalTable: "ArtPieces",
                principalColumn: "ArtPieceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlan_ArtPiece_Lessonplans_LessonPlanId",
                table: "LessonPlan_ArtPiece",
                column: "LessonPlanId",
                principalTable: "Lessonplans",
                principalColumn: "LessonPlanId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlan_Poem_Lessonplans_LessonPlanId",
                table: "LessonPlan_Poem",
                column: "LessonPlanId",
                principalTable: "Lessonplans",
                principalColumn: "LessonPlanId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlan_Poem_Poems_PoemId",
                table: "LessonPlan_Poem",
                column: "PoemId",
                principalTable: "Poems",
                principalColumn: "PoemId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlan_WritingAssignment_Lessonplans_LessonPlanId",
                table: "LessonPlan_WritingAssignment",
                column: "LessonPlanId",
                principalTable: "Lessonplans",
                principalColumn: "LessonPlanId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LessonPlan_WritingAssignment_WritingAssignments_WritingAssignmentId",
                table: "LessonPlan_WritingAssignment",
                column: "WritingAssignmentId",
                principalTable: "WritingAssignments",
                principalColumn: "WritingAssignmentId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
