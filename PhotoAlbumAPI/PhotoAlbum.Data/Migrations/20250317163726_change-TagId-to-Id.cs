using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoAlbum.Data.Migrations
{
    /// <inheritdoc />
    public partial class changeTagIdtoId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TagId",
                table: "Tags",
                newName: "Id");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Tags",
                newName: "TagId");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 12, 20, 56, 14, 644, DateTimeKind.Utc).AddTicks(2244), new DateTime(2025, 3, 12, 20, 56, 14, 644, DateTimeKind.Utc).AddTicks(2245) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 12, 20, 56, 14, 644, DateTimeKind.Utc).AddTicks(2248), new DateTime(2025, 3, 12, 20, 56, 14, 644, DateTimeKind.Utc).AddTicks(2248) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 3, 12, 20, 56, 14, 644, DateTimeKind.Utc).AddTicks(2251), new DateTime(2025, 3, 12, 20, 56, 14, 644, DateTimeKind.Utc).AddTicks(2251) });
        }
    }
}
