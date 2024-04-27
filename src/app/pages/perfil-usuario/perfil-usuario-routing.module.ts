import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilUsuarioPage } from './perfil-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilUsuarioPage,

    children:[
      {
        path: 'informacion',
        loadChildren: () => import('../../pages/tabs-user-pages/informacion/informacion.module').then( m => m.InformacionPageModule)
      },
      {
        path: 'estadisticas',
        loadChildren: () => import('../../pages/tabs-user-pages/estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../../pages/tabs-user-pages/user/user.module').then( m => m.UserPageModule)
      },

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilUsuarioPageRoutingModule {}
