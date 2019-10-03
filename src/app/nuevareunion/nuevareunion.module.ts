import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NuevareunionPage } from './nuevareunion.page';
import { ConsultasService } from '../service/consultas.service';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: NuevareunionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NuevareunionPage],
  providers:[ConsultasService]
})
export class NuevareunionPageModule {}
