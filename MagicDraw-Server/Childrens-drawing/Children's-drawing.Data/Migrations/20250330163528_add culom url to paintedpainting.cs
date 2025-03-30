using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Childrens_drawing.Data.Migrations
{
    /// <inheritdoc />
    public partial class addculomurltopaintedpainting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NewUrl",
                table: "PaintedPaintings");

            migrationBuilder.RenameColumn(
                name: "SorceUrl",
                table: "PaintedPaintings",
                newName: "Url");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Url",
                table: "PaintedPaintings",
                newName: "SorceUrl");

            migrationBuilder.AddColumn<string>(
                name: "NewUrl",
                table: "PaintedPaintings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
