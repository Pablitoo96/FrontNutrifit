import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {


  nombre: string | undefined;
  email: string | undefined;
  contrasenya: string | undefined;

  constructor(public toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }


  async goDatosRegistro(){
    console.log("verificar():  ",this.verificar())
    if(this.verificar()){
      // Navegar a /datos-registro con parámetros
      this.router.navigate(['/datos-registro'], { queryParams: { nombre: this.nombre, email: this.email, contrasenya: this.contrasenya }});
    } else {
      // Mostrar un toast si la verificación falla
      const toast = await this.toastController.create({
        message: 'Faltan datos por rellenar o el email es inválido.',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    }
  }

  verificar(): boolean {
    if (!this.nombre || !this.email || !this.contrasenya) {
      return false;
    }

    // Regex para validar el email
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (!emailRegex.test(this.email)) {
      return false;
    }

    return true;
  }

}
