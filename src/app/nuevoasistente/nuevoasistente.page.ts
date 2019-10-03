import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultasService } from '../service/consultas.service';
import { AlertController,IonSearchbar } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from '../service/global';
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
  nroxaenviar=0;
  public searchTerm: string = "";
  public items: any;
  listamarcas:Listamarcas[]=[];
  pornombre="primary";
  poritem="medium";
  porci="medium";
  porcargo="medium";
  activo="nombre";
  tiqueador=GLOBAL.usuarionombre;
  constructor(private consultas: ConsultasService, private alertCtrl:AlertController, private activatedRoute:ActivatedRoute,private router:Router) {
    
   }

  ngOnInit() {
    console.log("tiqueador",this.tiqueador);
    this.idreunion=this.activatedRoute.snapshot.paramMap.get("idreunion");
    this.nrotiq=this.activatedRoute.snapshot.paramMap.get("nrotiq");
    this.consultaConvocados();
    
  }
  consultaConvocados(){
    this.consultas.consultaconvocadostiqueo(this.idreunion,this.nrotiq).subscribe((data:any)=>{
      // console.log("datostiqueo: ",data);
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
      console.log("empleados: ",this.empleados);
      this.empleados2=this.empleados;
    });
  }
  onViewCanLeave(){
    console.log("onviecanleave");
  }
  vecheck(item,unemp){
    console.log(item.srcElement);
    console.log("tiempo: ",unemp.marcador);
    if(unemp.marcador==""){
      this.tiempo=new Date();
      let horas=this.tiempo.getHours()<10?"0"+this.tiempo.getHours().toString():this.tiempo.getHours().toString();
      let mins=this.tiempo.getMinutes()<10?"0"+this.tiempo.getMinutes().toString():this.tiempo.getMinutes().toString();
      unemp.marcador=horas.concat(":").concat(mins);
      // this.searchTerm="";
      // this.buscador.setFocus();
      this.nroxaenviar++;
      
    }
    else{
      this.confirmaBorrar(unemp);
      
    }
  }
  public clickbuscador(evento):void{
    evento.srcElement.select();
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
            this.nroxaenviar--;
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
       if(this.activo=="nombre"){
        return item.nombre.toLowerCase().indexOf(searchTerm.toLowerCase()) ==0;
       }
       if(this.activo=="item"){
        return item.item.toLowerCase().indexOf(searchTerm.toLowerCase()) ==0;
       }
       if(this.activo=="ci"){
        return item.ci.toLowerCase().indexOf(searchTerm.toLowerCase()) ==0;
       }
       if(this.activo=="cargo"){
        return item.cargo.toLowerCase().indexOf(searchTerm.toLowerCase()) ==0;
       }
      });
    }
    else {
      return this.empleados2;
    }
  }
  async guardatiqueos(){
    const alertax=await this.alertCtrl.create({
      header:"Enviando...",
    });
    alertax.present();
    
    for(let yy of this.empleados){
      if(yy.marcador!=""){
        for(let zz in yy.hora_registro){
          var indice="t".concat(this.nrotiq);
          if(zz==indice){
            yy.hora_registro[zz]=yy.marcador;
            this.listamarcas.push({ci:yy.ci,nuevamarca:yy.hora_registro,indicex:this.empleados.indexOf(yy)});
          }
          // console.log(yy.marcador, " ciclo for zz: ", yy.hora_registro);
        }
        
      }
    }
    this.consultas.envialistamarcas(this.listamarcas,this.idreunion,this.tiqueador,this.nrotiq).subscribe((data:any)=>{
      this.consultaConvocados();
      this.nroxaenviar=0;
      this.alertCtrl.dismiss();
    });
  }
  criterio(campo){
    console.log("campo: ",campo);
    if(campo=="nombre"){
      this.pornombre="primary";
      this.poritem="medium";
      this.porci="medium";
      this.porcargo="medium";
      this.activo="nombre";
    }
    if(campo=="item"){
      this.pornombre="medium";
      this.poritem="primary";
      this.porci="medium";
      this.porcargo="medium";
      this.activo="item";
    }
    if(campo=="ci"){
      this.pornombre="medium";
      this.poritem="medium";
      this.porci="primary";
      this.porcargo="medium";
      this.activo="ci";
    }
    if(campo=="cargo"){
      this.pornombre="medium";
      this.poritem="medium";
      this.porci="medium";
      this.porcargo="primary";
      this.activo="cargo";
    }
    this.searchTerm="";
    this.buscador.setFocus();

  }
}
interface Listamarcas{
  ci:string;
  nuevamarca:string;
  indicex:number;
}