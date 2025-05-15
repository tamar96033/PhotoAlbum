using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoAlbum.Data.Migrations
{
    /// <inheritdoc />
    public partial class updatePicture2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Base64ImageData",
                table: "Pictures",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 15, 10, 39, 23, 554, DateTimeKind.Utc).AddTicks(1147), new DateTime(2025, 5, 15, 10, 39, 23, 554, DateTimeKind.Utc).AddTicks(1148) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 15, 10, 39, 23, 554, DateTimeKind.Utc).AddTicks(1169), new DateTime(2025, 5, 15, 10, 39, 23, 554, DateTimeKind.Utc).AddTicks(1176) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 15, 10, 39, 23, 554, DateTimeKind.Utc).AddTicks(1279), new DateTime(2025, 5, 15, 10, 39, 23, 554, DateTimeKind.Utc).AddTicks(1280) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Pictures",
                keyColumn: "Base64ImageData",
                keyValue: null,
                column: "Base64ImageData",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Base64ImageData",
                table: "Pictures",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

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
    }
}
