import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-comentar',
  templateUrl: './comentar.page.html',
  styleUrls: ['./comentar.page.scss'],
})
export class ComentarPage implements OnInit {
  nombre:string;
  cargo:string;
  unidad:string;
  comentario:string="";
  constructor(private navParams:NavParams,private modal:ModalController) { }

  ngOnInit() {
    this.nombre=this.navParams.get("nombre");
  }
  guardarComentario(){
    console.log("comentario: ",this.comentario);
    this.modal.dismiss(this.comentario);
  }
  cancelaModal(){
    this.modal.dismiss("cancel");
  }
}
