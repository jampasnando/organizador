import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConsultasService } from '../service/consultas.service';

@Component({
  selector: 'app-nuevareunion',
  templateUrl: './nuevareunion.page.html',
  styleUrls: ['./nuevareunion.page.scss'],
})
export class NuevareunionPage implements OnInit {
  id:string;
  formulario:FormGroup;
  constructor(private activatedRoute:ActivatedRoute, private formBuilder:FormBuilder, private consultas:ConsultasService, private router:Router) { 
    this.formulario=this.formBuilder.group({
      nombre:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      lugar:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      fecha:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      horainicio:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      duracion: new FormControl('indefinida',Validators.compose([
        Validators.required
      ])),
      tiqueos:new FormControl('1',Validators.compose([
        Validators.required
      ])),
      instrucciones:new FormControl('',Validators.compose([
        // Validators.required
      ])),
      docs: new FormControl('',Validators.compose([
        // Validators.required
      ])),
      estado: new FormControl('Por realizarse', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit() {
    
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    console.log("nuevareunion: ",this.id);
  }
  enviaFormNuevaReunion(){
    console.log(this.formulario);
    console.log("fecha: ",this.formulario.value.fecha);
    let vectorfecha=this.formulario.value.fecha.split("T");
    let fechax=vectorfecha[0];
    let aux=this.formulario.value.horainicio.split("T");
    let horax=aux[1].substring(0,5);
    console.log(horax);
    this.consultas.enviaFormNuevaReunion(this.formulario,fechax,horax,this.id).subscribe((data:any)=>{
      console.log("desde servidor bd reg nueva reunon: ",data);
      let url="/unevento/".concat(this.id);
      this.router.urlUpdateStrategy="eager";
      this.router.navigateByUrl(url);
    });

  }
}
