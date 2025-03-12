using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PhotoAlbum.Data.Migrations
{
    /// <inheritdoc />
    public partial class changenames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FileTags_Files_FileId",
                table: "FileTags");

            migrationBuilder.DropForeignKey(
                name: "FK_FileTags_Tags_TagId",
                table: "FileTags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FileTags",
                table: "FileTags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Files",
                table: "Files");

            migrationBuilder.RenameTable(
                name: "FileTags",
                newName: "PictureTags");

            migrationBuilder.RenameTable(
                name: "Files",
                newName: "Pictures");

            migrationBuilder.RenameColumn(
                name: "FileId",
                table: "PictureTags",
                newName: "PictureId");

            migrationBuilder.RenameIndex(
                name: "IX_FileTags_TagId",
                table: "PictureTags",
                newName: "IX_PictureTags_TagId");

            migrationBuilder.RenameIndex(
                name: "IX_FileTags_FileId",
                table: "PictureTags",
                newName: "IX_PictureTags_PictureId");

            migrationBuilder.RenameColumn(
                name: "FileName",
                table: "Pictures",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "FileId",
                table: "Pictures",
                newName: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PictureTags",
                table: "PictureTags",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Pictures",
                table: "Pictures",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PictureTags_Pictures_PictureId",
                table: "PictureTags",
                column: "PictureId",
                principalTable: "Pictures",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PictureTags_Tags_TagId",
                table: "PictureTags",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "TagId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PictureTags_Pictures_PictureId",
                table: "PictureTags");

            migrationBuilder.DropForeignKey(
                name: "FK_PictureTags_Tags_TagId",
                table: "PictureTags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PictureTags",
                table: "PictureTags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Pictures",
                table: "Pictures");

            migrationBuilder.RenameTable(
                name: "PictureTags",
                newName: "FileTags");

            migrationBuilder.RenameTable(
                name: "Pictures",
                newName: "Files");

            migrationBuilder.RenameColumn(
                name: "PictureId",
                table: "FileTags",
                newName: "FileId");

            migrationBuilder.RenameIndex(
                name: "IX_PictureTags_TagId",
                table: "FileTags",
                newName: "IX_FileTags_TagId");

            migrationBuilder.RenameIndex(
                name: "IX_PictureTags_PictureId",
                table: "FileTags",
                newName: "IX_FileTags_FileId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Files",
                newName: "FileName");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Files",
                newName: "FileId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FileTags",
                table: "FileTags",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Files",
                table: "Files",
                column: "FileId");

            migrationBuilder.AddForeignKey(
                name: "FK_FileTags_Files_FileId",
                table: "FileTags",
                column: "FileId",
                principalTable: "Files",
                principalColumn: "FileId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_FileTags_Tags_TagId",
                table: "FileTags",
                column: "TagId",
                principalTable: "Tags",
                principalColumn: "TagId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
