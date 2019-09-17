import { Component, ViewChild} from '@angular/core';
import { ConsultasService } from '../service/consultas.service';
import { AlertController, IonList, ModalController} from '@ionic/angular';
import { ModaleventoPage } from './modalevento/modalevento.page';
import { AdminPage } from './admin/admin.page';
import { GLOBAL } from '../service/global';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  datos:any;
  elrol=GLOBAL.usuariorol;
  @ViewChild("mislide",{static:false}) mislide:IonList;
  constructor(private consulta:ConsultasService,private alertCtrl:AlertController,private modalCtrl:ModalController) {}
  ngOnInit(){
    
  }
  ionViewWillEnter(){
    this.listaeventos();
  }
  listaeventos(){
    this.consulta.consultaEventos().subscribe((data:any)=>{
      this.datos=data;
      console.log(data);

    });
  }
  async borraEvento(uno){
    const alerta= await this.alertCtrl.create({
      header:"Está seguro de Borrar",
      subHeader:"El evento ".concat(uno.nombre).concat("???"),
      message:"Se borrarán TODAS LAS REUNIONES Y ASISTENTES QUE PERTENECEN A ESTE EVENTO. <br> Si no está seguro aprete Cancelar",
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
          handler:(blah)=>{
            // console.log("intentara borrar evento: ",uno.id);
            this.consulta.borraEvento(uno.id).subscribe((data:any)=>{
              let index=this.datos.indexOf(uno);
              this.datos.splice(index,1);
            });
          }
        }
      ]
    });
    alerta.present();
  }
  async cambiaEstadoEvento(evento){
    console.log("el modal abrirá con: ",evento);
    const modal= await this.modalCtrl.create({
      component:ModaleventoPage,
      componentProps:{
        estadoactual:evento.estado
      },
      
    });
    modal.onDidDismiss().then((datos)=>{
      if(datos.data=="abierto" || datos.data=="cerrado"){
        this.consulta.actualizaEstadoEv(evento.id,datos.data).subscribe((res:any)=>{
          evento.estado=datos.data;
        });
      }
     
      this.mislide.closeSlidingItems();
    });
    await modal.present();

  }
  async abreAdmin(){
    const modaladmin=await this.modalCtrl.create({
      component:AdminPage,
    });
    await modaladmin.present();
  }
}
