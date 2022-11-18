import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SeguridadServiceService } from 'src/app/services/seguridad-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private seguridadService: SeguridadServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.seguridadService.cerrarSesion();
    this.router.navigate(['']);
  }

}
