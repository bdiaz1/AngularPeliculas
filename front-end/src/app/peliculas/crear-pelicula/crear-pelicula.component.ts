import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PeliculaCreacionDTO } from '../pelicula';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

    guardarCambios(pelicula: PeliculaCreacionDTO){
    //...guardar los cambios
    // this.router.navigate(['']);
      console.log(pelicula);
  }
}
