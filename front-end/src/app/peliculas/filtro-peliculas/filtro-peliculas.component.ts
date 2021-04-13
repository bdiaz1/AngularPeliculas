import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { generoDTO } from 'src/app/generos/genero';
import { GenerosService } from 'src/app/generos/generos.service';
import { PeliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private activateRoute: ActivatedRoute,
    private generosService: GenerosService,
    private peliculasService: PeliculasService) { }

  form!: FormGroup;
  generos : generoDTO[]=[];
  peliculas!: PeliculaDTO[];
    paginaActual = 1;
    cantidadElementosAMostrar = 10;
    cantidadElementos=0;


  formularioOriginal = {
      titulo: '',
      generoId: 0,
      proximosEstrenos: false,
      enCines: false
    };

  ngOnInit(): void {

    this.generosService.obtenerTodos().subscribe( generos => {
      this.generos = generos;

      this.form = this.formBuilder.group(this.formularioOriginal);
      this.leerValoresURL();
      this.buscarPeliculas(this.form.value);

      this.form.valueChanges.subscribe( valores => {
        this.buscarPeliculas(valores);
        this.escribirParametrosbusquedaEnURL();
      });
    });

    
  }

  buscarPeliculas(valores: any){
    valores.pagina = this.paginaActual;
    valores.recordsPorPagina = this.cantidadElementosAMostrar;
   this.peliculasService.filtrar(valores).subscribe(response => {
     this.peliculas = response.body;
     this.escribirParametrosbusquedaEnURL();
     this.cantidadElementos = response.headers.get('cantidadTotalRegistros');
   })
  }

  limpiar(){
    this.form.patchValue(this.formularioOriginal);
  }

  private escribirParametrosbusquedaEnURL(){
    var queryStrings = [];

    var valoresFormulario = this.form.value;

    if(valoresFormulario.titulo){
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }

    if(valoresFormulario.generoId != 0){
      queryStrings.push(`generoId=${valoresFormulario.generoId}`);
    }

    if(valoresFormulario.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`);
    }

    if(valoresFormulario.enCines){
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
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
       this.form.patchValue(objeto);
    });
  }

  paginatorUpdate(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadElementosAMostrar = datos.pageSize;
    this.buscarPeliculas(this.form.value);
  }
}
