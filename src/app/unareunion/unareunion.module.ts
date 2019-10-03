import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UnareunionPage } from './unareunion.page';
import { ConsultasService } from '../service/consultas.service';
import { HttpClientModule } from '@angular/common/http';
import { ComentarPage } from './comentar/comentar.page';

const routes: Routes = [
  {
    path: '',
    component: UnareunionPage
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
  declarations: [UnareunionPage,ComentarPage],
  providers:[ConsultasService,ComentarPage],
  entryComponents:[ComentarPage]
})
export class UnareunionPageModule {}
