using Microsoft.EntityFrameworkCore;

namespace webapi.Models{
    public class AvionContext:DbContext {

        public DbSet<Avion> Avioni {get; set;}
	    
        public DbSet<Sedista> Sedistas {get; set;}
        public DbSet<Putnik> Putnici {get; set;}
      
        public AvionContext(DbContextOptions options) : base(options){

        }
        
    } 
}