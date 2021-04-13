import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { actorDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-indice-actores',
  templateUrl: './indice-actores.component.html',
  styleUrls: ['./indice-actores.component.css']
})
export class IndiceActoresComponent implements OnInit {

  constructor(private actorService: ActoresService) { }

  actores: actorDTO[]| any;
  columnasAMostrar = ['id','nombre','acciones'];
  cantidadTotalRegistros: any = null;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina:number, cantidadElementosAMostrar:number){
     this.actorService.obtenerTodos(pagina,cantidadElementosAMostrar).subscribe(
      (respuesta: HttpResponse<actorDTO[]>) => {
      this.actores = respuesta.body;
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
    this.actorService.borrar(id).subscribe( () => {
      this.cargarRegistros(this.paginaActual,this.cantidadRegistrosAMostrar);
    }, error => console.error(error));
  }

}
