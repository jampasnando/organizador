import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'nuevoevento', loadChildren: './nuevoevento/nuevoevento.module#NuevoeventoPageModule' },
  { path: 'unevento/:id', loadChildren: './unevento/unevento.module#UneventoPageModule' },
  { path: 'nuevareunion/:id', loadChildren: './nuevareunion/nuevareunion.module#NuevareunionPageModule' },
  { path: 'unareunion/:idreunion', loadChildren: './unareunion/unareunion.module#UnareunionPageModule' },
  { path: 'nuevoasistente/:idreunion/:nrotiq', loadChildren: './nuevoasistente/nuevoasistente.module#NuevoasistentePageModule' },
  { path: 'convocados/:idreunion', loadChildren: './convocados/convocados.module#ConvocadosPageModule' },
  { path: 'convocados2', loadChildren: './convocados2/convocados2.module#Convocados2PageModule' },
  { path: 'editareunion/:idreunion', loadChildren: './unevento/editareunion/editareunion.module#EditareunionPageModule' },
  { path: 'editaevento/:idevento', loadChildren: './home/editaevento/editaevento.module#EditaeventoPageModule' },
  // { path: 'modalevento', loadChildren: './home/modalevento/modalevento.module#ModaleventoPageModule' },
  // { path: 'modal', loadChildren: './unevento/modal/modal.module#ModalPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
