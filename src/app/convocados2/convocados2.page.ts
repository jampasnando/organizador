import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultasService } from '../service/consultas.service';
import { AlertController,IonSearchbar } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-convocados2',
  templateUrl: './convocados2.page.html',
  styleUrls: ['./convocados2.page.scss'],
})
export class Convocados2Page implements OnInit {
  @ViewChild("buscador",{static: true}) private buscador:IonSearchbar;
  empleados:any;
  empleados2:any;
  // convocado:string;
  yaconvocados:any;
  marca:string;
  idreunion:string;
  public searchTerm: string = "";
  public items: any;
  unconvocado:Convocados;
  convocados:Convocados[]=[];
  cargo:string="medium";
  unidad:string="primary";
  nombre:string="medium";
  nroconvocados=0;
  constructor(private consultas: ConsultasService, private alertCtrl:AlertController,consulta:ConsultasService,private activatedRoute:ActivatedRoute,private router:Router) {
    
   }

  ngOnInit() {
    this.idreunion=this.activatedRoute.snapshot.paramMap.get("idreunion");
    
  }
  ionViewWillEnter(){
    this.convocados=[];
    console.log("enviara idreunion a consultaempleados: ",this.idreunion);
    // this.obtieneEmpleados();
    this.nroconvocados=0;
    this.obtieneFuncionarios();
  }
  obtieneFuncionarios(){
    this.consultas.obtieneFuncionarios().subscribe((datos:any)=>{
      // console.log("funcionarios: ",datos.data);
      
      this.consultas.consultaConvocados(this.idreunion).subscribe((dataconv:any)=>{
        this.convocados=dataconv;
        for (let uno of datos.data){
          uno.convocado="";
          uno.unidad=uno.unidad.trim();

          for(let xx of this.convocados){
            if(uno.ci==xx.ci) {uno.convocado='yaconvocado';break;}
          }
          
        }
      });
      var sortByProperty = function (property) {
        return function (x, y) {
            return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
        };
      };
      this.empleados=datos.data.sort(sortByProperty('unidad'));
      this.empleados2=this.empleados;
      // this.buscador.setFocus();
    });
  }
  vecheck(item,unemp){
    console.log(item.srcElement);
    console.log("convocado: ",unemp.convocado);
    if(unemp.convocado==""){
      unemp.convocado="Convocar";
      this.nroconvocados++;
    }
    else{
      if(unemp.convocado!="yaconvocado"){
        unemp.convocado="";
        this.nroconvocados--;
      }
    }
    // this.buscador.setFocus();
  }
  chequea(evento,unidad){
    console.log("evento: ",evento.detail.checked);
    console.log("unidad: ",unidad);
    if(evento.detail.checked){
      for(let unempx of this.empleados){
        if(unempx.unidad==unidad && unempx.convocado==""){
          unempx.convocado="Convocar";
          this.nroconvocados++;
        }
      }
     
    }
    else{
      for(let unempx of this.empleados){
        if(unempx.unidad==unidad && unempx.convocado=="Convocar"){
          unempx.convocado="";
          this.nroconvocados--;
        }
      }
    }
  }
  async confirmaBorrar(aux){
    const alerta=await this.alertCtrl.create({
      header:"Está seguro de Borrar la convocatoria a:",
      subHeader:aux.empleado.concat("???"),
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
            aux.convocado="";
            this.nroconvocados--;
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
        return item.unidad.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        // return item.empleado.toLowerCase().indexOf(searchTerm.toLowerCase()) ==0;
      });
    }
    else {
      return this.empleados2;
    }
  }
  guardaconvocados(){
    this.convocados=[];
    this.searchTerm="";
    this.filterItems("");
    for(let unemp of this.empleados){
      if(unemp.convocado=="Convocar"){
        // console.log("unconvocado: ",unemp.empleado);
        this.unconvocado={
          "ci":unemp.ci,
          "item":unemp.item,
          "nombre":unemp.empleado,
          "cargo":unemp.cargo,
          "unidad":unemp.unidad
        }
        // console.log("unconvocado: ",this.unconvocado);
        this.convocados.push(this.unconvocado);
      }
    }
    // console.log("convocados: ",this.convocados);
    this.consultas.enviaConvocados(this.convocados,this.idreunion).subscribe((data:any)=>{
      // console.log("desde el server: ",data);
      let url="/unareunion/".concat(this.idreunion);
      this.router.urlUpdateStrategy="eager";
      this.router.navigateByUrl(url);
    });
    
  }
}
interface Convocados{
  ci:string;
  item:string;
  nombre:string;
  cargo:string;
  unidad:string;
}