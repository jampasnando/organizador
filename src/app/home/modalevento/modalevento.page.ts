import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modalevento',
  templateUrl: './modalevento.page.html',
  styleUrls: ['./modalevento.page.scss'],
})
export class ModaleventoPage implements OnInit {
  nuevoestado:string="";
  antiguoestado:string;
  abierto="false";
  cerrado="false";
  constructor(private modalCtrl:ModalController,private navParams:NavParams) { }

  ngOnInit() {
    this.antiguoestado=this.navParams.get("estadoactual");
    console.log("estado actual: ",this.antiguoestado);
    switch (this.antiguoestado){
      case ("abierto"):
        this.abierto="true";
        break;
      case ("cerrado"):
        this.cerrado="true";
        break;
    }
    console.log("antiguo: ",this.antiguoestado);
  }
  nuevoEstado(evento){
    console.log("tiqueado",evento.detail);
    this.nuevoestado=evento.detail.value;
  }
  guardaestado(){
    console.log("guardará estado: ",this.nuevoestado);
    this.modalCtrl.dismiss(this.nuevoestado);

  }
  elegido(evento){
    this.nuevoestado=evento.detail.value;
    console.log("elegido: ",evento.detail.value);

  }
  cierraModal(){
    console.log("el modal tiene: ",this.nuevoestado);
    this.modalCtrl.dismiss("cancelado");
    
  }
}
