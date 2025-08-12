using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace masapi.Migrations
{
    /// <inheritdoc />
    public partial class AddTamales : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tamales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Masa = table.Column<string>(type: "TEXT", nullable: false),
                    Relleno = table.Column<string>(type: "TEXT", nullable: false),
                    Envoltura = table.Column<string>(type: "TEXT", nullable: false),
                    Picante = table.Column<string>(type: "TEXT", nullable: false),
                    PrecioUnidad = table.Column<decimal>(type: "TEXT", nullable: false),
                    PrecioMediaDocena = table.Column<decimal>(type: "TEXT", nullable: false),
                    PrecioDocena = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tamales", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tamales");
        }
    }
}
