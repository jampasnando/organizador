import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultasService } from '../service/consultas.service';
import { GLOBAL } from '../service/global';
import { IonInput } from '@ionic/angular';
@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
@ViewChild("login",{static:true}) private login:IonInput
  password:string;
  constructor(private router:Router,private consultas:ConsultasService) { }

  ngOnInit() {
    
  }
  ionViewDidEnter(){
    this.login.setFocus();
    // setTimeout(()=>{this.login.setFocus()},1500);
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
