using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models{
    public class Sedista{
        [Key]
        public int Id { get; set; }  
        public int AvionId {get; set;}
        public int X {get; set; }
        public int Y { get; set; }
        public virtual Putnik Putnik { get; set; }


    
       
    }
}