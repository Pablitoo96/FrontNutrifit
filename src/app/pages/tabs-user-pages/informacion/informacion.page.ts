import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import { ModalPageComponent } from '../../../modals/alimentos-modal/modal-page.component';
import { ConsumoService } from 'src/app/services/consumo.service';
import { UsuariosService } from 'src/app/services/usuarios-service.service';
import { ConsumoAlimentos } from 'src/app/models/consumoalimentos';
import { AlimentosService } from 'src/app/services/alimentos.service';
import { CrearAlimento } from 'src/app/models/crearalimento';
import { ModalService } from 'src/app/services/modal-service.service';
import { RegistrarAlimentoComponent } from 'src/app/modals/registrar-alimento/registrar-alimento.component';
import { Crearusuario } from 'src/app/models/crearUsuario';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss'],
})
export class InformacionPage implements OnInit, AfterViewInit  {
  
  userForm!: FormGroup;
  openDatosPesonales: boolean = false;
  consumos: ConsumoAlimentos [] | undefined;
  alimentos: CrearAlimento[] | undefined;
  user: Crearusuario | undefined;
  caloriasRecomendadas: number = 2000;


  constructor(private formBuilder: FormBuilder,
    private modalController: ModalController,
    private consumoService: ConsumoService,
    private usuarioService:UsuariosService,
    private alimentosService: AlimentosService,
    private modalService: ModalService,
    private alertController: AlertController) { }

  @ViewChild('doughnutCanvas') private calorieCanvas: ElementRef | undefined;

  doughnutChart: Chart | undefined;



  //@ViewChild('doughnutCanvas') private doughnutCanvas: ElementRef<HTMLCanvasElement>;
  calorieChart: Chart | undefined;

  ngAfterViewInit() {
    const caloriesConsumed = this.calcularCaloriasConsumidas();  // Calorías consumidas
    const caloriesRemaining = this.caloriasRecomendadas - caloriesConsumed;  // Calorías restantes

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: ['Calorías Consumidas', 'Calorías Restantes'],
        datasets: [{
          data: [caloriesConsumed, caloriesRemaining],
          backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(2,	146,	32)'],  // Colores para cada sección
          hoverBackgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: true
          }
        }
      }
    };

    this.calorieChart = new Chart(this.calorieCanvas!.nativeElement, config);
  }

  
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      weight: [''],
      height: ['']
    });
    this.obtenerConsumosUsuarioDiaActual();
    this.registrarEventoModalCerrado();
    this.obtenerUsuario();
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
      // Aquí manejar la lógica de envío del formulario, como actualizar la información del usuario
    }
  }

  guardarCambiosDatosPersonales(){
    this.openDatosPesonales = false;
  }

  
  async abrirModal() {
    const modal = await this.modalController.create({
      component: ModalPageComponent,
    });
    return await modal.present();
  }

    
  async abrirModalRegistrarAlimento() {
    const modal = await this.modalController.create({
      component: RegistrarAlimentoComponent
    });
    return await modal.present();
  }

  registrarEventoModalCerrado() {
    this.modalService.modalClosed.subscribe(() => {
      console.log("cierro el modal")
      this.obtenerConsumosUsuarioDiaActual(); // Llama al método cuando se cierra el modal
      this.actualizarGrafico();
    });
  }

  async obtenerConsumosUsuarioDiaActual(){
  // Obtener el usuario por su correo electrónico
  const correoUsuario = localStorage.getItem("username");
  const usuario = await this.usuarioService.getUserByEmail(correoUsuario!).toPromise();

  // Verificar si se encontró el usuario
  if (!usuario) {
    console.error('Usuario no encontrado');
    return;
  }
      
  this.consumoService.obtenerConsumosPorUsuarioYFecha(usuario._id, new Date())
  .subscribe({
    next: (consumos) => {
      this.consumos = consumos;
      this.alimentosService.obtenerAlimentos().subscribe({
        next: (alimentos) => {
          this.alimentos = alimentos;
          console.log(this.alimentos)
          console.log(this.consumos)
          this.actualizarGrafico()
        }
        
      })
    },
    error: (error) => {
      console.error('Error al obtener consumos:', error);
    }
  });
    
  }

  buscarAlimentoPorId(id: string): CrearAlimento | undefined {
    return this.alimentos?.find(alimento => alimento._id === id);
  }

  obtenerNombreAlimento(alimentoId: string): string {
    if (!this.alimentos || !alimentoId) return '';
    
    const alimento = this.alimentos.find(a => a._id === alimentoId);
    return alimento ? alimento.nombre : '';
  }

 /* calcularCaloriasConsumidas(): number {
    let totalCalorias = 0;
    if (this.consumos && this.consumos.length > 0) {
      for (const consumo of this.consumos) {
        for (const consumoAlimento of consumo.consumo_alimentos) {
          for (const alimento of this.alimentos!)
          totalCalorias += consumoAlimento.cantidad_gramos; // Suponiendo que cantidad_gramos representa las calorías consumidas
        }
      }
    }
    return totalCalorias;
  }*/

  calcularCaloriasConsumidas(): number {
    let totalCalorias = 0;
    
    // Verifica si hay consumos y alimentos
    if (this.consumos && this.consumos.length > 0 && this.alimentos && this.alimentos.length > 0) {
      for (const consumo of this.consumos) {
        for (const consumoAlimento of consumo.consumo_alimentos) {
          // Encuentra el alimento correspondiente
          const alimento = this.alimentos.find(a => a._id === consumoAlimento.alimento_id);
          if (alimento) {
            // Suma las calorías consumidas multiplicando la cantidad de gramos por las calorías por gramo del alimento
            totalCalorias += consumoAlimento.cantidad_gramos * alimento.informacion_nutricional.calorias;
          }
        }
      }
    }
    
    return totalCalorias / 100;
  }

  actualizarGrafico() {
    // Calcular la suma total de calorías consumidas
    const caloriesConsumed = this.calcularCaloriasConsumidas();
    let caloriesRemaining = this.caloriasRecomendadas - caloriesConsumed;

    // Asegurarse de que las calorías restantes no sean negativas
    if (caloriesRemaining < 0) {
        caloriesRemaining = 0; // Establecer a 0 si las consumidas exceden las recomendadas
    }

    // Configurar datos para el gráfico para reflejar la situación de no exceder el límite
    const data = [caloriesConsumed, caloriesRemaining > 0 ? caloriesRemaining : 0]; // Asegura no tener valores negativos
    
    // Actualizar los datos del gráfico
    if (this.calorieChart) {
        this.calorieChart.data.datasets[0].data = data;
        this.calorieChart.update();
    }
}

eliminarConsumo(consumo: any): void {
  this.consumoService.eliminarConsumo(consumo._id).subscribe(
    () => {
      console.log('Consumo eliminado correctamente.');
      this.obtenerConsumosUsuarioDiaActual();
      this.actualizarGrafico();
    },
    error => {
      console.error('Error al eliminar consumo:', error);
      // Aquí puedes manejar el error como desees, por ejemplo, mostrar un mensaje al usuario
    }
  );
}

obtenerkcalTotales(gramos: number, idAlimento?: string): number {

  if (!idAlimento) {
    return 0; // O algún otro valor predeterminado si idAlimento es undefined
  }

  // Buscar el alimento por su _id
  const alimentoEncontrado = this.alimentos!.find(alimento => alimento._id === idAlimento);

  // Verificar si se encontró el alimento
  if (alimentoEncontrado) {
    // Obtener las calorías por gramo del alimento encontrado
    const kcal = alimentoEncontrado.informacion_nutricional.calorias;
    console.log("kcal",kcal)
    console.log("gramos",gramos)
    // Calcular las calorías totales
    const kcalTotales = (gramos * kcal) / 100;

    return kcalTotales;
  } else {
    console.error(`No se encontró ningún alimento con _id ${idAlimento}`);
    return 0; // O algún otro valor predeterminado
  }
}


async abrirAlertAlimento(consumo: ConsumoAlimentos) {
  const alimento = this.alimentos!.find(a => a._id === consumo.consumo_alimentos[0].alimento_id);
  const datosNutricionales = `
Proteínas: ${(consumo.consumo_alimentos[0].cantidad_gramos * alimento?.informacion_nutricional!.proteinas! / 100).toFixed(2)}g
Carbohidratos: ${(consumo.consumo_alimentos[0].cantidad_gramos * alimento?.informacion_nutricional!.carbohidratos! / 100).toFixed(2)}g 
Grasas: ${(consumo.consumo_alimentos[0].cantidad_gramos * alimento?.informacion_nutricional!.grasas! / 100).toFixed(2)}g 
Calorías: ${(consumo.consumo_alimentos[0].cantidad_gramos * alimento?.informacion_nutricional!.calorias! / 100).toFixed(2)} kcal
  `;
  const alert = await this.alertController.create({
    header: 'Información Nutricional',
    message: datosNutricionales,
    buttons: ['OK']
  });

  await alert.present();
}

async abrirAlertAlimentos() {

  let proteinas: number = 0;
  let carbohidratos: number = 0;
  let grasas: number = 0;
  let calorias: number = 0;

  this.consumos?.forEach(consumo => {
    
    let gramos = consumo.consumo_alimentos[0].cantidad_gramos
    const alimentos: CrearAlimento[] = this.alimentos!.filter(a => a._id === consumo.consumo_alimentos[0].alimento_id);

    alimentos?.forEach(alimento => {
    proteinas += (gramos * alimento?.informacion_nutricional!.proteinas!) /100
    carbohidratos += (gramos * alimento?.informacion_nutricional!.carbohidratos!) /100
    grasas += (gramos * alimento?.informacion_nutricional!.grasas!) /100
    calorias += (gramos * alimento?.informacion_nutricional!.calorias!) /100
    })
    
  })

  const datosNutricionales = `
Proteínas: ${proteinas!}g
Carbohidratos: ${carbohidratos!}g 
Grasas: ${grasas!}g 
Calorías: ${calorias!} kcal
  `;
  const alert = await this.alertController.create({
    header: 'Datos Totales',
    message: datosNutricionales,
    buttons: ['OK']
  });

  await alert.present();
}

obtenerUsuario(){
  this.usuarioService.getUserByEmail(localStorage.getItem("username")!).subscribe(user => {
    this.user = user;
    this.calcularCaloriasRecomendadas();
  })
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
  console.log(this.caloriasRecomendadas)
  this.actualizarGrafico();
}

}