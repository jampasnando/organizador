import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultasService } from '../service/consultas.service';
import { AlertController, IonList } from '@ionic/angular';
@Component({
  selector: 'app-unareunion',
  templateUrl: './unareunion.page.html',
  styleUrls: ['./unareunion.page.scss'],
})
export class UnareunionPage implements OnInit {
  @ViewChild("mislide",{static:false}) mislide:IonList;
  nombrereunion:string;
  lugar:string;
  fecha:string;
  hora:string;
  duracion:string;
  instrucciones:string;
  docs:string;
  cantidad:any;
  convocados:any;
  tiqueos=[];
  idreunion:string;
  // tiqueos:number[];
  constructor(private activatedRoute:ActivatedRoute, private consultas: ConsultasService,private alertCtrl:AlertController) { }
  
  ngOnInit() {
    this.idreunion=this.activatedRoute.snapshot.paramMap.get("idreunion");
    console.log("reunion: ",this.idreunion);
    this.consultas.consultaUnaReunion(this.idreunion).subscribe((data:any)=>{
      this.nombrereunion=data.nombre;
      this.lugar=data.lugar;
      this.fecha=data.fecha;
      this.hora=data.horainicio;
      this.duracion=data.duracion;
      this.instrucciones=data.instrucciones;
      this.docs=data.docs;
      
      console.log("nro tiqueos: ",data.tiqueos);
      for(let k=0;k<data.tiqueos;k++){
        this.tiqueos.push(k+1);
        // console.log("ciclo for k: ",this.tiqueos[k]);
      }
      console.log("datosunareunion: ",data);
    });
  }
  ionViewWillEnter(){
    console.log("idreunion enviado a la bd: ",this.idreunion);
    this.consultas.consultaConvocados(this.idreunion).subscribe((data:any)=>{
      // console.log(data);
      this.convocados=data;
      this.cantidad=data.length;
      for(let xx of this.convocados){
        xx.hora_registro=JSON.parse(xx.hora_registro);
      }
    });
  }
  async borraConvocado(uno){
    const alerta=await this.alertCtrl.create({
      header:"Está seguro de BORRAR a",
      subHeader:uno.nombre.concat(" de la lista de Convocados???"),
      message:"Si no está seguro aprete Cancelar",
      buttons:[
        {
          text:"Cancelar",
          role:"cancel",
          handler:()=>{
            this.mislide.closeSlidingItems();
          }
        },
        {
          text:"Aceptar",
          handler:(blah)=>{
            this.consultas.borrarConvocado(uno.ci,this.idreunion).subscribe((data)=>{
              // location.reload();
              let index=this.convocados.indexOf(uno);
              this.convocados.splice(index,1);
            });
          }
        }
      ]
    });
    alerta.present();
  }
  
}
