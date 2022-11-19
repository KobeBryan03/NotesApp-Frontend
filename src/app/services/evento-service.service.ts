import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';
import { SeguridadServiceService } from './seguridad-service.service';

@Injectable({
  providedIn: 'root'
})
export class EventoServiceService {

  url: string = "http://localhost:3000/events";
  token: string;
  constructor(private http: HttpClient,
    private seguridadService: SeguridadServiceService) {
      this.token = this.seguridadService.getToken() || "";
    }

  create(evento: Evento): Observable<Evento>{
    return this.http.post(this.url, evento, {
      headers: {"Content-Type": "application/json", "charset": "utf-8", "Authentication": `Bearer ${this.token}`}
    });
  }

  getAll(): Observable<Evento>{
    return this.http.get(this.url, {
      headers: {"Content-Type": "application/json", "charset": "utf-8", "Authentication": `Bearer ${this.token}`}
    });
  }

  get(id: string): Observable<Evento>{
    return this.http.get(`${this.url}/${id}`, {
      headers: {"Content-Type": "application/json", "charset": "utf-8", "Authentication": `Bearer ${this.token}`}
    });
  }

  update(evento: Evento): Observable<Evento>{
    return this.http.put(`${this.url}/${evento.id}`, evento, {
      headers: {"Content-Type": "application/json", "charset": "utf-8", "Authentication": `Bearer ${this.token}`}
    });
  }

  delete(id: string): Observable<Evento>{
    return this.http.delete(`${this.url}/${id}`, {
      headers: {"Content-Type": "application/json", "charset": "utf-8", "Authentication": `Bearer ${this.token}`}
    });
  }
}
