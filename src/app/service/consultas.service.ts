import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from './global';
@Injectable({
  providedIn: 'root'
})
export class ConsultasService {
  servidor:string=GLOBAL.urlserver;
  constructor(private httpClient:HttpClient) { }
  enviaFormNuevoEv(datos:any):Observable<any>{
    // console.log("recibido en consultas: ",datos);
    const params:FormData=new FormData();
    params.append('nombre',datos.nombre);
    params.append('descripcion',datos.descripcion);
    params.append('estado',datos.estado);
    params.append("consulta","recibeformnuevoev");
    // console.log("parametros: ",params);
    return this.httpClient.post<any>(this.servidor,params);
  }
  enviaFormNuevaReunion(formu:any,fechax,horax,id):Observable<any>{
    console.log("servicio nueva reunion recibe: ",formu.value.nombre);
    const params:FormData=new FormData();
    params.append("nombre",formu.value.nombre);
    params.append("lugar",formu.value.lugar);
    params.append("fecha",fechax);
    params.append("horainicio",horax);
    params.append("duracion",formu.value.duracion);
    params.append("tiqueos",formu.value.tiqueos);
    params.append("instrucciones",formu.value.instrucciones);
    params.append("docs",formu.value.docs);
    params.append("estado",formu.value.estado);
    params.append("id",id);
    params.append("consulta","recibeformnuevareunion");

    return this.httpClient.post<any>(this.servidor,params);
  }
  consultaEventos(){
    const params:FormData=new FormData();
    params.append("consulta","listaeventos");
    return this.httpClient.post<any>(this.servidor,params);
  }
  consultaUnEvento(id){
    const params:FormData= new FormData();
    params.append("id",id);
    params.append("consulta","consultaunev");
    return this.httpClient.post<any>(this.servidor,params);
  }
  consultaReuniones(idevento){
    const params:FormData=new FormData();
    params.append("idevento",idevento);
    params.append("consulta","consultareuniones");
    return this.httpClient.post<any>(this.servidor,params);
  }
  consultaUnaReunion(idreunion){
    const params:FormData=new FormData();
    params.append("idreunion",idreunion);
    params.append("consulta","consultaunareunion");
    return this.httpClient.post<any>(this.servidor,params);
  }
  consultaEmpleados(idreunion){
    const params:FormData=new FormData();
    params.append("idreunion",idreunion);
    params.append("consulta","consultaempleados");
    return this.httpClient.post<any>(this.servidor,params);
  }
  consultaconvocadostiqueo(idreunion,nrotiq){
    const params:FormData=new FormData();
    params.append("idreunion",idreunion);
    params.append("nrotiq",nrotiq);
    params.append("consulta","consultaconvocadostiqueo");
    return this.httpClient.post<any>(this.servidor,params);
  }
  enviaConvocados(lista,idreunion){
    const params:FormData=new FormData();
    params.append("lista",JSON.stringify(lista));
    params.append("idreunion",idreunion);
    params.append("consulta","recibelistaconvocados");
    return this.httpClient.post<any>(this.servidor,params);
  }
  consultaConvocados(idreunion){
    const params:FormData=new FormData();
    params.append("idreunion",idreunion);
    params.append("consulta","consultaconvocados");
    return this.httpClient.post<any>(this.servidor,params);
  }
  borrarConvocado(ci,idreunion){
    const params:FormData=new FormData();
    params.append("ci",ci);
    params.append("idreunion",idreunion);
    params.append("consulta","borraconvocado");
    return this.httpClient.post<any>(this.servidor,params);
  }
  envialistamarcas(listamarcas,idreunion){
    const params:FormData=new FormData();
    params.append("lista",JSON.stringify(listamarcas));
    params.append("idreunion",idreunion);
    params.append("consulta","recibelistamarcas");
    return this.httpClient.post<any>(this.servidor,params);
  }
  borrarReunion(idreunion){
    console.log("enviará para borrar reunion: ",idreunion);
    const params:FormData=new FormData();
    params.append("idreunion",idreunion);
    params.append("consulta","borrareunion");
    return this.httpClient.post<any>(this.servidor,params);
  }
  borraEvento(idevento){
    const params:FormData= new FormData();
    params.append("idevento",idevento);
    params.append("consulta","borraevento");
    return this.httpClient.post<any>(this.servidor,params);
  }
  actualizaEstadoEv(idevento,estado){
    const params:FormData=new FormData();
    params.append("idevento",idevento);
    params.append("estado",estado);
    params.append("consulta","actualizaestadoev");
    return this.httpClient.post<any>(this.servidor,params);
  }
  actualizaEstadoReunion(idreunion,estado){
    const params:FormData=new FormData();
    params.append("idreunion",idreunion);
    params.append("estado",estado);
    params.append("consulta","actualizaestadoreunion");
    return this.httpClient.post<any>(this.servidor,params);
  }
  obtienedatosreunion(idreunion){
    console.log("consultas service recibe idreunion: ",idreunion);
    const params:FormData=new FormData();
    params.append("idreunion",idreunion);
    params.append("consulta","obtienedatosreunion");
    return this.httpClient.post<any>(this.servidor,params);
  }
}
  
