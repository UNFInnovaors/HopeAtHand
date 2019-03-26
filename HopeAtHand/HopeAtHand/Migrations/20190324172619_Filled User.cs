using Microsoft.EntityFrameworkCore.Migrations;

namespace HopeAtHand.Migrations
{
    public partial class FilledUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Facilitators",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Org",
                table: "Facilitators",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Facilitators",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Facilitators");

            migrationBuilder.DropColumn(
                name: "Org",
                table: "Facilitators");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Facilitators");
        }
    }
}
