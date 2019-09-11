import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IngresoPage } from './ingreso.page';
import { HttpClientModule } from '@angular/common/http';
import { ConsultasService } from '../service/consultas.service';

const routes: Routes = [
  {
    path: '',
    component: IngresoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IngresoPage],
  providers:[ConsultasService]
})
export class IngresoPageModule {}
