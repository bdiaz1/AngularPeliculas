import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
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

   @ViewChild('table')
  table!: MatTable<any>;

  generos: generoDTO[]| any;
  columnasAMostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros: any = null;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit(): void {
   this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina:number, cantidadElementosAMostrar:number){
     this.generoService.obtenerPaginado(pagina,cantidadElementosAMostrar).subscribe(
      (respuesta: HttpResponse<generoDTO[]>) => {
      this.generos = respuesta.body;
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
        // if(this.table !== undefined){
        //   this.table.renderRows();
        // }
    }, error => console.error(error));
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex +1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }

  borrar(id:number){
    this.generoService.borrar(id).subscribe( () => {
      this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
    }, error => console.error(error));
  }
}
