import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/Categoria';
import { Nota } from 'src/app/models/Nota';
import { NotasServiceService } from 'src/app/services/notas-service.service';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  url: string = "localhos:3000";
  nota: Nota;
  notaEditar: Nota;
  listaNotas = new Array<Nota>();
  listaCategorias = new Array<Categoria>();
  category : Categoria;

  constructor(private notasService: NotasServiceService) {
    this.nota = new Nota();
    this.notaEditar = new Nota();
    this.category = new Categoria()
    this.listaCategorias = new Array<Categoria>();
  }


  cargaEditarNota(id?: string) {
    if (id === undefined) {
      this.notaEditar = new Nota();
    } else {
      let notaBindeada = this.listaNotas.filter(nota => nota.id === id)[0];
      this.notaEditar = JSON.parse(JSON.stringify(notaBindeada));
      this.category = this.listaCategorias.filter(el => el.id === this.notaEditar.category_id)[0];
    }
  }

  crearNota() {
    let nota: Nota = JSON.parse(JSON.stringify(this.nota));
    nota.status = 4;
    nota.userId = "userRandom"; // temporal mientra se implementa login
    try {
      let notaServer = this.notasService.create(nota).subscribe(nota => {
        this.listaNotas.push(nota);
        this.nota = new Nota();
      })
    } catch (e) {
    }
  }

  editarNota() {
    try {
        this.notasService.update(this.notaEditar).subscribe(data => {
          let index = this.listaNotas.findIndex(el => el.id === this.notaEditar.id)
          this.listaNotas[index] = this.notaEditar;
          this.notaEditar = new Nota();
      })
    } catch (e) {
    }

  }

  eliminarNota() {
    try {

      if (this.notaEditar.id === undefined) throw new Error("id no valida");
      this.notasService.delete(this.notaEditar.id).subscribe(data => {
        let index = this.listaNotas.findIndex(el => el.id === this.notaEditar.id);
        this.listaNotas.splice(index, 1);
      })
    } catch (err: any) {
    }
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
