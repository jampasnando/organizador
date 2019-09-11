import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NuevousrPage } from './nuevousr.page';
import { ConsultasService } from 'src/app/service/consultas.service';

const routes: Routes = [
  {
    path: '',
    component: NuevousrPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NuevousrPage],
  providers:[ConsultasService]
})
export class NuevousrPageModule {}
