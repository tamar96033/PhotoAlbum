using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoAlbum.Data.Migrations
{
    /// <inheritdoc />
    public partial class updatedata : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 7, 12, 42, 14, 399, DateTimeKind.Utc).AddTicks(3780), new DateTime(2025, 5, 7, 12, 42, 14, 399, DateTimeKind.Utc).AddTicks(3781) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 7, 12, 42, 14, 399, DateTimeKind.Utc).AddTicks(3784), new DateTime(2025, 5, 7, 12, 42, 14, 399, DateTimeKind.Utc).AddTicks(3784) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 7, 12, 42, 14, 399, DateTimeKind.Utc).AddTicks(3925), new DateTime(2025, 5, 7, 12, 42, 14, 399, DateTimeKind.Utc).AddTicks(3926) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 7, 12, 31, 17, 130, DateTimeKind.Utc).AddTicks(7962), new DateTime(2025, 5, 7, 12, 31, 17, 130, DateTimeKind.Utc).AddTicks(7962) });
        }
    }
}
