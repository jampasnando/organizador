import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Convocados2Page } from './convocados2.page';
import { HttpClientModule } from '@angular/common/http';
import { ConsultasService } from '../service/consultas.service';

const routes: Routes = [
  {
    path: '',
    component: Convocados2Page
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
  declarations: [Convocados2Page],
  providers:[ConsultasService]
})
export class Convocados2PageModule {}
