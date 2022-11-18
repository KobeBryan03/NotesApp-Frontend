import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguridadServiceService {

  url: string = "http://localhost:3000/users";
  urlLogin: string = "http://localhost:3000/login";
  sesionIniciada = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.validarSesion();
  }

  login(email: string, password: string){
      return this.http.post(this.urlLogin, 
      {"email": email, "password": password}, 
      {headers: {"Content-Type": "application/json", "charset": "utf-8"} })
  }

  validarSesion(){
    console.log("Token: ", this.getItemStorage("token"))
    if(this.getItemStorage("token")) this.sesionIniciada.next(true);
  }

  crearSesion(token: string){
    this.addItemStorge("token", token);
    this.sesionIniciada.next(true);
  }

  cerrarSesion(){
    this.clearStorage();
    this.sesionIniciada.next(false);
  }

  addItemStorge(key: string, value: string){
    localStorage.setItem(key, value);
  }

  getItemStorage(key: string){
    return localStorage.getItem(key);
  }

  clearStorage(){
    localStorage.clear();
  }

  getSesionObserver(){
    return this.sesionIniciada.asObservable();
  }

}
