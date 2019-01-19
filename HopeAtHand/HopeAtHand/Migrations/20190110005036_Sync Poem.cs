using Microsoft.EntityFrameworkCore.Migrations;

namespace HopeAtHand.Migrations
{
    public partial class SyncPoem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Tag",
                table: "WritingAssignments",
                newName: "ImageURL");

            migrationBuilder.RenameColumn(
                name: "Tag",
                table: "Poems",
                newName: "ImageURL");

            migrationBuilder.RenameColumn(
                name: "Tag",
                table: "Lessonplans",
                newName: "ImageURL");

            migrationBuilder.RenameColumn(
                name: "Tag",
                table: "ArtPieces",
                newName: "ImageURL");

            migrationBuilder.AddColumn<string>(
                name: "DocumentBlobURL",
                table: "WritingAssignments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DocumentBlobURL",
                table: "Poems",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DocumentBlobURL",
                table: "ArtPieces",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DocumentBlobURL",
                table: "WritingAssignments");

            migrationBuilder.DropColumn(
                name: "DocumentBlobURL",
                table: "Poems");

            migrationBuilder.DropColumn(
                name: "DocumentBlobURL",
                table: "ArtPieces");

            migrationBuilder.RenameColumn(
                name: "ImageURL",
                table: "WritingAssignments",
                newName: "Tag");

            migrationBuilder.RenameColumn(
                name: "ImageURL",
                table: "Poems",
                newName: "Tag");

            migrationBuilder.RenameColumn(
                name: "ImageURL",
                table: "Lessonplans",
                newName: "Tag");

            migrationBuilder.RenameColumn(
                name: "ImageURL",
                table: "ArtPieces",
                newName: "Tag");
        }
    }
}
