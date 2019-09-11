import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ConsultasService } from '../service/consultas.service';
import { HttpClientModule } from '@angular/common/http';
import { ModaleventoPage } from './modalevento/modalevento.page';
import { AdminPage } from './admin/admin.page';
import { NuevousrPage } from './nuevousr/nuevousr.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage,ModaleventoPage,AdminPage,NuevousrPage],
  entryComponents:[ModaleventoPage,AdminPage,NuevousrPage],
  providers:[ConsultasService,ModaleventoPage,AdminPage,NuevousrPage]
})
export class HomePageModule {}
