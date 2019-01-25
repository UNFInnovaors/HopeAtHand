using Microsoft.EntityFrameworkCore.Migrations;

namespace HopeAtHand.Migrations
{
    public partial class FavoritesActuallyBeingAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Favorites",
                columns: table => new
                {
                    FacilitatorID = table.Column<int>(nullable: false),
                    DocumentID = table.Column<int>(nullable: false),
                    DocumentType = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorites", x => new { x.DocumentID, x.FacilitatorID });
                    table.ForeignKey(
                        name: "FK_Favorites_Facilitators_FacilitatorID",
                        column: x => x.FacilitatorID,
                        principalTable: "Facilitators",
                        principalColumn: "FacilitatorID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_FacilitatorID",
                table: "Favorites",
                column: "FacilitatorID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Favorites");
        }
    }
}
