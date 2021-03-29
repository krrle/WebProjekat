using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models{
    public class Putnik{
        [Key]
        public int Id { get; set; }

        [MaxLength(255)]
        public string Ime { get; set; }

        [MaxLength(255)]
        public string Prezime { get; set; }

        public int BrPasos { get; set;}
        public int SedisteId {get; set;}
        
        public int X {get; set; }
        public int Y { get; set; }
       
     
       



    
       
    }
}