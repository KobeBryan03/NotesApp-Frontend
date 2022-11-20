import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { SeguridadServiceService } from 'src/app/services/seguridad-service.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  infoUsuario?: string[];
  usuario: Usuario;
  confirmPassword: string = "";

  constructor(private seguridadService: SeguridadServiceService,
    private http: HttpClient, private router: Router) {
    this.usuario = new Usuario();
  }

  registrar() {
    let validacion: string = this.validarDatos(this.usuario, this.confirmPassword);
    if (validacion !== "") {
      this.infoUsuario = [validacion, "danger"];
      return;
    }

    this.usuario.birthDate = new Date(this.usuario.birthDate || "").toJSON();
    this.usuario.phoneNumber = this.usuario.phoneNumber?.toString();

    this.http.post<Usuario>("http://localhost:3000/users", this.usuario, {
      headers: { "Content-Type": "application/json", "charset": "utf-8" }
    }).subscribe(data => {
      this.infoUsuario = ["Usuario creado con exito", "success"];
      this.login(this.usuario);
    }, error => {
      this.infoUsuario = [error.message, "danger"];
    })
  }

  login(usuario: Usuario) {
    if (!usuario.email || !usuario.password) {
      this.infoUsuario = ["El usuario o la contraseña son invalido", "danger"];
      return;
    }
    this.seguridadService.login(usuario.email, usuario.password).subscribe(data => {
      let datos = Object.values(data);
      if (datos[1] !== null) {
        this.seguridadService.crearSesion(datos[1]);
        this.router.navigate(['']);
      } else {
        location.reload();
      }
      this.clear();
    },error =>{
      this.infoUsuario = ["El usuario o la contraseña son incorrectos"];
      this.clear();
    })
  }

  validarDatos(usuario: Usuario, confPass: string): string {
    if (!usuario.names || usuario.names.length < 1) return "Debe ingresar un nombre";
    if (!usuario.lastNames || usuario.lastNames.length < 1) return "Debe ingresar un apellido";
    if (!usuario.email || usuario.email.length < 1) return "Debe ingresar un correo electronico";
    if (!usuario.phoneNumber || usuario.phoneNumber.length < 1) return "Debe ingresar un numero de telefono";
    if (!usuario.birthDate) return "Debe ingresar una fecha de naacimiento";
    if (!usuario.password || usuario.password.length < 1) return "Debe ingresar una contraseña";
    if (!confPass || confPass.length < 1) return "Debe ingresar la contraseña de nuevo";
    if (usuario.names.length < 5) return "El nombre debe tener 5 caracteres como minimo";
    if (usuario.lastNames.length < 5) return "El apellido debe tener 5 caracteres como minimo";
    if (usuario.email.length < 7) return "El correo debe tener 7 caracteres como minimo";
    if (usuario.phoneNumber.length < 8) return "El  debe tener 8 caracteres como minimo";
    if (usuario.password.length < 6) return "La contraseña debe tener 6 caracteres como minimo";
    if (confPass.length < 6) return "La contraseña debe tener 6 caracteres como minimo";
    if (usuario.password !== confPass) return "Las contrseñas no coinciden";
    return "";
  }

  resetInfoUsuario() {
    this.infoUsuario = undefined;
  }

  clear(){
    this.usuario = new Usuario();
    this.confirmPassword = "";
  }

  ngOnInit(): void {
  }

}
