import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './components/eventos/eventos.component';
import { HomeComponent } from './components/home/home.component';
import { NotasComponent } from './components/notas/notas.component';
import { SesionValidacionGuard } from './guardianes/sesion-validacion.guard';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "notas", component: NotasComponent, canActivate: [SesionValidacionGuard]},
  {path: "eventos", component: EventosComponent, canActivate: [SesionValidacionGuard]},
  {path: "seguridad", loadChildren: ()=> import ("src/app/modules/seguridad/seguridad.module").then(res => res.SeguridadModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
