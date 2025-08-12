namespace mas_api.Models
{
    public class Tamal
    {
        public int Id { get; set; }
        
        public required string Masa { get; set; }            
        public required string Relleno { get; set; }        
        public required string Envoltura { get; set; }       
        public required string Picante { get; set; }          

        public decimal PrecioUnidad { get; set; }
        public decimal PrecioMediaDocena { get; set; }
        public decimal PrecioDocena { get; set; }
    }
}
