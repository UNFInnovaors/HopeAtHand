using Microsoft.EntityFrameworkCore.Migrations;

namespace HopeAtHand.Migrations
{
    public partial class ImprovedModelForLessonPlan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonThemes_Lessonplans_LessonPlanId",
                table: "LessonThemes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LessonThemes",
                table: "LessonThemes");

            migrationBuilder.AlterColumn<int>(
                name: "LessonPlanId",
                table: "LessonThemes",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "LessonId",
                table: "LessonThemes",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "CompleteLessonPlanURL",
                table: "Lessonplans",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OutlineURl",
                table: "Lessonplans",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_LessonThemes",
                table: "LessonThemes",
                columns: new[] { "ThemeName", "LessonId" });

            migrationBuilder.AddForeignKey(
                name: "FK_LessonThemes_Lessonplans_LessonPlanId",
                table: "LessonThemes",
                column: "LessonPlanId",
                principalTable: "Lessonplans",
                principalColumn: "LessonPlanId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LessonThemes_Lessonplans_LessonPlanId",
                table: "LessonThemes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LessonThemes",
                table: "LessonThemes");

            migrationBuilder.DropColumn(
                name: "LessonId",
                table: "LessonThemes");

            migrationBuilder.DropColumn(
                name: "CompleteLessonPlanURL",
                table: "Lessonplans");

            migrationBuilder.DropColumn(
                name: "OutlineURl",
                table: "Lessonplans");

            migrationBuilder.AlterColumn<int>(
                name: "LessonPlanId",
                table: "LessonThemes",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_LessonThemes",
                table: "LessonThemes",
                columns: new[] { "ThemeName", "LessonPlanId" });

            migrationBuilder.AddForeignKey(
                name: "FK_LessonThemes_Lessonplans_LessonPlanId",
                table: "LessonThemes",
                column: "LessonPlanId",
                principalTable: "Lessonplans",
                principalColumn: "LessonPlanId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
