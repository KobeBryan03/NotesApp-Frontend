import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';
import { Nota } from '../models/Nota';

@Injectable({
  providedIn: 'root'
})
export class NotasServiceService {

  url: string = "http://localhost:3000/notes";
  urlCategorias: string = "http://localhost:3000/categories";
  constructor(private http: HttpClient) {

  }
  getNotas(): Observable<Nota> {
    return this.http.get(this.url, {
      headers: { "Content-Type": "application/json" }
    })
  }

  getNota(id: string) : Observable<Nota> {
    return this.http.get(`${this.url}/${id}`, {
      headers: { "Content-Type": "application/json", "charset":"utf-8" },
    })
  }

  createNota(nota: Nota) {
    return this.http.post(this.url, nota, {
      headers: { "Content-Type": "application/json", "charset":"utf-8" },
    });
  }

  updateNota(nota: Nota) : Observable<Nota> {
    return this.http.put(`${this.url}/${nota.id}`, nota, {
      headers: { "Content-Type": "application/json", "charset":"utf-8" },
    })
  }

  deleteNota(id: string) : Observable<Nota> {
    return this.http.delete(`${this.url}/${id}`, {
      headers: { "Content-Type": "application/json", "charset":"utf-8" },
    })
  }

  getCategorias() : Observable<Categoria> {

    return this.http.get(this.urlCategorias, {
      headers: { "Content-Type": "application/json", "charset":"utf-8" },
    })
  }

}
