import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';
import { Nota } from '../models/Nota';
import { SeguridadServiceService } from './seguridad-service.service';

@Injectable({
  providedIn: 'root'
})
export class NotasServiceService {

  url: string = "http://localhost:3000/notes";
  urlCategorias: string = "http://localhost:3000/categories";
  token: string;

  constructor(private http: HttpClient,
    private seguridadService: SeguridadServiceService) {
      this.token = this.seguridadService.getToken() || "";
  }
  getAll(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.url, {
      headers: { "Content-Type": "application/json", "charset":"utf-8", "Authentication": `Bearer ${this.token}` }
    })
  }

  get(id: string) : Observable<Nota> {
    return this.http.get<Nota>(`${this.url}/${id}`, {
      headers: { "Content-Type": "application/json", "charset":"utf-8", "Authentication": `Bearer ${this.token}` },
    })
  }

  create(nota: Nota): Observable<Nota> {
    return this.http.post<Nota>(this.url, nota, {
      headers: { "Content-Type": "application/json", "charset":"utf-8", "Authentication": `Bearer ${this.token}` },
    });
  }

  update(nota: Nota) : Observable<Nota> {
    return this.http.put(`${this.url}/${nota.id}`, nota, {
      headers: { "Content-Type": "application/json", "charset":"utf-8", "Authentication": `Bearer ${this.token}` },
    })
  }

  delete(id: string) : Observable<Nota> {
    return this.http.delete(`${this.url}/${id}`, {
      headers: { "Content-Type": "application/json", "charset":"utf-8", "Authentication": `Bearer ${this.token}` },
    })
  }

  getCategorias() : Observable<Categoria[]> {

    return this.http.get<Categoria[]>(this.urlCategorias, {
      headers: { "Content-Type": "application/json", "charset":"utf-8", "Authentication": `Bearer ${this.token}` },
    })
  }

}
