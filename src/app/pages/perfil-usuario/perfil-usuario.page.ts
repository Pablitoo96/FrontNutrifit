import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage {

  constructor(private router: Router) { }

  ionViewWillEnter() {
    // Redirigir al tab "perfil" al entrar en la página
    this.router.navigate(['/perfil-usuario/informacion']);
  }

  cerrarSesion() {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('access_token');
    // Redirigir a la página de inicio de sesión
    this.router.navigateByUrl('/login');
  }
}
