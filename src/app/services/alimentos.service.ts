import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearAlimento } from '../models/crearalimento';

@Injectable({
  providedIn: 'root'
})
export class AlimentosService {
  private apiUrl = 'https://nutri-fit-backend-railway.onrender.com/alimentos'; // Cambia la URL según la configuración de tu servidor

  constructor(private http: HttpClient) {}

  crearAlimento(alimento: CrearAlimento): Observable<any> {
    return this.http.post<CrearAlimento>(this.apiUrl, alimento);
  }

  obtenerAlimentos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  obtenerAlimentoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  actualizarAlimento(id: string, alimento: CrearAlimento): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, alimento);
  }

  eliminarAlimento(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}