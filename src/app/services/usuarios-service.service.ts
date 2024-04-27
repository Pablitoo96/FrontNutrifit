import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { Crearusuario } from '../models/crearUsuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'https://nutri-fit-backend-railway.onrender.com/usuarios'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  getAllUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}`);
  }

  getUserById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Crearusuario): Observable<Crearusuario> {
    return this.http.post<Crearusuario>(`${this.apiUrl}`, user);
  }

  updateUser(id: string, user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getUserByEmail(correo: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/correo/${correo}`);
  }
}
