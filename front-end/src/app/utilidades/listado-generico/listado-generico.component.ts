import { Component, Input, OnInit } from '@angular/core';
import { PeliculaDTO } from 'src/app/peliculas/pelicula';

@Component({
  selector: 'app-listado-generico',
  templateUrl: './listado-generico.component.html',
  styleUrls: ['./listado-generico.component.css']
})
export class ListadoGenericoComponent implements OnInit {

  @Input()
  listado!: PeliculaDTO[];

  constructor() { }

  ngOnInit(): void {
  }

  // remover(indicePelicula: number){
  //   this.listado?.splice(indicePelicula,1);
  // }

}
