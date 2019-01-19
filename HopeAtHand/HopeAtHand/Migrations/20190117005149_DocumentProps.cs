using Microsoft.EntityFrameworkCore.Migrations;

namespace HopeAtHand.Migrations
{
    public partial class DocumentProps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AgeGroup",
                table: "WritingAssignments",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SuppliesNeeded",
                table: "ArtPieces",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AgeGroup",
                table: "WritingAssignments");

            migrationBuilder.DropColumn(
                name: "SuppliesNeeded",
                table: "ArtPieces");
        }
    }
}
