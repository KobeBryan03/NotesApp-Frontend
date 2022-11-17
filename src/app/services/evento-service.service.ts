import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoServiceService {

  url: string = "http://localhost:3000/events";
  constructor(private http: HttpClient) {}

  create(evento: Evento): Observable<Evento>{
    return this.http.post(this.url, evento, {
      headers: {"Content-Type": "application/json", "charset": "utf-8"}
    });
  }

  getAll(): Observable<Evento>{
    return this.http.get(this.url, {
      headers: {"Content-Type": "application/json", "charset": "utf-8"}
    });
  }

  get(id: string): Observable<Evento>{
    return this.http.get(`${this.url}/${id}`, {
      headers: {"Content-Type": "application/json", "charset": "utf-8"}
    });
  }

  update(evento: Evento): Observable<Evento>{
    return this.http.put(`${this.url}/${evento.id}`, evento, {
      headers: {"Content-Type": "application/json", "charset": "utf-8"}
    });
  }

  delete(id: string): Observable<Evento>{
    return this.http.delete(`${this.url}/${id}`, {
      headers: {"Content-Type": "application/json", "charset": "utf-8"}
    });
  }
}
