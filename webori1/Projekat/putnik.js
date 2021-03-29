import { Sediste } from "./sedista.js";
export class Putnik{
    constructor(id,ime, prezime, brPasos, pol, x, y){
        this.id =id;
        this.ime=ime;
        this.prezime=prezime;
        this.brPasos=brPasos;
        this.pol=pol;
        this.kontejner=null;
        this.x=x;
        this.y=y;
    }
    
    

   podacioputniku(host){

        const divic = document.createElement("div");
        divic.className= "divZaPutnika";
        var elLabela=document.createElement("h5");
        elLabela.innerHTML="Putnik:";

        divic.appendChild(elLabela);


        elLabela=document.createElement("label");
        elLabela.innerHTML="Ime: "+ this.ime;
        divic.appendChild(elLabela);

        elLabela=document.createElement("label");
        elLabela.innerHTML="Prezime:" + this.prezime;
        divic.appendChild(elLabela);
        host.appendChild(divic);
     
   }
}