import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlimentosService } from '../../services/alimentos.service';
import { CrearAlimento } from '../../models/crearalimento';
import { AddAlimentoModalComponent } from '../add-alimento-modal/add-alimento-modal.component';
import { ModalService } from 'src/app/services/modal-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {
  alimentos: CrearAlimento[] = []; // Lista de alimentos
  alimentosFiltrados: CrearAlimento[] = []; // Lista de alimentos filtrados
  filtro: string = ''; // Variable para almacenar el valor del filtro

  constructor(
    private modalController: ModalController,
    private alimentosService: AlimentosService, // Inyecta el servicio de alimentos
    private modalService: ModalService,
    private router: Router
  ) {}

  ngOnInit() {
    // Llama al método del servicio para obtener los alimentos
    this.alimentosService.obtenerAlimentos().subscribe(
      (response: any) => {
        this.alimentos = response; // Guarda los alimentos en la variable alimentos
        this.alimentosFiltrados = response;
      },
      (error: HttpErrorResponse ) => {
        // Maneja el error, por ejemplo, muestra un mensaje al usuario
      }
    );
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  async abrirAddAlimentoModal(alimento: CrearAlimento) {
    const modal = await this.modalController.create({
      component: AddAlimentoModalComponent, // Componente del segundo modal
      componentProps: {
        alimento
      }
    });

    modal.onDidDismiss().then(() => {
      this.modalService.modalClosed.emit();
    });

    return await modal.present();
  }

  filtrarAlimentos() {
    if (this.filtro.trim() === '') {
      // Si el filtro está vacío, muestra todos los alimentos
      this.alimentosFiltrados = this.alimentos;
    } else {
      // Aplica el filtro normalmente, asegurándote de convertir todo a minúsculas para una comparación sin distinción entre mayúsculas y minúsculas
      this.alimentosFiltrados = this.alimentos.filter(alimento =>
        alimento.nombre.toLowerCase().includes(this.filtro.toLowerCase())
      );
    }
  }

}
