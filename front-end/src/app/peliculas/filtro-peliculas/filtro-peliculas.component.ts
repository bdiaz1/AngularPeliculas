import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private activateRoute: ActivatedRoute) { }

  form!: FormGroup;
  genres = [
    {id:1,nombre:'Drama'},
    {id:2,nombre:'Acción'},
    {id:3,nombre:'Comedia'}
  ];

  peliculas = [
    {title: 'Spider-Man', atTheCinema:false,nextReleases :true, genres:[1,2],poster:'https://m.media-amazon.com/images/M/MV5BZDEyN2NhMjgtMjdhNi00MmNlLWE5YTgtZGE4MzNjMTRlMGEwXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_UX182_CR0,0,182,268_AL_.jpg'},
    {title: 'Man of Steel', atTheCinema:false,nextReleases :false, genres:[2,3],poster:'https://m.media-amazon.com/images/M/MV5BMTk5ODk1NDkxMF5BMl5BanBnXkFtZTcwNTA5OTY0OQ@@._V1_UY209_CR0,0,140,209_AL_.jpg'},
    {title: 'Harry Potter y las reliquias de la muerte 2', atTheCinema:true,nextReleases :false, genres:[1,3],poster:'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_UX140_CR0,0,140,209_AL_.jpg'}
  ];

  peliculasOriginal = this.peliculas;

  formularioOriginal = {
      title: '',
      genreId: 0,
      nextReleases: false,
      atTheCinema: false
    };

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formularioOriginal);
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value);

    this.form.valueChanges.subscribe( valores => {
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores);
      this.escribirParametrosbusquedaEnURL();
    });
  }

  buscarPeliculas(valores: any){
    if(valores.title){
    this.peliculas = this.peliculas.filter(pelicula => pelicula.title.indexOf(valores.title) !== -1);
    }

    if(valores.genreId){
    this.peliculas = this.peliculas.filter(pelicula => pelicula.genres.indexOf(valores.genreId) !== -1);
    }

    if(valores.nextReleases){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.nextReleases);
    }

    if(valores.atTheCinema){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.atTheCinema);
    }
  }

  limpiar(){
    this.form.patchValue(this.formularioOriginal);
  }

  private escribirParametrosbusquedaEnURL(){
    var queryStrings = [];

    var valoresFormulario = this.form.value;

    if(valoresFormulario.title){
      queryStrings.push(`titulo=${valoresFormulario.title}`);
    }

    if(valoresFormulario.genreId != 0){
      queryStrings.push(`generoId=${valoresFormulario.genreId}`);
    }

    if(valoresFormulario.nextReleases){
      queryStrings.push(`proximosEstrenos=${valoresFormulario.nextReleases}`);
    }

    if(valoresFormulario.atTheCinema){
      queryStrings.push(`enCines=${valoresFormulario.atTheCinema}`);
    }

    this.location.replaceState('peliculas/buscar',queryStrings.join('&'));
  }

  private leerValoresURL(){
    this.activateRoute.queryParams.subscribe(params => {
      var objeto:any = {};

      if(params.titulo){
        objeto.title = params.titulo;
      }

      if(params.generoId){
        objeto.genreId = Number(params.generoId);
      }

      if(params.proximosEstrenos){
        objeto.nextReleases = params.proximosEstrenos;
      }

      if(params.enCines){
        objeto.atTheCinema = params.enCines;
      }
      console.log(objeto);
       this.form.patchValue(objeto);
    });
  }
}
