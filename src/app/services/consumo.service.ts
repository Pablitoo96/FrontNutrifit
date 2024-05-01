import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consumo } from '../models/crearconsumo';
import { ConsumoAlimentos } from '../models/consumoalimentos';


@Injectable({
  providedIn: 'root'
})
export class ConsumoService {

  private apiUrl = 'https://nutri-fit-backend-railway.onrender.com/consumos';
  private apiLocal = 'http://localhost:3000/consumos'

  constructor(private http: HttpClient) { }

  crearConsumo(crearConsumoDto: Consumo): Observable<any> {
    return this.http.post<any>(this.apiUrl, crearConsumoDto);
  }

  obtenerConsumos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerConsumoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  actualizarConsumo(id: string, actualizarConsumoDto: Consumo): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, actualizarConsumoDto);
  }

  eliminarConsumo(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  obtenerConsumosPorUsuario(usuarioId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  obtenerConsumosPorUsuarioYFecha(usuarioId: string, fecha: Date): Observable<Consumo[]> {
    let params = new HttpParams()
      .set('fecha', fecha.toISOString().split('T')[0]); // Formatear la fecha como YYYY-MM-DD

    return this.http.get<Consumo[]>(`${this.apiUrl}/usuario/${usuarioId}/fecha`, { params });
  }

  obtenerTotalCaloriasPorUsuario(usuarioId: string): Observable<any> {
    return this.http.get<any>(`${this.apiLocal}/usuario/${usuarioId}/calorias`);
  }
}