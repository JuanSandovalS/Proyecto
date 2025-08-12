using Microsoft.AspNetCore.Mvc;
using mas_api.Data; 
using System.Threading.Tasks;

namespace mas_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly MasDbContext _context;

        public DashboardController(MasDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboardData()
        {
             var data = new
            {
                VentasDiarias = await CalcularVentasDiarias(),
                VentasMensuales = await CalcularVentasMensuales(),
                ProductosPopulares = await ObtenerProductosPopulares(),
                VentasPorHora = await ObtenerVentasPorHora()
            };

            return Ok(data);
        }

        private async Task<decimal> CalcularVentasDiarias()
        {
             return 3425.50m;
        }

        private async Task<decimal> CalcularVentasMensuales()
        {
             return 98750.75m;
        }

        private async Task<object[]> ObtenerProductosPopulares()
        {
             return new object[]
            {
                new { Id = 1, Nombre = "Tamal Chapín", CantidadVendida = 125, Tipo = "tamal" },
                new { Id = 2, Nombre = "Atol de Elote", CantidadVendida = 98, Tipo = "bebida" }
            };
        }

        private async Task<object[]> ObtenerVentasPorHora()
        {
           
            return new object[]
            {
                new { Hora = "08:00", Ventas = 15 },
                new { Hora = "10:00", Ventas = 42 }
            };
        }
    }
}