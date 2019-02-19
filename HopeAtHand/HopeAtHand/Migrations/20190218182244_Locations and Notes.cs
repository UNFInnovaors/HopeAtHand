using Microsoft.EntityFrameworkCore.Migrations;

namespace HopeAtHand.Migrations
{
    public partial class LocationsandNotes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Locations",
                table: "Lessonplans",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "Lessonplans",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Locations",
                table: "Lessonplans");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Lessonplans");
        }
    }
}
