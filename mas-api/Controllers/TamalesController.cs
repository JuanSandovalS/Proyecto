using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using mas_api.Data;
using mas_api.Models;

namespace mas_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TamalesController : ControllerBase
    {
        private readonly MasDbContext _context;

        public TamalesController(MasDbContext context)
        {
            _context = context;
        }

        // GET: api/Tamales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tamal>>> GetTamales()
        {
            return await _context.Tamales.ToListAsync();
        }

        // GET: api/Tamales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tamal>> GetTamal(int id)
        {
            var tamal = await _context.Tamales.FindAsync(id);

            if (tamal == null)
            {
                return NotFound();
            }

            return tamal;
        }

        // POST: api/Tamales
        [HttpPost]
        public async Task<ActionResult<Tamal>> PostTamal(Tamal tamal)
        {
            _context.Tamales.Add(tamal);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTamal), new { id = tamal.Id }, tamal);
        }

        // PUT: api/Tamales/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTamal(int id, Tamal tamal)
        {
            if (id != tamal.Id)
            {
                return BadRequest();
            }

            _context.Entry(tamal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TamalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Tamales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTamal(int id)
        {
            var tamal = await _context.Tamales.FindAsync(id);
            if (tamal == null)
            {
                return NotFound();
            }

            _context.Tamales.Remove(tamal);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TamalExists(int id)
        {
            return _context.Tamales.Any(e => e.Id == id);
        }
    }
}
