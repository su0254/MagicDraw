using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Childrens_drawing.Data.Migrations
{
    /// <inheritdoc />
    public partial class changepainting_entity_and_post_model : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Paintings");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "Paintings",
                newName: "CategoryName");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CategoryName",
                table: "Paintings",
                newName: "CategoryId");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Paintings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
