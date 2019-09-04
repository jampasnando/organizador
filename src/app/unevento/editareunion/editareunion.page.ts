import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultasService } from 'src/app/service/consultas.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-editareunion',
  templateUrl: './editareunion.page.html',
  styleUrls: ['./editareunion.page.scss'],
})
export class EditareunionPage implements OnInit {
  idreunon:string;
  formulario:FormGroup;
  constructor(private activatedRoute:ActivatedRoute, private consultas:ConsultasService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.idreunon=this.activatedRoute.snapshot.paramMap.get("idreunion");
    this.obtienedatosreunion(this.idreunon);
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
      duracion: new FormControl(null,Validators.compose([
        Validators.required
      ])),
      tiqueos:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      instrucciones:new FormControl(null,Validators.compose([
        // Validators.required
      ])),  
      docs: new FormControl(null ,Validators.compose([
        // Validators.required
      ])),
      estado: new FormControl(null, Validators.compose([
        Validators.required
      ]))
    });
  }
  obtienedatosreunion(idreunion){
    this.consultas.obtienedatosreunion(idreunion).subscribe((data:any)=>{
      console.log("unareunion: ",data);
      console.log("nombre: ",data.nombre);
      this.formulario.controls.nombre.setValue(data.nombre);
      this.formulario.controls.lugar.setValue(data.lugar);
      this.formulario.controls.fecha.setValue(data.fecha);
      this.formulario.controls.horainicio.setValue(data.horainicio);
      this.formulario.controls.duracion.setValue(data.duracion);
      this.formulario.controls.tiqueos.setValue(data.tiqueos);
      this.formulario.controls.instrucciones.setValue(data.instrucciones);
      this.formulario.controls.docs.setValue(data.docs);
      this.formulario.controls.estado.setValue(data.estado);
    });
  }
}
