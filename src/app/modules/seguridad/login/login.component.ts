import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadServiceService } from 'src/app/services/seguridad-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  infoUsuario?: string[];

  constructor(private seguridadService: SeguridadServiceService,
    private router: Router) {
    this.email = "";
    this.password = "";
  }

  login() {
    let validacion: string = this.validarDatos(this.email, this.password);
    if(validacion !== ""){
      this.infoUsuario = [validacion, "danger"];
      return;
    }
    // TODO: validar informacion usuario
      this.seguridadService.login(this.email, this.password).subscribe(data => {
        let datos = Object.values(data);
        this.seguridadService.crearSesion(datos[1]);
        this.router.navigate(["/"]);
      }, error=>{
        this.seguridadService.clearStorage();
        this.infoUsuario = ["El usuario o la contraseña son incorrectos", "danger"];
      })
   }

   validarDatos(email: string, password: string): string{
    if(!email || email.length < 1) return "Debe ingresar un email";
    if(!password || password.length < 1) return "Debe ingresar un password";
    if(email.length < 7) "El email debe tener almenos 7 caracteres";
    if(!email.match(/[a-zA-Z-0-9._]{3,20}@[a-z]{2,12}\.[a-z]{3,20}\.?([a-z]{2,5})?/)) return "El email no es valido"
    return "";
   }

   resetInfoUsuario(){
    this.infoUsuario = undefined;
   }

  ngOnInit(): void {
  }

}
