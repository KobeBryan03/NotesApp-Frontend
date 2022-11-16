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
      console.log(this.category, this.listaCategorias, this.notaEditar)
    }
  }
  cargaEliminarNota(id?: string) {
    if (id === undefined) {
      this.notaEditar = new Nota();
    } else {
      let notaBindeada = this.listaNotas.filter(nota => nota.id === id)[0];
      this.notaEditar = JSON.parse(JSON.stringify(notaBindeada));
    }
  }

  crearNota() {
    let nota: Nota = JSON.parse(JSON.stringify(this.nota));
    nota.status = 4;
    nota.userId = "userRandom";
    try {
      console.log(this.nota)
      let notaServer = this.notasService.createNota(nota).subscribe(nota => {
        this.listaNotas.push(nota);
        this.nota = new Nota();
      })
    } catch (e) {
      console.warn("fallo en creacion", e);
    }
  }

  editarNota(id?: string) {
    if (!id) return console.log("la id no existe")
    try {
      this.notasService.getNota(id).subscribe(nota=>{
        this.notasService.updateNota(nota).subscribe(data => {
          this.listaNotas[this.listaNotas.findIndex(el => el.id === nota.id)] = nota;
          this.notaEditar = new Nota();
        })
      })
    } catch (e) {
      console.warn(e);
    }

  }

  eliminarNota(id?: string) {
    try {
      if (id === undefined) throw new Error("id no valida");
      this.notasService.deleteNota(id).subscribe(data => {
        this.listaNotas = this.listaNotas.filter(nota => nota.id !== id);
      })
    } catch (err: any) {
      console.warn("ocurrio un error al eliminar", err.getMessage());
    }
  }



  ngOnInit() {
    this.notasService.getNotas().subscribe(data => {
      this.listaNotas = Object.values(data);
    })

    this.notasService.getCategorias().subscribe(categorias => {
      this.listaCategorias = Object.values(categorias);
      console.log(categorias)
    })
  }


}
