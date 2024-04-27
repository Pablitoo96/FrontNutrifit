import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionPageRoutingModule } from './informacion-routing.module';

import { InformacionPage } from './informacion.page';
import { ModalPageComponent } from 'src/app/modals/alimentos-modal/modal-page.component';
import { AddAlimentoModalComponent } from 'src/app/modals/add-alimento-modal/add-alimento-modal.component';
import { RegistrarAlimentoComponent } from 'src/app/modals/registrar-alimento/registrar-alimento.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule, 
    InformacionPageRoutingModule
  ],
  declarations: [InformacionPage, ModalPageComponent, AddAlimentoModalComponent, RegistrarAlimentoComponent]
})
export class InformacionPageModule {}
