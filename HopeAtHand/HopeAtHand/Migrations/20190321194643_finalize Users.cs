using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HopeAtHand.Migrations
{
    public partial class finalizeUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Facilitators",
                newName: "Email");

            migrationBuilder.AddColumn<byte[]>(
                name: "Password",
                table: "Facilitators",
                nullable: true);

            migrationBuilder.AddColumn<byte[]>(
                name: "PasswordSalt",
                table: "Facilitators",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UserSince",
                table: "Facilitators",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Password",
                table: "Facilitators");

            migrationBuilder.DropColumn(
                name: "PasswordSalt",
                table: "Facilitators");

            migrationBuilder.DropColumn(
                name: "UserSince",
                table: "Facilitators");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Facilitators",
                newName: "Username");
        }
    }
}
