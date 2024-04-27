import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosRegistroPage } from './datos-registro.page';

const routes: Routes = [
  {
    path: '',
    component: DatosRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosRegistroPageRoutingModule {}
