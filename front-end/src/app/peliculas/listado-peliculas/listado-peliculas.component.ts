import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  @Input()
  peliculas:any;

  constructor() { }

  ngOnInit(): void {
  }

  remover(indicePelicula: number){
    this.peliculas?.splice(indicePelicula,1);
  }

  /* ngOnInit(): void {
    setTimeout(() => {
      this.peliculas = [{
        title: 'Spider-Man',
        launchDate: new Date(),
        price: 1400.98
      },{
        title: 'Moana',
        launchDate: new Date('2016-11-14'),
        price: 300.98
      }];
    }, 500);
  } */

}
