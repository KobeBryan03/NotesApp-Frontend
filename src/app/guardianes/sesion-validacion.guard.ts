import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadServiceService } from '../services/seguridad-service.service';

@Injectable({
  providedIn: 'root'
})
export class SesionValidacionGuard implements CanActivate {

  constructor(private seguridadService: SeguridadServiceService,
     private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.seguridadService.getToken()) return true;
      this.router.navigate([""]);
      return false;
  }
  
}
