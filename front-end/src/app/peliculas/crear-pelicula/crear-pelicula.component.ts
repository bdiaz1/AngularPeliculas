import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { PeliculaCreacionDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.component.html',
  styleUrls: ['./crear-pelicula.component.css']
})
export class CrearPeliculaComponent implements OnInit {

  constructor(private router:Router, private peliculasService: PeliculasService) { }

  generosNoSeleccionados!: MultipleSelectorModel[];
  cinesNoSeleccionados!: MultipleSelectorModel[];

  errores: string[]=[];

  ngOnInit(): void {
    this.peliculasService.postGet().subscribe( resultado => {
      this.generosNoSeleccionados = resultado.generos.map(genero => {
        return <MultipleSelectorModel>{llave: genero.id, valor: genero.nombre};
      });
      this.cinesNoSeleccionados = resultado.cines.map(cine => {
        return <MultipleSelectorModel>{llave: cine.id, valor: cine.nombre};
      });
    }, error => console.error(error));
  }

    guardarCambios(pelicula: PeliculaCreacionDTO){
    //...guardar los cambios
    // this.router.navigate(['']);
      // console.log(pelicula);
      this.peliculasService.crear(pelicula).subscribe((id:number) => 
        this.router.navigate(['/pelicula/' + id])
        ,error => this.errores = parseErroresAPI(error)
      );

  }
}
