import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SeguridadServiceService } from 'src/app/services/seguridad-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  sesionActiva: boolean = false;
  suscripcion = new Subscription();

  constructor(private seguridadService: SeguridadServiceService) {}

  ngOnInit(): void {
    this.suscripcion = this.seguridadService.getSesionObserver().subscribe(data =>{
      this.sesionActiva = data;
    })
  }

}
