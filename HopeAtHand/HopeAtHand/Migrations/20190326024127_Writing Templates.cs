using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HopeAtHand.Migrations
{
    public partial class WritingTemplates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AgeGroup",
                table: "WritingAssignments");

            migrationBuilder.AddColumn<int>(
                name: "TemplateId",
                table: "WritingAssignments",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "WritingTemplates",
                columns: table => new
                {
                    WritingTemplateId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WritingTemplates", x => x.WritingTemplateId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WritingTemplates");

            migrationBuilder.DropColumn(
                name: "TemplateId",
                table: "WritingAssignments");

            migrationBuilder.AddColumn<string>(
                name: "AgeGroup",
                table: "WritingAssignments",
                nullable: true);
        }
    }
}
