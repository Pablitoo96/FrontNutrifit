import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CrearAlimento } from 'src/app/models/crearalimento';
import { AlimentosService } from 'src/app/services/alimentos.service';

@Component({
  selector: 'app-registrar-alimento',
  templateUrl: './registrar-alimento.component.html',
  styleUrls: ['./registrar-alimento.component.scss'],
})
export class RegistrarAlimentoComponent implements OnInit {
  alimento: any = {
    nombre: '',
    informacion_nutricional:{
    calorias: 0,
    proteinas: 0,
    carbohidratos: 0,
    grasas: 0
    }
  };

  constructor(private alimentosService: AlimentosService,private modalController: ModalController) {}

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }

  registrarAlimento() {
    this.alimentosService.crearAlimento(this.alimento).subscribe(
      (response) => {
        // Manejar la respuesta del servidor si es necesario
        console.log('Alimento creado:', response);
      },
      (error) => {
        // Manejar errores
        console.error('Error al crear alimento:', error);
      }
    );
  }
}