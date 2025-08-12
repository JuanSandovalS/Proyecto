using mas_api.Models;
using Microsoft.EntityFrameworkCore;

namespace mas_api.Data
{
    public class MasDbContext : DbContext
    {
        public MasDbContext(DbContextOptions<MasDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Tamal> Tamales { get; set; }       
    }
}
