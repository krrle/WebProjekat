import { Sediste } from "./sedista.js";
import {Putnik} from "./putnik.js";
export class Avion{
    constructor(id,x,y){
        this.id = id;
        this.x=x;
        this.y=y;
        this.naziv="";
        this.nizSed=[];
        this.kontejner=null;
    }
    
    crtajAvion(host)
    {

       
        if(!host)
            throw new Error("Roditelj ne postoji");

        let labelaPOM=document.createElement("h3");
        labelaPOM.innerHTML="Naziv Aviona: "+ this.naziv;
        host.appendChild(labelaPOM);
        
        this.kontejner = document.createElement("div");
        this.kontejner.className="kontejner"+this.id;

        this.crtajFormuZaPutnika(this.kontejner);
       
        if(this.nizSed.length==0){
            this.praznaSedista(this.kontejner);
        }
        else{
           
                this.crtajSedistaIzNiza(this.kontejner);
        
        }
        
        
        //this.kontejner.appendChild(kontSed); //ili da se uzmu iz baze ili da se upisu u bazu ako ne postoje   
        host.appendChild(this.kontejner);  

    }
    dodajSed(lok){
        this.nizSed.push(lok);
    }
    crtajSedistaIzNiza(host){
        const kontLokacije = document.createElement("div");
        kontLokacije.className = "kontSed";
        host.appendChild(kontLokacije);
        for(let i=0; i<this.x;i++){
            let red=document.createElement("div");
            red.className="red";
            kontLokacije.appendChild(red);

            for(let j=0;j<this.y;j++){
                this.nizSed.find(p=>p.x==i && p.y==j).crtajSediste(red);
            }
        }
    }
 
        
    async praznaSedista(host){
        var resp;
        
        const kontLokacije = document.createElement("div");
        kontLokacije.className = "kontSed";
        host.appendChild(kontLokacije);
        for(let i=0; i<this.x;i++){
            let red=document.createElement("div");
            red.className="red";
            kontLokacije.appendChild(red);

            for(let j=0;j<this.y;j++){
               
                resp = await fetch("https://localhost:5001/Avion/UpisSedista/" +  this.id ,{
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                           'Content-Type': 'application/json'
                   },
                   body: JSON.stringify({ 
                       AvionId: this.id,
                       x: i,
                       y: j
                      
                   })}).then(resp => {
                        if (resp.status == 200) {
                           resp.json().then(id => {
                                
                               this.nizSed.push(new Sediste(id,i,j,null,this));
                               this.nizSed.find(p=>p.x==i && p.y==j).crtajSediste(red);
                               
                           })
                       }
                       else{
                           alert("Ne valja ovo");
                       }
                   });
               

                  
            }
           
        

        }

        
        
         
        
    }
        
     
    
    crtajFormuZaPutnika(host){
        
            const kontForma=document.createElement("div");
            kontForma.className="kontForma";
            host.appendChild(kontForma);
            var elLabela=document.createElement("h3");
            elLabela.innerHTML="Unos Putnika";
    
            kontForma.appendChild(elLabela);
    
    
            elLabela=document.createElement("label");
            elLabela.innerHTML="Ime";
            kontForma.appendChild(elLabela);
    
            let tb=document.createElement("input");
            tb.className="ime";
            kontForma.appendChild(tb);
    
            elLabela=document.createElement("label");
            elLabela.innerHTML="Prezime";
            kontForma.appendChild(elLabela);
    
            tb=document.createElement("input");
            tb.className="prezime";
            kontForma.appendChild(tb);
    
            elLabela=document.createElement("label");
            elLabela.innerHTML="Broj Pasosa";
            kontForma.appendChild(elLabela);
    
            tb=document.createElement("input");
            tb.className="brPasos";       
            tb.type="number";
            kontForma.appendChild(tb);
    
            elLabela=document.createElement("label");
            elLabela.innerHTML="Broj Karte";
            kontForma.appendChild(elLabela);
    
            tb=document.createElement("input");
            tb.className="karta";
            tb.type="number";
            kontForma.appendChild(tb);
    
            let opcija=null;
            let labela=null;
            let divRB=null; //DIV ZA RADIO BUTTON
    
            labela=document.createElement("label");
            labela.innerHTML="Izaberite Pol";
            
    
            
            divRB=document.createElement("div");
            divRB.appendChild(labela);
    
            labela=document.createElement("label");
            labela.innerHTML="Muski";
            opcija=document.createElement("input");
            opcija.type="radio";
            opcija.className="pol";
            opcija.name="Pol";
            opcija.value=1;
    
            labela=document.createElement("label");
            labela.innerHTML="Muski";
            divRB.appendChild(opcija);
            divRB.appendChild(labela);
            kontForma.appendChild(divRB);
    
            opcija=document.createElement("input");
            opcija.type="radio";
            opcija.className="pol";
            opcija.name="Pol";
            opcija.value=2;
    
            labela=document.createElement("label");
            labela.innerHTML="Zenski";
            divRB.appendChild(opcija);
            divRB.appendChild(labela);
            kontForma.appendChild(divRB);

            divRB=document.createElement("div");
            divRB.className= "divRB";
            let selX=document.createElement("select");
            selX.className="x";
            labela=document.createElement("label");
            labela.innerHTML="X";
            divRB.appendChild(labela);
            divRB.appendChild(selX);
            for(let i=0; i<this.x;i++){
                opcija=document.createElement("option");
                opcija.innerHTML=i;
                opcija.value=i;
                selX.appendChild(opcija);

            }

            kontForma.appendChild(divRB);  

            divRB=document.createElement("div");
            divRB.className= "divRB";
            let selY=document.createElement("select");
            selY.className="y";
            labela=document.createElement("label");
            labela.innerHTML="Y";
            divRB.appendChild(labela);
            divRB.appendChild(selY);
            for(let i=0; i<this.y;i++){
                opcija=document.createElement("option");
                opcija.innerHTML=i;
                opcija.value=i;
                selY.appendChild(opcija);

            }
            kontForma.appendChild(divRB);

            const dugme=document.createElement("button");
            dugme.innerHTML="Dodaj Putnika";
            kontForma.appendChild(dugme);
            dugme.onclick=(ev)=>{

                const prezime= kontForma.querySelector(".prezime").value;
                const brojPasosa= parseInt( kontForma.querySelector(".brPasos").value);
           
                const imee= kontForma.querySelector(".ime").value;
                const brojK = parseInt(kontForma.querySelector(".karta").value);
                const kordX=parseInt( selX.value);
                const kordY=parseInt (selY.value);

          
                if(imee==""){
                    alert("Molimo vas popunite Ime");
                    return;
                }
                if(prezime==""){
                    alert("Molimo vas popunite Prezime");
                    return;
                }
                if(brojPasosa==null){
                    alert("Molimo vas unesite broj pasosa");
                    return
                }
                if(brojPasosa!=null){
                    let sed = this.nizSed.find(p=>p.putnik!=null && p.putnik.brPasos==brojPasosa );
                    if(sed!=null){
                    alert("Vec je unet putnik sa istim brojem pasosa");
                    return;}
                }
                if(brojK==null){
                    alert("Molimo vas unesite broj Karte");
                    return;
                }
                if(kordX==null || kordX<0){
                    alert("Molimo vas unesite red sedista");
                    return;
                }
                
                if(kordY==null || kordY<0){
                    alert("Molimo vas unesite kolonu sedista");
                    return;
                }

                let sed = this.nizSed.find(p=> p.x==kordX && p.y==kordY);
                
                if(sed!=null && sed.putnik==null){
                    this.nizSed.find(p=> p.x==kordX && p.y==kordY).dodajPutnikaUBazu( imee,prezime,brojPasosa,"",kordX,kordY)
                } 
                else alert("Sediste je vec zauzeto");


        
            }
    }
    
}