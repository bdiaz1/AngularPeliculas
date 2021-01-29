import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { generoDTO } from '../genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-indices-generos',
  templateUrl: './indices-generos.component.html',
  styleUrls: ['./indices-generos.component.css']
})
export class IndicesGenerosComponent implements OnInit {

  constructor(private generoService: GenerosService) { }

  generos: generoDTO[]| any;
  columnasAMostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros: any = null;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit(): void {
   this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina:number, cantidadElementosAMostrar:number){
     this.generoService.obtenerTodos(pagina,cantidadElementosAMostrar).subscribe(
      (respuesta: HttpResponse<generoDTO[]>) => {
      this.generos = respuesta.body;
      console.log(respuesta.headers.get("cantidadTotalRegistros"));
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, error => console.error(error));
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex +1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }
}
