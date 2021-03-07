using Microsoft.EntityFrameworkCore.Migrations;

namespace Project_HONEY.Migrations
{
    public partial class renameprop : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Titel",
                table: "tblCourses",
                newName: "Title");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Title",
                table: "tblCourses",
                newName: "Titel");
        }
    }
}
