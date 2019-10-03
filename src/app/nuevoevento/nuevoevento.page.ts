import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConsultasService } from '../service/consultas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevoevento',
  templateUrl: './nuevoevento.page.html',
  styleUrls: ['./nuevoevento.page.scss'],
})
export class NuevoeventoPage implements OnInit {
  
  formulario:FormGroup;
  constructor(private formBuilder:FormBuilder, private consultas:ConsultasService, private router:Router) { 
    this.formulario=this.formBuilder.group({
      nombre:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      descripcion:new FormControl(null,Validators.compose([
        Validators.maxLength(2000)
      ])),
      estado:new FormControl('abierto',Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit() {
  
  }
  guardaNuevoEvento(){
    this.consultas.enviaFormNuevoEv(this.formulario.value).subscribe((data:any) => {
      console.log("recibe desde el server: ", data);
      let url="/home";
      this.router.urlUpdateStrategy="eager";
      this.router.navigateByUrl(url);
    });
    // this.funciones.recibeDatosFormu(this.formulario.value);
  }
}
