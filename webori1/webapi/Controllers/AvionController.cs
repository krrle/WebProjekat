using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using webapi.Models;
using Microsoft.EntityFrameworkCore;


namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AvionController : ControllerBase
    {
        private AvionContext Context;
        public AvionController(AvionContext context)
        {
            Context=context;
        }
        [Route("PreuzmiAvi")]
        [HttpGet]
        public async Task<List<Avion>> PreuzmiAvi(){
            return await Context.Avioni.Include("NizSed.Putnik").ToListAsync();
        }
        [Route("PreuzmiAvi/{id}")]
        [HttpGet]
        public async Task<Avion> PreuzmiAvi(int id){
            return await Context.Avioni.Include("NizSed.Putnik").FirstOrDefaultAsync(p => p.Id == id);
        }

        [Route("UpisAvi")]
        [HttpPost]
        public async Task<int> UpisiAvi([FromBody] Avion avion)
        {
            Context.Avioni.Add(avion);
            await Context.SaveChangesAsync();
            return avion.Id;
        }

        [Route("IzmeniAvi/{id}")]
        [HttpPut]
        public async Task<IActionResult> IzmeniAvi(int id,[FromBody] Avion avion)
        {
            Avion avio =await Context.Avioni.FindAsync(id);
            if(avio==null)
                return StatusCode(404);
            
            avio.Naziv =avion.Naziv;
            await Context.SaveChangesAsync();
            return StatusCode(200);
        }
        [Route("IzbrisiAvi/{id}")]
        [HttpDelete]
        public async Task<IActionResult> IzbrisiAvi(int id){
            
            Avion avi = await Context.Avioni.Include("NizSed.Putnik").FirstOrDefaultAsync(p => p.Id == id);
            if(avi==null) 
                return StatusCode(404);

            Context.Remove(avi);
            await Context.SaveChangesAsync();
            return StatusCode(204);
            
        }

        [Route("UpisPutnik/{sedisteId}")]
        [HttpPost]
        public async Task<int> UpisPutnik(int sedisteId,[FromBody] Putnik putnik)
        {
            Sedista sed = await Context.Sedistas.FindAsync(sedisteId);
            if(sed!=null){
                sed.Putnik =putnik;
                Context.Putnici.Add(putnik);
                await Context.SaveChangesAsync();
            }
            return putnik.Id;
        }
        [Route("PreuzmiPutnik/{id}")]
        [HttpGet]
        public async Task<Putnik> PreuzmiPutnik(int id){
       
            return await Context.Putnici.FindAsync(id);
        }
        
        [Route("PreuzmiSediste/{id}")]
        [HttpGet]
        public async Task<Sedista> PreuzmiSediste(int id){
       
            return await Context.Sedistas.FindAsync(id);
        }

        [Route("UpisSedista/{avionId}")]
        [HttpPost]
        public async Task<int> UpisSedista(int avionId,[FromBody] Sedista sed)
        {
            Avion avi = await Context.Avioni.FindAsync(avionId);
            if(avi!=null){       
                Context.Sedistas.Add(sed);
                await Context.SaveChangesAsync();
            }
            return sed.Id;
        }
        
       
    }
}
