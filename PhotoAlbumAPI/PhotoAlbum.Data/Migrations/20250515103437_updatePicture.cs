using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoAlbum.Data.Migrations
{
    /// <inheritdoc />
    public partial class updatePicture : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Base64ImageData",
                table: "Pictures",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 15, 10, 34, 36, 349, DateTimeKind.Utc).AddTicks(6879), new DateTime(2025, 5, 15, 10, 34, 36, 349, DateTimeKind.Utc).AddTicks(6880) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 15, 10, 34, 36, 349, DateTimeKind.Utc).AddTicks(6898), new DateTime(2025, 5, 15, 10, 34, 36, 349, DateTimeKind.Utc).AddTicks(6899) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 15, 10, 34, 36, 349, DateTimeKind.Utc).AddTicks(7045), new DateTime(2025, 5, 15, 10, 34, 36, 349, DateTimeKind.Utc).AddTicks(7046) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Base64ImageData",
                table: "Pictures");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 7, 13, 11, 59, 599, DateTimeKind.Utc).AddTicks(980), new DateTime(2025, 5, 7, 13, 11, 59, 599, DateTimeKind.Utc).AddTicks(981) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 7, 13, 11, 59, 599, DateTimeKind.Utc).AddTicks(1001), new DateTime(2025, 5, 7, 13, 11, 59, 599, DateTimeKind.Utc).AddTicks(1013) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 7, 13, 11, 59, 599, DateTimeKind.Utc).AddTicks(1125), new DateTime(2025, 5, 7, 13, 11, 59, 599, DateTimeKind.Utc).AddTicks(1126) });
        }
    }
}
