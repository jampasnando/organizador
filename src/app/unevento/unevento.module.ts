import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UneventoPage } from './unevento.page';
import { ConsultasService } from '../service/consultas.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalPage } from './modal/modal.page';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

const routes: Routes = [
  {
    path: '',
    component: UneventoPage
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
  declarations: [UneventoPage,ModalPage],
  providers:[ConsultasService,ModalPage,File,FileTransfer],
  entryComponents:[ModalPage]
})
export class UneventoPageModule {}
