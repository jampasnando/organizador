import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder,FormControl,Validators } from '@angular/forms';
import { ConsultasService } from 'src/app/service/consultas.service';

@Component({
  selector: 'app-editaevento',
  templateUrl: './editaevento.page.html',
  styleUrls: ['./editaevento.page.scss'],
})
export class EditaeventoPage implements OnInit {
  idevento:string;
  formulario:FormGroup;
  constructor(private activatedRoute:ActivatedRoute,private formBuilder:FormBuilder, private consultas:ConsultasService,private router:Router) { }
  
  ngOnInit() {
    this.idevento=this.activatedRoute.snapshot.paramMap.get("idevento");
    this.obtieneDatosEvento(this.idevento);
    this.formulario=this.formBuilder.group({
      nombre:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      descripcion:new FormControl(null,Validators.compose([
        Validators.maxLength(2000)
      ])),
      estado:new FormControl(null,Validators.compose([
        Validators.required
      ]))
    });
  }
  obtieneDatosEvento(idevento){
    this.consultas.obtieneDatosEvento(idevento).subscribe((data:any)=>{
      console.log("unevetno desde bd: ",data);
      this.formulario.controls.nombre.setValue(data.nombre);
      this.formulario.controls.descripcion.setValue(data.descripcion);
      this.formulario.controls.estado.setValue(data.estado);
    });
  }
  guardaCambiosEvento(){
    this.consultas.actualizaDatosEvento(this.formulario,this.idevento).subscribe((data)=>{
      let url="/home";
      this.router.urlUpdateStrategy="eager";
      this.router.navigateByUrl(url);
    });
  }
}
