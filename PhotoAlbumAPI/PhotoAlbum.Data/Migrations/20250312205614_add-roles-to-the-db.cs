using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace PhotoAlbum.Data.Migrations
{
    /// <inheritdoc />
    public partial class addrolestothedb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "CreatedAt", "Description", "Name", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, new DateTime(2025, 3, 12, 20, 56, 14, 644, DateTimeKind.Utc).AddTicks(2244), "Administrator role", "Admin", new DateTime(2025, 3, 12, 20, 56, 14, 644, DateTimeKind.Utc).AddTicks(2245) },
                    { 2, new DateTime(2025, 3, 12, 20, 56, 14, 644, DateTimeKind.Utc).AddTicks(2248), "Editor role", "Editor", new DateTime(2025, 3, 12, 20, 56, 14, 644, DateTimeKind.Utc).AddTicks(2248) },
                    { 3, new DateTime(2025, 3, 12, 20, 56, 14, 644, DateTimeKind.Utc).AddTicks(2251), "Viewer role", "Viewer", new DateTime(2025, 3, 12, 20, 56, 14, 644, DateTimeKind.Utc).AddTicks(2251) }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3);
        }
    }
}
