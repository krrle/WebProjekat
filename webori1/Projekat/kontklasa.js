// import { Sediste } from "./sedista.js";
// import {Putnik} from "./putnik.js";
import {Avion} from "./avion.js";
import { Putnik } from "./putnik.js";
import { Sediste } from "./sedista.js";

export class Kontejner{
    constructor(){
        this.nizAvi=[];
        this.broj;
    }
    dodajAvion(avion){
        this.nizAvi.push(avion);
    }

    kontejnerDraw(host){
        
        
            let lab= document.createElement("label");
            lab.innerHTML="Broj redova";       
            const avKon=document.createElement("div");
            avKon.className = "glavniKontejner";
            
            const PocetnaForma=document.createElement("div");
            PocetnaForma.className = "PocetnaForma";
            PocetnaForma.appendChild(lab);

    
            let inp=document.createElement("input");
            inp.type="number";
            inp.classList.add("brRed")
            PocetnaForma.appendChild(inp);
    
            lab=document.createElement("label");
            lab.innerHTML="Broj kolona";
            PocetnaForma.appendChild(lab);
    
            inp=document.createElement("input");
            inp.type="number";
            inp.className=("brKol");
            PocetnaForma.appendChild(inp);
    

            lab=document.createElement("label");
            lab.innerHTML="Naziv Aviona";
            PocetnaForma.appendChild(lab);
    
            inp=document.createElement("input");
            inp.className=("nazivG");
            PocetnaForma.appendChild(inp);
    
           
    
    
            let dug=document.createElement("button");
            dug.innerHTML="Dodaj Avion";     
            dug.className=("dugmeGlavna"); 
            PocetnaForma.appendChild(dug);

            avKon.appendChild(PocetnaForma);
  
   
          
            let dug2;
            dug2=document.createElement("button");
            dug2.innerHTML="Obrisi Avion";
              
            dug2.onclick=(ev)=>{
                     

                    var index = this.nizAvi.findIndex(function(item){ return item.id == newAvi.id});
                    this.nizAvi.splice(index, 1); 
                    fetch("https://localhost:5001/Avion/IzbrisiAvi/" + newAvi.id ,{
                        method: 'DELETE', 
                        headers: {
                                'Content-type': 'application/json'
                         }
                        }).then(resp =>{
                        if (resp.status == 204) {

                            const divic =document.getElementById(newAvi.id);
                            divic.remove();
                        }
                        else{
                            alert("Brisanje aviona nije uspelo ");
                        }
                        });
              
                }
            
           
            dug.onclick =(ev)=>{
                const name = avKon.querySelector(".nazivG").value;
                const xic= parseInt(document.querySelector(".brRed").value);
                const yic= parseInt(document.querySelector(".brKol").value);

              

                let kontejnerSaNazivom=document.createElement("div");
                var newAvi;
               
                if(xic<0 || yic<0)
                    alert("Velicine moraju biti pozitivne vrednosti");

                else{
                    
                    fetch("https://localhost:5001/Avion/UpisAvi" , {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            x: xic,
                            y: yic,
                            naziv: name
                        })
                        }).then(resp => {
                            if (resp.status == 200) {
                               resp.json().then(id => {
                                        newAvi = new Avion(id,xic,yic);
                                        newAvi.naziv= name;
                                       
                                       kontejnerSaNazivom.id = newAvi.id;
                                       this.dodajAvion(newAvi);
                                       newAvi.crtajAvion(kontejnerSaNazivom);
                                        
                                    })
                                }
                                
                         });
                }

                    kontejnerSaNazivom.appendChild(dug2);
                    avKon.appendChild(kontejnerSaNazivom);
                  
                }

                let dug3=document.createElement("button");
                dug3.innerHTML="Ucitaj Avione iz Baze";
                dug3.onclick=(ev)=>{
                    let kontejnerSaNazivom;
                    let dugmeObrisi ;
                    fetch("https://localhost:5001/Avion/PreuzmiAvi").then(p => {
                        p.json().then(data => {
                
                            data.forEach(e => {
                                kontejnerSaNazivom=document.createElement("div");
                                let newAvi = new Avion(e.id,e.x,e.y);
                                kontejnerSaNazivom.id = newAvi.id;
                                dugmeObrisi = document.createElement("button");
                                dugmeObrisi.innerHTML = "Obrisi";
                                dugmeObrisi.onclick=(ev)=>{
                     

                                    var index = this.nizAvi.findIndex(function(item){ return item.id == newAvi.id});
                                    this.nizAvi.splice(index, 1); 
                                    fetch("https://localhost:5001/Avion/IzbrisiAvi/" + newAvi.id ,{
                                        method: 'DELETE', 
                                        headers: {
                                                'Content-type': 'application/json'
                                         }
                                        }).then(resp =>{
                                        if (resp.status == 204) {
                
                                            const divic =document.getElementById(newAvi.id);
                                            divic.remove();
                                        }
                                        else{
                                            alert("Brisanje aviona nije uspelo ");
                                        }
                                        });
                              
                                }




                                
                                kontejnerSaNazivom.appendChild(dugmeObrisi); 
                                newAvi.naziv = e.naziv;
                                e.nizSed.forEach(el => {
                                        
                                        let sed = new Sediste(el.id,el.x,el.y,null,newAvi); 
                                        if(el.putnik != null)
                                            sed.putnik = new Putnik(el.putnik.id, el.putnik.ime, el.putnik.prezime, el.putnik.brPasos)  
                                        newAvi.nizSed.push(sed);
                                      
                                        this.dodajAvion(newAvi);
                                       
                                }); 
                                console.log(this);
                                newAvi.crtajAvion(kontejnerSaNazivom); 
                               
                                avKon.appendChild(kontejnerSaNazivom);
                               
                                
                               
                            });
                        })
                    });
                }
                PocetnaForma.appendChild(dug3);
                host.appendChild(avKon);
             
              

        }
            
            
    } 
       
    
    

        
       


    
