import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PeliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-listado-peliculas',
  templateUrl: './listado-peliculas.component.html',
  styleUrls: ['./listado-peliculas.component.css']
})
export class ListadoPeliculasComponent implements OnInit {

  @Input()
  peliculas!:PeliculaDTO[];

  @Output()
  borrado:EventEmitter<void> = new EventEmitter<void>();

  constructor(private peliculaService: PeliculasService,
    private router: Router) { }


  ngOnInit(): void {
  }

  borrar(peliculaId: number){
    this.peliculaService.borrar(peliculaId).subscribe( () =>{
      this.borrado.emit();
    },error => console.log(error));
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
