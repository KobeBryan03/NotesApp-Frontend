import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/Evento';
import { EventoServiceService } from 'src/app/services/evento-service.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  listaEventos = new Array<Evento>();
  evento: Evento;
  eventoEditar: Evento;
  infoUsuario?: string[];

  constructor(private eventService: EventoServiceService) {
    this.evento = new Evento();
    this.eventoEditar = new Evento();
  }

  crear() {
    //validacion
    let validacion: string = this.validacionDatos(this.evento);
    if (validacion !== "") {
      this.infoUsuario = [validacion, "danger"];
      return;
    }

    this.evento.date = this.stringToDate(this.evento.date);
    this.eventService.create(this.evento).subscribe(data => {
      this.listaEventos.push(data);
      this.evento = new Evento();
      this.infoUsuario = ["Evento creado con exito", "success"];
    }, error => {
      this.infoUsuario = ["Fallo la creación del evento", "danger"];
    });
  }

  cargarDatosEdicion(id?: string) {
    if (!id) {
      this.infoUsuario = ["fallo la carga de la informacion", "danger"];
      return;
    }
    let evento = this.listaEventos.find(el => el.id === id);
    if (!evento) {
      this.infoUsuario = ["fallo la carga de la informacion", "danger"];
      return;
    }
    this.eventoEditar = Object.assign({}, evento);
    console.log(this.eventoEditar)
  }

  editar() {
    if (!this.eventoEditar.date) return;

    //validacion
    let validacion: string = this.validacionDatos(this.eventoEditar);
    if (validacion !== "") {
      this.eventoEditar = new Evento();
      this.infoUsuario = [validacion, "danger"];
      return;
    }

    this.eventoEditar.date = this.stringToDate(this.eventoEditar.date);
    this.eventService.update(this.eventoEditar).subscribe(data => {
      let index = this.listaEventos.findIndex(el => el.id === this.eventoEditar.id);
      this.listaEventos[index] = this.eventoEditar;
      this.eventoEditar = new Evento();
      this.infoUsuario = ["Evento editado con exito", "success"];
    }, error => {
      this.infoUsuario = ["Fallo la edicion", "danger"];
    })
  }

  eliminar() {
    if (!this.eventoEditar.id) {
      this.infoUsuario = ["Fallo la eliminación", "danger"];
      return;
    }

    this.eventService.delete(this.eventoEditar.id).subscribe(data => {
      let index = this.listaEventos.findIndex(el => el.id === this.eventoEditar.id);
      this.listaEventos.splice(index, 1);
      this.infoUsuario = ["Evento eliminado con exito", "succes"];
    }, error => {
      this.infoUsuario = ["Fallo la eliminación", "danger"];
    })
  }

  // convierte el valor del input:date en un formato valido par el server
  stringToDate(date?: Date): Date {
    if(!date) return new Date();
    return new Date(date);
  }

  // convierte el formato de fecha del server en formato humano
  dateToString(date?: Date): string {
    if (!date) return "N/A";
    return new Date(date.toString()).toLocaleDateString();

  }

  validacionDatos(evento: Evento): string {
    if (!evento.title || evento.title.length < 1) return "Debe ingresar un título";
    if (!evento.description || evento.description.length < 1) return "Debe ingresar una descripción";
    if (!evento.place || evento.place.length < 1) return "Debe ingresar un lugar";
    if (!evento.date) return "Debe ingresar una fecha";
    if (evento.title.length < 3) return "EL título debe tener almenos tres caracteres";
    if (evento.title.length < 3) return "la descripción tener almenos tres caracteres";
    if (evento.title.length < 3) return "EL lugar tener almenos tres caracteres";

    return "";
  }

  resetInfoUsuario(){
    this.infoUsuario = undefined;
  }

  ngOnInit(): void {
    this.eventService.getAll().subscribe(data => {
      this.listaEventos = Object.values(data);
    })
  }

}
