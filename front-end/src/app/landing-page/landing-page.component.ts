import { Component, OnInit } from '@angular/core';
import { PeliculaDTO } from '../peliculas/pelicula';
import { PeliculasService } from '../peliculas/peliculas.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private peliculasService: PeliculasService) { }

  peliculasEnCines!: PeliculaDTO[];
  peliculasProximas!: PeliculaDTO[];

  ngOnInit(): void {
      this.cargarDatos();
      // this.peliculasProximas = [{
      //   title: 'Spider-Man',
      //   launchDate: new Date(),
      //   price: 1400.98
      // },{
      //   title: 'Moana',
      //   launchDate: new Date('2016-11-14'),
      //   price: 300.98
      // }];
  }

  cargarDatos(){
    this.peliculasService.ObtenerLandingpage().subscribe(landingPage => {
        this.peliculasEnCines = landingPage.enCines;
        this.peliculasProximas = landingPage.proximosEstrenos;
      });
  }

  borrado(){
    this.cargarDatos();
  }
}
