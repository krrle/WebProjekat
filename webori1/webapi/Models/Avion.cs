using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace webapi.Models{
    public class Avion{
        [Key]
        public int Id { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
         
        [MaxLength(25)]
        public string Naziv { get; set; }
    
        public virtual List<Sedista> NizSed { get; set; }
        
    }
}