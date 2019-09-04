import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultasService } from '../service/consultas.service';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';

@Component({
  selector: 'app-unevento',
  templateUrl: './unevento.page.html',
  styleUrls: ['./unevento.page.scss'],
})
export class UneventoPage implements OnInit {
  @ViewChild("mislide",{static:false}) mislide:IonList;
  id:string;
  nombre:string;
  desc:string;
  reuniones:any;
  hoy:Date;
  constructor(private alertCtrl:AlertController, private activatedRoute:ActivatedRoute,private consultas:ConsultasService,private modalCtrl:ModalController) { }

  ngOnInit() {

  }
  ionViewWillEnter(){
    this.hoy=new Date();
    console.log("hoy: ",this.hoy.getDate().toString().concat("-").concat((this.hoy.getMonth()+1).toString()).concat("-").concat(this.hoy.getFullYear().toString()));
    this.id=this.activatedRoute.snapshot.paramMap.get("id");
    console.log("id: ",this.id);
    this.consultas.consultaUnEvento(this.id).subscribe((data:any)=>{
      this.nombre=data.nombre;
      this.desc=data.descripcion;
      console.log("data.nombre: ",data.nombre);
    });
    this.consultas.consultaReuniones(this.id).subscribe((data:any)=>{
      console.log("data: ",data);
      this.reuniones=data;
    });
  }
  async borraunareunion(uno){
    const alerta=await this.alertCtrl.create({
      header:"Está seguro de BORRAR a",
      subHeader:uno.nombre.concat(" de la lista de Reuniones???"),
      message:"Se eliminarán también los registros de asistencia pertenecientes a esta reunión. Si no está seguro aprete Cancelar",
      buttons:[
        {
          text:"Cancelar",
          role:"cancel",
          handler:(blah)=>{
            // console.log("apretó cancelar");
            this.mislide.closeSlidingItems();
          }
        },
        {
          text:"Borrar",
          handler:(blah)=>{
            this.consultas.borrarReunion(uno.id).subscribe((data)=>{
              // location.reload();
              let index=this.reuniones.indexOf(uno);
              this.reuniones.splice(index,1);
            });
          }
        }
      ]
    });
    alerta.present();
  }
  async cambiaEstadoReunion(reunion){
    console.log("estado reunion: ",reunion.estado);
    const modal= await this.modalCtrl.create({
      component:ModalPage,
      componentProps:
        {
          antiguo:reunion.estado
        }
      
    });
    modal.onDidDismiss().then((datos)=>{
      if(datos.data!="cancelado"){
        this.consultas.actualizaEstadoReunion(reunion.id,datos.data).subscribe((dato:any)=>{
          reunion.estado=datos.data;
        });
      }
      this.mislide.closeSlidingItems();
    });
    await modal.present();

  }
  
}
