import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultasService } from 'src/app/service/consultas.service';
import { ModalController, AlertController, IonList } from '@ionic/angular';
import { NuevousrPage } from '../nuevousr/nuevousr.page';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  @ViewChild("mislide",{static:false}) mislide:IonList;
  usuarios:any;
  constructor(private consultas:ConsultasService, private modalCtrl:ModalController,private alertCtrl:AlertController) { }

  ngOnInit() {
    this.consultas.consultaAdmins().subscribe((users:any)=>{
      console.log("usuarios: ",users);
      this.usuarios=users;
    });
  }
  async nuevoUsr(){
    this.modalCtrl.dismiss();
    const nuevousr= await this.modalCtrl.create({
      component:NuevousrPage,
      componentProps:[]
    });
    await nuevousr.present();
  }
  async borraUsr(usr){
    const alerta=await this.alertCtrl.create({
      header:"Está seguro de Borrar a " + usr.nombre + "????",
      subHeader:"Si no está seguro aprete Cancelar",
      message:"",
      buttons:[
        {
          text:"Cancelar",
          role:"cancel",
          handler:(blah)=>{
            this.mislide.closeSlidingItems();
          }
        },
        {
          text:"Borrar",
          handler:(res)=>{
            this.consultas.borraUsr(usr.id).subscribe((dato:any)=>{
              let index=this.usuarios.indexOf(usr);
              this.usuarios.splice(index,1);
            });
          }
        }

      ]
    });
    await alerta.present();
    
  }
}
