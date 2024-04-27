import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConsumoAlimentos } from '../../models/consumoalimentos';
import { CrearAlimento } from 'src/app/models/crearalimento';
import { UsuariosService } from 'src/app/services/usuarios-service.service';
import { ConsumoService } from 'src/app/services/consumo.service';
import { Router } from '@angular/router';
import { ModalPageComponent } from '../alimentos-modal/modal-page.component';

@Component({
  selector: 'app-add-alimento-modal',
  templateUrl: './add-alimento-modal.component.html',
  styleUrls: ['./add-alimento-modal.component.scss'],
})
export class AddAlimentoModalComponent implements OnInit {

  @Input() alimento: CrearAlimento = {
    informacion_nutricional: {
      calorias: 0,
      carbohidratos: 0,
      grasas: 0,
      proteinas: 0,
    },
    nombre: "platano",
    _id: "id"
  };

  gramos: number | undefined;
  consumoAlimentoModal: ConsumoAlimentos = {
    consumo_alimentos: [],
  };
  caloriasTotales: number | undefined;
  carbohidratosTotales: number | undefined;
  grasasTotales: number | undefined;
  proteinasTotales: number | undefined;

  constructor(private modalController: ModalController, private usuarioService: UsuariosService, private consumoService: ConsumoService) {}

  ngOnInit() {
    this.calcularTotales();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  calcularTotales() {
    if (this.alimento && this.alimento.informacion_nutricional) {
      this.caloriasTotales = (this.alimento.informacion_nutricional.calorias * (this.gramos || 100)) / 100;
      this.carbohidratosTotales = (this.alimento.informacion_nutricional.carbohidratos * (this.gramos || 100)) / 100;
      this.grasasTotales = (this.alimento.informacion_nutricional.grasas * (this.gramos || 100)) / 100;
      this.proteinasTotales = (this.alimento.informacion_nutricional.proteinas * (this.gramos || 100)) / 100;
    } else {
      this.caloriasTotales = 0;
      this.carbohidratosTotales = 0;
      this.grasasTotales = 0;
      this.proteinasTotales = 0;
    }
  }



    async guardarAlimento() {
      // Obtener el usuario por su correo electrónico
      const correoUsuario = localStorage.getItem("username");
      const usuario = await this.usuarioService.getUserByEmail(correoUsuario!).toPromise();
  
      // Verificar si se encontró el usuario
      if (!usuario) {
        console.error('Usuario no encontrado');
        return;
      }
  
      // Aquí puedes utilizar usuario._id y alimento._id para guardar el consumo
  
      // Ejemplo de cómo se podría guardar el consumo
      const consumo = {
        usuario_id: usuario._id,
        fecha: new Date(),
        consumo_alimentos: [
          {
            alimento_id: this.alimento._id, // Suponiendo que alimento tiene un _id
            cantidad_gramos: this.gramos || 0
          }
        ]
      };
  

       // Llama al servicio para crear el consumo
    this.consumoService.crearConsumo(consumo).subscribe(
      response => {
        console.log('Consumo guardado exitosamente:', response);
        this.cerrarModal();
        // Aquí puedes manejar cualquier lógica adicional después de guardar el consumo
      },
      error => {
        console.error('Error al guardar el consumo:', error);
        // Aquí puedes manejar cualquier error que ocurra durante la creación del consumo
      }
    );


      // Lógica para guardar el consumo, probablemente llamarías a un servicio para esto
      console.log('Guardando consumo:', consumo);
    }
  
  
}
