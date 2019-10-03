import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  nuevoestado:string;
  antiguo:string="checked='checked'";
  porrealizar="false";
  completado="false";
  suspendido="false";
  cancelado="false";
  constructor(private modalController: ModalController,private navParams:NavParams) { }

  ngOnInit() {
    this.antiguo=this.navParams.get("antiguo");
    switch (this.antiguo){
      case ('Por realizarse'):
        this.porrealizar="true";
        break;
      case ('Completado'):
          this.completado="true";
        break;
      case ('Suspendido'):
          this.suspendido="true";
        break;
      case ('Cancelado'):
          this.cancelado="true";
        break;
    }
    console.log("antiguo: ",this.antiguo);
    console.log("estados: ",this.porrealizar," | ",this.completado," | ",this.suspendido," | ",this.cancelado);
  }
  elegido(event){
    this.nuevoestado=event.detail.value;
  }
  cancelaModal(){
    this.modalController.dismiss("cancelado");

  }
  guardaCambios(){
    this.modalController.dismiss(this.nuevoestado);
  }
}
