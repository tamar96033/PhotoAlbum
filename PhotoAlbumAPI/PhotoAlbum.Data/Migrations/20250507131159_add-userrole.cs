using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoAlbum.Data.Migrations
{
    /// <inheritdoc />
    public partial class adduserrole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Roles_Users_UserId",
                table: "Roles");

            migrationBuilder.DropIndex(
                name: "IX_Roles_UserId",
                table: "Roles");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Roles");

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
                columns: new[] { "CreatedAt", "Description", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 7, 13, 11, 59, 599, DateTimeKind.Utc).AddTicks(1001), "User role", new DateTime(2025, 5, 7, 13, 11, 59, 599, DateTimeKind.Utc).AddTicks(1013) });

            migrationBuilder.InsertData(
                table: "UserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { 1, 1 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 7, 13, 11, 59, 599, DateTimeKind.Utc).AddTicks(1125), new DateTime(2025, 5, 7, 13, 11, 59, 599, DateTimeKind.Utc).AddTicks(1126) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "UserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Roles",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt", "UserId" },
                values: new object[] { new DateTime(2025, 5, 7, 12, 42, 14, 399, DateTimeKind.Utc).AddTicks(3780), new DateTime(2025, 5, 7, 12, 42, 14, 399, DateTimeKind.Utc).AddTicks(3781), null });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedAt", "Description", "UpdatedAt", "UserId" },
                values: new object[] { new DateTime(2025, 5, 7, 12, 42, 14, 399, DateTimeKind.Utc).AddTicks(3784), "user role", new DateTime(2025, 5, 7, 12, 42, 14, 399, DateTimeKind.Utc).AddTicks(3784), null });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedAt", "UpdatedAt" },
                values: new object[] { new DateTime(2025, 5, 7, 12, 42, 14, 399, DateTimeKind.Utc).AddTicks(3925), new DateTime(2025, 5, 7, 12, 42, 14, 399, DateTimeKind.Utc).AddTicks(3926) });

            migrationBuilder.CreateIndex(
                name: "IX_Roles_UserId",
                table: "Roles",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Roles_Users_UserId",
                table: "Roles",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
