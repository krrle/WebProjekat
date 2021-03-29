
import {Putnik} from "./putnik.js";
export class Sediste{
    constructor(id, x, y,putnik,avion){
        this.id=id;
        this.x=x;
        this.y=y;
        this.putnik=putnik;
        this.avion =avion;
        this.miniKontejner=null;
        
    }
    crtajSediste(host){
        let el=document.createElement("div");
        el.className="sed"+this.id;
        el.innerHTML="Sediste broj "+  "("+ this.x+   "," +this.y +")";
        this.miniKontejner=el;
        if(this.putnik!=null){
            this.miniKontejner.classList.add("crvena");
            this.miniKontejner.innerHTML=this.putnik.ime+ " "+ this.putnik.prezime +" "+this.putnik.brPasos;
        }
        
        host.appendChild(this.miniKontejner);
        
    }
    
    dodajPutnikaUBazu(imee, prezime, brojPasosa,  pol,x,y){
    
        fetch("https://localhost:5001/Avion/UpisPutnik/"+ this.id  ,{
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ime: imee,
                    prezime: prezime,
                    brPasos: brojPasosa,
                    sedisteId: this.id,
                    x: x,
                    y: y

            })
            }).then(resp => {
            if (resp.status == 200) {
               resp.json().then(id => {
                        this.putnik= new Putnik(id, imee,prezime,brojPasosa,pol,x,y);
                        this.miniKontejner.classList.add("crvena");
                        this.miniKontejner.innerHTML=this.putnik.ime+ " "+ this.putnik.prezime +" "+this.putnik.brPasos;
                       alert("Dodat je putnik");
                    
                       })
                    }
                });
   
            }

    
}