import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RatingService } from 'src/app/rating/rating.service';
import { Coordenada, CoordenadaConMensaje } from 'src/app/utilidades/mapa/coordenada';
import Swal from 'sweetalert2';
import { PeliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit {

  constructor(private peliculasService: PeliculasService,
    private activateRoute: ActivatedRoute, private sanitizer: DomSanitizer,
    private ratingService: RatingService ) { }

    pelicula!: PeliculaDTO;
    fechaLanzamiento!: Date;
    trailerURL!: SafeResourceUrl;
    coordenadas: CoordenadaConMensaje[]= [];

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.peliculasService.obtenerPorId(params.id).subscribe(pelicula => {
        this.pelicula = pelicula;
        this.fechaLanzamiento = new Date(this.pelicula.fechaLanzamiento);
        this.trailerURL = this.generarURLYoutubeEmbed(this.pelicula.trailer);
        this.coordenadas = pelicula.cines.map(cine => {
          return {longitud: cine.longitud, latitud: cine.latitud, mensaje: cine.nombre};
        });
      });
    });
  }

  generarURLYoutubeEmbed(url:any): SafeResourceUrl{
    if(!url){
      return '';
    }
    console.log(url);
    var video_id = url.split('v=')[1];
    var posicionAmpersand = video_id.indexOf('&');

    if(posicionAmpersand !== -1){
      video_id = video_id.subscribe(0,posicionAmpersand);
    }

    return this.sanitizer.
    bypassSecurityTrustResourceUrl(`http://www.youtube.com/embed/${video_id}`);
  }

  rated(puntuacion: number){
    this.ratingService.rate(this.pelicula.id,puntuacion).subscribe(() =>{
      Swal.fire("Exitoso","Su voto ha sido recibido", 'success');
    }, errores => console.log(errores));
  }

}
