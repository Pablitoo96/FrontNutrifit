import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Crearusuario } from 'src/app/models/crearUsuario';
import { CrearAlimento } from 'src/app/models/crearalimento';
import { AlimentosService } from 'src/app/services/alimentos.service';
import { ConsumoService } from 'src/app/services/consumo.service';
import { UsuariosService } from 'src/app/services/usuarios-service.service';
import Chart, { ChartConfiguration } from 'chart.js/auto';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage {

  user: Crearusuario | undefined;
  caloriasRecomendadas: number = 2000;
  infoSemana: any;

  constructor(private consumoService:ConsumoService, private usuarioService: UsuariosService, private renderer: Renderer2) { }

  ionViewWillEnter() {
    this.obtenerUsuario();
  }

  obtenerUsuario(){
    this.usuarioService.getUserByEmail(localStorage.getItem("username")!).subscribe(user => {
      this.user = user;
     this.cargarCaloriasTotales(user._id);
     this.calcularCaloriasRecomendadas();
     this.modificarEstiloTitulo()
    })
  }

  cargarCaloriasTotales(usuarioId: string) {
    this.consumoService.obtenerTotalCaloriasPorUsuario(usuarioId).subscribe({
      next: (response) => {
        this.infoSemana = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener las calorías totales:', error);
      }
    });
  }

  calcularCaloriasRecomendadas(){
    let resultado = 2000;
    if(this.user?.sexo === 'masculino'){
      console.log(this.user)
      resultado=88.362+(13.397*this.user.peso!)+(4.799*this.user.altura!)-(5.677*this.user.edad!);
    }else{
      resultado=447.593+(9.247*this.user!.peso!)+(3.098*this.user!.altura!)-(4.330*this.user!.edad!)
    }
    this.caloriasRecomendadas = resultado;
  }

  modificarEstiloTitulo() {
    const toolbarTitle = document.querySelector('ion-title')!.shadowRoot!.querySelector('.toolbar-title');
    this.renderer.setStyle(toolbarTitle, 'overflow', 'initial');
  }
  

}
