import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Crearusuario } from 'src/app/models/crearUsuario';
import { UsuariosService } from 'src/app/services/usuarios-service.service';

@Component({
  selector: 'app-datos-registro',
  templateUrl: './datos-registro.page.html',
  styleUrls: ['./datos-registro.page.scss'],
})
export class DatosRegistroPage implements OnInit {

  questions = ['¿Cuánto pesas?', '¿Cuánto mides?', '¿Cuántos años tienes?', '¿Cuál es tu sexo?'];
  currentStep = 0;

  nombre: string | undefined;
  email: string | undefined;
  contrasenya: string | undefined;
  progress = 1 / this.questions.length;
  peso: number = 0;
  altura: number = 0;
  edad: number = 0;
  sexo: string = "masculino";

  constructor(private router: Router,  private toastController: ToastController, private route: ActivatedRoute, private usuarioService: UsuariosService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nombre = params['nombre'];
      this.email = params['email'];
      this.contrasenya = params['contrasenya'];
    });
  }

  get currentQuestion() {
    return this.questions[this.currentStep];
  }

  nextStep() {
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.progress = (this.currentStep + 1) / this.questions.length;
    }else{

      const newUser: Crearusuario = {
        nombre: this.nombre!,
        correo: this.email!.toLowerCase(),
        contrasenya_hash: this.contrasenya!,
        peso: this.peso,
        altura: this.altura,
        edad: this.edad,
        sexo: this.sexo
      };
  
      // Hacer la llamada al servicio
      this.usuarioService.createUser(newUser).subscribe({
        next: (user) => {
          // Usuario creado exitosamente, redirigir al login
          this.router.navigateByUrl('/login');
          this.presentToastOK();
        },
        error: (error) => {
          // Manejo de errores
          console.error('Error al crear usuario:', error);
          this.presentToastError();
        }
      });

      this.router.navigateByUrl('/login');
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.progress = (this.currentStep + 1) / this.questions.length;
    }
  }

  handleBack() {
    this.currentStep = 0;
  }

  async validateAndAdvance() {
    if ((this.currentStep === 0 && !this.peso) ||
        (this.currentStep === 1 && !this.altura) ||
        (this.currentStep === 2 && !this.edad) ||
        (this.currentStep === 3 && !this.sexo)) {
      const toast = await this.toastController.create({
        message: 'Por favor completa todos los campos para continuar.',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    } else {
      this.nextStep();
    }
  }

  async presentToastError() {
    const toast = await this.toastController.create({
      message: "Error al registrarse",
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }


  async presentToastOK() {
    const toast = await this.toastController.create({
      message: "Usuario registrado correctamente",
      duration: 4000,
      position: 'bottom'
    });
    toast.present();
  }

}
