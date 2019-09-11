import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultasService } from '../service/consultas.service';
import { AlertController, IonList, ModalController } from '@ionic/angular';
import { ModalPage } from './modal/modal.page';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { GLOBAL }  from '../service/global';
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
  elrol=GLOBAL.usuariorol;
  constructor(private alertCtrl:AlertController, private activatedRoute:ActivatedRoute,private consultas:ConsultasService,private modalCtrl:ModalController, private transfer:FileTransfer, private file:File) { }

  ngOnInit() {
    console.log("usr: ",GLOBAL);
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
  reportecsv(idreunion){
    let hoy=new Date();
    let ano=hoy.getFullYear().toString();
    let mes=(1+hoy.getMonth()).toString();
    let dia=hoy.getDate().toString();
    let hora=hoy.getHours().toString();
    let min=hoy.getMinutes().toString();
    if(mes.length==1){mes="0"+mes};
    if(dia.length==1){dia="0"+dia};
    if(hora.length==1){hora="0"+hora};
    if(min.length==1){min="0"+min};
    let marca=dia + "_" +mes + "_" +ano + "_" +hora + "_" +min;
    
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = GLOBAL.urlcsv.concat("exportasistencias.php?idreunion=").concat(idreunion).concat("&").concat(hoy.getTime().toString());
    console.log("direccion: ",url);
    fileTransfer.download(url, this.file.externalRootDirectory + 'Organizador/asistencias_'+marca+'.csv').then((entry) => {
      alert("Descargado a carpeta Organizador en tu Dispositivo");
    }, (error) => {
      alert("Error al descargar archivo");
    });
    this.mislide.closeSlidingItems();
  }
}
