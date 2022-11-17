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

  constructor(private eventService: EventoServiceService) {
    this.evento = new Evento();
    this.eventoEditar = new Evento();
  }

  crear() {
    try {
      if (!this.evento.date) return;
      this.evento.date = this.stringToDate(this.evento.date);
      this.eventService.create(this.evento).subscribe(data => {
        this.listaEventos.push(data);
        this.evento = new Evento();
      });
    } catch (e) {
      console.warn("Fallo la creacion ", e);
    }
  }

  cargarDatosEdicion(id?: string) {
    try {
      if (!id) throw new Error("id es null")
      this.eventService.get(id).subscribe(data => {
        this.eventoEditar = data;
      });
    } catch (e) {
      console.warn("Fallo la carga de la informacion", e);
    }
  }

  editar() {
    try {
      if (!this.eventoEditar.date) return;
      this.eventoEditar.date = this.stringToDate(this.eventoEditar.date);
      this.eventService.update(this.eventoEditar).subscribe(data => {
        let index = this.listaEventos.findIndex(el => el.id === this.eventoEditar.id);
        this.listaEventos[index] = this.eventoEditar;
        this.eventoEditar = new Evento();
      })
    } catch (e) {
      console.warn("fallo la edicion", e);
    }
  }

  eliminar() {
    try {
      if (!this.eventoEditar.id) throw new Error("No se encontro un id de evento");
      this.eventService.delete(this.eventoEditar.id).subscribe(data => {
        let index = this.listaEventos.findIndex(el => el.id === this.eventoEditar.id);
        this.listaEventos.splice(index, 1);
      })
    } catch (e) {
      console.log("fallo la eliminacion", e);
    }
  }

  // convierte el valor del input:date en un formato valido par el server
  stringToDate(date: Date): Date {
    console.log(date)
    return new Date(date);
  }

  // convierte el formato de fecha del server en formato humano
  dateToString(date?: Date): string{
    if(!date) return "N/A";
    return new Date(date.toString()).toLocaleDateString();
  
  }


  ngOnInit(): void {
    this.eventService.getAll().subscribe(data => {
      this.listaEventos = Object.values(data);
    })
  }

}
