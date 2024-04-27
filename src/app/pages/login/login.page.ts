import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router de Angular
import { ToastController } from '@ionic/angular';
import { UsuariosService } from 'src/app/services/usuarios-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string | undefined;
  contrasenya: string | undefined;

  constructor(private router: Router, private usuarioService: UsuariosService, public toastController: ToastController) { }

  ngOnInit() {
  }
  async iniciarSesion() {
    try {
      // Aquí llamas al método login del servicio de usuarios con el nombre de usuario y la contraseña
      const response = await this.usuarioService.login(this.correo!, this.contrasenya!).toPromise();
      console.log('Inicio de sesión exitoso:', response);
      localStorage.setItem('access_token', response.access_token);
      localStorage.setItem('username',response.username)
      // Redirige al usuario a la página de perfil después del inicio de sesión exitoso
      console.log("login: ", response)
      this.correo = "";
      this.contrasenya = "";
      this.router.navigate(['/perfil-usuario']);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.presentToast();
      // Maneja el error, por ejemplo, muestra un mensaje de error al usuario
    }
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'La contraseña o el correo es incorrecto',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
