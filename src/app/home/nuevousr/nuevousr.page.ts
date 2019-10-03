import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConsultasService } from 'src/app/service/consultas.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-nuevousr',
  templateUrl: './nuevousr.page.html',
  styleUrls: ['./nuevousr.page.scss'],
})
export class NuevousrPage implements OnInit {
  formulario:FormGroup;
  constructor(private formBuilder:FormBuilder,private consultas:ConsultasService,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.formulario=this.formBuilder.group({
      nombre:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      rol:new FormControl("tiqueador",Validators.compose([
        Validators.required
      ])),
      ci:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      password:new FormControl(null,Validators.compose([
        Validators.required
      ]))
    });
  }
  guardaUsr(){
    this.consultas.enviaNuevoUsr(this.formulario).subscribe((data:any)=>{
      console.log("usr guardado");
      this.modalCtrl.dismiss();
    });
  }

}
