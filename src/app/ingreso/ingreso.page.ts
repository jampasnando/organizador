import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultasService } from '../service/consultas.service';
import { GLOBAL } from '../service/global';
import { Glob } from 'glob';
@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  password:string;
  constructor(private router:Router,private consultas:ConsultasService) { }

  ngOnInit() {
    
  }
  ingresar(){
    console.log(this.password);
    this.consultas.consultaCredenciales(this.password).subscribe((dato:any)=>{
      this.password="";
      console.log("nro usr: ",dato.length);
      console.log("usr desde server: ",dato);
      if(dato.length>=1){
        GLOBAL.usuarioci=dato[0].ci;
        GLOBAL.usuarionombre=dato[0].nombre;
        GLOBAL.usuariorol=dato[0].rol;
        console.log("global: ",GLOBAL);
        this.router.navigateByUrl("/home");
      }
    });

  }
}
