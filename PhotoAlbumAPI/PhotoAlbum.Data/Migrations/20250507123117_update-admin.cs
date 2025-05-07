using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoAlbum.Data.Migrations
{
    /// <inheritdoc />
    public partial class updateadmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 7, 12, 31, 17, 130, DateTimeKind.Utc).AddTicks(7809), new DateTime(2025, 5, 7, 12, 31, 17, 130, DateTimeKind.Utc).AddTicks(7809) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 7, 12, 31, 17, 130, DateTimeKind.Utc).AddTicks(7812), new DateTime(2025, 5, 7, 12, 31, 17, 130, DateTimeKind.Utc).AddTicks(7821) });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "Name", "Password", "UpdatedAt" },
                values: new object[] { 1, new DateTime(2025, 5, 7, 12, 31, 17, 130, DateTimeKind.Utc).AddTicks(7962), "admin@admin.com", "admin", "admin123", new DateTime(2025, 5, 7, 12, 31, 17, 130, DateTimeKind.Utc).AddTicks(7962) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 7, 12, 28, 12, 86, DateTimeKind.Utc).AddTicks(4159), new DateTime(2025, 5, 7, 12, 28, 12, 86, DateTimeKind.Utc).AddTicks(4160) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 7, 12, 28, 12, 86, DateTimeKind.Utc).AddTicks(4163), new DateTime(2025, 5, 7, 12, 28, 12, 86, DateTimeKind.Utc).AddTicks(4172) });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedAt", "Email", "Name", "Password", "UpdatedAt" },
                values: new object[] { 10, new DateTime(2025, 5, 7, 12, 28, 12, 86, DateTimeKind.Utc).AddTicks(4318), "admin@admin.com", "admin", "admin123", new DateTime(2025, 5, 7, 12, 28, 12, 86, DateTimeKind.Utc).AddTicks(4319) });
        }
    }
}
