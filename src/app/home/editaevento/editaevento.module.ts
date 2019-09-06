import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditaeventoPage } from './editaevento.page';
import { HttpClientModule } from '@angular/common/http';
import { ConsultasService } from 'src/app/service/consultas.service';

const routes: Routes = [
  {
    path: '',
    component: EditaeventoPage
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
  declarations: [EditaeventoPage],
  providers:[ConsultasService]
})
export class EditaeventoPageModule {}
