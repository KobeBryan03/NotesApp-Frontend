import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';
import { Status } from 'src/app/models/Status';
import { Nota } from 'src/app/models/Nota';
import { NotasServiceService } from 'src/app/services/notas-service.service';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  url: string = "http://localhost:3000";
  nota: Nota;
  notaEditar: Nota;
  listaNotas = new Array<Nota>();
  listaCategorias = new Array<Categoria>();
  category: Categoria;
  status: Status;
  infoUsuario?: string[];
  listaStatus = new Array<Status>(
    new Status(1, "Muy Importante"),
    new Status(2, "Importante"),
    new Status(3, "Poco Importante"),
    new Status(4, "Sin Importancia"),
  )

  constructor(private notasService: NotasServiceService) {
    this.nota = new Nota();
    this.notaEditar = new Nota();
    this.category = new Categoria()
    this.status = this.listaStatus[0];
    this.listaCategorias = new Array<Categoria>();
  }


  cargaEditarNota(id?: string) {
    if (id === undefined) {
      this.notaEditar = new Nota();
    } else {
      let notaBindeada = this.listaNotas.filter(nota => nota.id === id)[0];
      this.notaEditar = Object.assign({}, notaBindeada);
      this.category = this.listaCategorias.find(el => el.id === this.notaEditar.category_id) || new Categoria();
      this.status = this.listaStatus.find(el => el.id === this.notaEditar.status) || new Status(1, "Sin Importancia");
    }
  }

  crearNota() {
    let validacion: string = this.validacionDatos(this.nota);
    if (validacion !== "") {
      this.infoUsuario = [validacion, "danger"];
      return;
    }

    let nota: Nota = Object.assign({}, this.nota);
    nota.status = this.getStatus(nota.status);
    nota.userId = "userRandom"; // temporal mientra se implementa login

    this.notasService.create(nota).subscribe(nota => {
      this.listaNotas.push(nota);
      this.nota = new Nota();
      this.infoUsuario = ["Se creo la not con exito", "success"];
    }, error => {
      this.infoUsuario = ["fallo la creacion de la nota", "danger"];
    })
  }

  editarNota() {
    this.notaEditar.status = this.getStatus(this.notaEditar.status);
    let validacion: string = this.validacionDatos(this.notaEditar);
    if (validacion !== "") {
      this.infoUsuario = [validacion, "danger"];
      return;
    }

    this.notasService.update(this.notaEditar).subscribe(data => {
      let index = this.listaNotas.findIndex(el => el.id === this.notaEditar.id)
      this.listaNotas[index] = this.notaEditar;
      this.notaEditar = new Nota();
      this.infoUsuario = ["Se edito la nota con exito", "success"];
    }, error => {
      this.infoUsuario = ["fallo la edicion de la nota", "danger"];
    })


  }

  eliminarNota() {
    if (this.notaEditar.id === undefined) {
      this.infoUsuario = ["fallo la eliminación de la nota", "danger"];
      return;
    }
    this.notasService.delete(this.notaEditar.id).subscribe(data => {
      let index = this.listaNotas.findIndex(el => el.id === this.notaEditar.id);
      this.listaNotas.splice(index, 1);
      this.infoUsuario = ["Se elimino la tarea con exito", "succes"];
    }, error => {
      this.infoUsuario = ["fallo la eliminación de la nota", "danger"];
    })

  }

  validacionDatos(nota: Nota): string {
    if (!nota.title || nota.title.length < 1) return "Debe ingresar un titulo";
    if (!nota.category_id || nota.category_id.length < 1) return "Debe seleccionar una categoria";
    if (!nota.status || nota.status < 1) return "Debe seleccionar un status";
    if (!nota.body || nota.body.length < 1) return "Debe ingresar una nota";
    if (nota.title.length < 3) return "El titulo debe tener minimo 3 carcteres";
    if (nota.body.length < 3) return "La nota debe tener minimo 3 carcteres";
    if (nota.title.length > 30) return "El titulo debe tener maximo 30 carcteres";
    if (nota.body.length > 3000) return "La nota debe tener maximo 3 carcteres";

    return "";
  }

  getStatus(status?: number): number {
    if (!status) return 0;
    return parseInt(status.toString());
  }

  resetInfoUsuario(){
    this.infoUsuario = undefined;
  }



  ngOnInit() {
    this.notasService.getAll().subscribe(data => {
      this.listaNotas = Object.values(data);
    })

    this.notasService.getCategorias().subscribe(categorias => {
      this.listaCategorias = Object.values(categorias);
    })
  }


}
