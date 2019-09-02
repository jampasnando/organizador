import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultasService } from '../service/consultas.service';
import { AlertController,IonSearchbar } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nuevoasistente',
  templateUrl: './nuevoasistente.page.html',
  styleUrls: ['./nuevoasistente.page.scss'],
})
export class NuevoasistentePage implements OnInit {
  @ViewChild("buscador",{static: true}) private buscador:IonSearchbar;
  idreunion:string;
  empleados:any;
  empleados2:any;
  tiempo:Date;
  marca:string;
  nrotiq:string;
  public searchTerm: string = "";
  public items: any;
  listamarcas:Listamarcas[]=[];
  constructor(private consultas: ConsultasService, private alertCtrl:AlertController, private activatedRoute:ActivatedRoute,private router:Router) {
    
   }

  ngOnInit() {
    this.idreunion=this.activatedRoute.snapshot.paramMap.get("idreunion");this.nrotiq=this.activatedRoute.snapshot.paramMap.get("nrotiq");
    this.consultas.consultaconvocadostiqueo(this.idreunion,this.nrotiq).subscribe((data:any)=>{
      console.log("datostiqueo: ",data);
      var sortByProperty = function (property) {
        return function (x, y) {
            return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
        };
      };
      this.empleados=data.sort(sortByProperty('nombre'));
      for(let xx of this.empleados){
        xx.marcador="";
        xx.hora_registro=JSON.parse(xx.hora_registro);
      }
      this.empleados2=this.empleados;
    });
    
  }
  vecheck(item,unemp){
    console.log(item.srcElement);
    console.log("tiempo: ",unemp.marcador);
    if(unemp.marcador==""){
      this.tiempo=new Date();
      let horas=this.tiempo.getHours()<10?"0"+this.tiempo.getHours().toString():this.tiempo.getHours().toString();
      let mins=this.tiempo.getMinutes()<10?"0"+this.tiempo.getMinutes().toString():this.tiempo.getMinutes().toString();
      unemp.marcador=horas.concat(":").concat(mins);
      // unemp.marcador=this.tiempo.toLocaleTimeString();
      // unemp.marcador=this.tiempo.getHours().toString().concat(":").concat(this.tiempo.getMinutes().toString());
      this.buscador.setFocus();
      // document.getElementById("buscador").focus;
    }
    else{
      this.confirmaBorrar(unemp);
      
    }
  }
  async confirmaBorrar(aux){
    const alerta=await this.alertCtrl.create({
      header:"Está seguro de Borrar la asistencia de:",
      subHeader:aux.nombre.concat("???"),
      message:"Aprete Cancelar si no está seguro",
      buttons:[
        {
          text:"Cancelar",
          role:"cancel",
          cssClass:"primary",
          
        },
        {
          text:"Borrar",
          cssClass:"peligro",
          handler:(blah)=>{
            aux.marcador="";
            this.buscador.setFocus();
          }
        }
      ]
    });
    alerta.present();
  }
  setFilteredItems() {
    
    this.empleados = this.filterItems(this.searchTerm);
  }
  filterItems(searchTerm) {
    if(searchTerm!=""){
      return this.empleados2.filter(item => {
        return item.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) ==0;
      });
    }
    else {
      return this.empleados2;
    }
  }
  guardatiqueos(){
    for(let yy of this.empleados){
      if(yy.marcador!=""){
        for(let zz in yy.hora_registro){
          var indice="t".concat(this.nrotiq);
          if(zz==indice){
            yy.hora_registro[zz]=yy.marcador;
            this.listamarcas.push({ci:yy.ci,nuevamarca:yy.hora_registro});
          }
          // console.log(yy.marcador, " ciclo for zz: ", yy.hora_registro);
        }
        
      }
    }
    console.log("listamarcadores: ",this.listamarcas);
    this.consultas.envialistamarcas(this.listamarcas,this.idreunion).subscribe((data:any)=>{
      console.log("listamarcas guardado en bd",data);
      let url="/unareunion/".concat(this.idreunion);
      this.router.urlUpdateStrategy="eager";
      this.router.navigateByUrl(url);
    });
  }
}
interface Listamarcas{
  ci:string;
  nuevamarca:string;
}