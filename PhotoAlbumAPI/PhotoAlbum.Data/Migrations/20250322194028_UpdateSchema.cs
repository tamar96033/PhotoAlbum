using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoAlbum.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 22, 19, 40, 27, 889, DateTimeKind.Utc).AddTicks(808), new DateTime(2025, 3, 22, 19, 40, 27, 889, DateTimeKind.Utc).AddTicks(810) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 22, 19, 40, 27, 889, DateTimeKind.Utc).AddTicks(815), new DateTime(2025, 3, 22, 19, 40, 27, 889, DateTimeKind.Utc).AddTicks(815) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 22, 19, 40, 27, 889, DateTimeKind.Utc).AddTicks(819), new DateTime(2025, 3, 22, 19, 40, 27, 889, DateTimeKind.Utc).AddTicks(819) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 17, 16, 37, 25, 711, DateTimeKind.Utc).AddTicks(4841), new DateTime(2025, 3, 17, 16, 37, 25, 711, DateTimeKind.Utc).AddTicks(4842) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 17, 16, 37, 25, 711, DateTimeKind.Utc).AddTicks(4846), new DateTime(2025, 3, 17, 16, 37, 25, 711, DateTimeKind.Utc).AddTicks(4846) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 17, 16, 37, 25, 711, DateTimeKind.Utc).AddTicks(4849), new DateTime(2025, 3, 17, 16, 37, 25, 711, DateTimeKind.Utc).AddTicks(4850) });
        }
    }
}
