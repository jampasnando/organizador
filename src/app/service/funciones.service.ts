import { Injectable } from '@angular/core';
import { ConsultasService } from './consultas.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionesService {

  constructor(private consultas:ConsultasService) { }
  recibeDatosFormu(formu){
    console.log("recibiendo datos...");
    console.log(formu);
    this.consultas.enviaFormNuevoEv(formu);
  }
  
}
