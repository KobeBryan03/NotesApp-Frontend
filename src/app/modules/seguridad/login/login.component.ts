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

  constructor(private seguridadService: SeguridadServiceService,
    private router: Router) {
    this.email = "";
    this.password = "";
  }

  login() {
    // TODO: validar informacion usuario
    try {
      this.seguridadService.login(this.email, this.password).subscribe(data => {
        let datos = Object.values(data);
        this.seguridadService.crearSesion(datos[1]);
        this.router.navigate(["/"]);
      })
    }catch(e){
      this.seguridadService.clearStorage();
      console.warn("fallo el logueo", e);
    }
   }

  ngOnInit(): void {
  }

}
