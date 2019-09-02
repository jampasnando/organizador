import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ConsultasService } from '../service/consultas.service';
import { HttpClientModule } from '@angular/common/http';
import { ModaleventoPage } from './modalevento/modalevento.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage,ModaleventoPage],
  entryComponents:[ModaleventoPage],
  providers:[ConsultasService,ModaleventoPage]
})
export class HomePageModule {}
