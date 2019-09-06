import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsultasService } from '../service/consultas.service';
import { AlertController,IonSearchbar } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-convocados',
  templateUrl: './convocados.page.html',
  styleUrls: ['./convocados.page.scss'],
})
export class ConvocadosPage implements OnInit {
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
  unidad:string="medium";
  nombre:string="primary";
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
    this.obtieneFuncionarios();
  }
  obtieneFuncionarios(){
    this.consultas.obtieneFuncionarios().subscribe((datos:any)=>{
      console.log("funcionarios: ",datos.data);
      for (let uno of datos.data){
        uno.convocado='';
        uno.empleado=uno.empleado.trim();
      }
      console.log("func mas campo convocado: ",datos.data);
      var sortByProperty = function (property) {
        return function (x, y) {
            return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
        };
      };
      this.empleados=datos.data.sort(sortByProperty('empleado'));
      this.empleados2=this.empleados;
      this.buscador.setFocus();
    });
  }
  // obtieneEmpleados(){
  //   this.consultas.consultaEmpleados(this.idreunion).subscribe((data:any)=>{
  //     for (let uno of data){
  //       uno.convocado='';
  //       uno.employee_name=uno.employee_name.charAt(0).toUpperCase() + uno.employee_name.slice(1);
  //     }
  //     console.log("datos: ",data);
  //     var sortByProperty = function (property) {
  //       return function (x, y) {
  //           return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
  //       };
  //     };
  //     this.empleados=data.sort(sortByProperty('employee_name'));
  //     this.empleados2=this.empleados;
  //   });
  //   this.buscador.setFocus();
  // }
  vecheck(item,unemp){
    console.log(item.srcElement);
    console.log("convocado: ",unemp.convocado);
    if(unemp.convocado==""){
      // this.convocado="Convocar";
      unemp.convocado="Convocar";
      this.nroconvocados++;
      this.buscador.setFocus();
      // document.getElementById("buscador").focus;
    }
    else{
      this.confirmaBorrar(unemp);
      
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
        return item.empleado.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
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
      if(unemp.convocado!=""){
        console.log("unconvocado: ",unemp.empleado);
        this.unconvocado={
          "ci":unemp.ci,
          "item":unemp.item,
          "nombre":unemp.empleado,
          "cargo":unemp.cargo,
          "unidad":unemp.unidad
        }
        console.log("unconvocado: ",this.unconvocado);
        this.convocados.push(this.unconvocado);
      }
    }
    console.log("convocados: ",this.convocados);
    this.consultas.enviaConvocados(this.convocados,this.idreunion).subscribe((data:any)=>{
      console.log("desde el server: ",data);
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