import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './components/eventos/eventos.component';
import { HomeComponent } from './components/home/home.component';
import { NotasComponent } from './components/notas/notas.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "notas", component: NotasComponent},
  {path: "eventos", component: EventosComponent},
  {path: "seguridad", loadChildren: ()=> import ("src/app/modules/seguridad/seguridad.module").then(res => res.SeguridadModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
