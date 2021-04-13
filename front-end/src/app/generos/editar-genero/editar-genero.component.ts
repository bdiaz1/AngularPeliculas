import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { generoCreacionDTO, generoDTO } from '../genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  modelo!: generoDTO;
  errores: string[]=[];

  constructor(private router: Router, 
    private generoService : GenerosService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {    
    this.activatedRoute.params.subscribe(params => {
      this.generoService.obtenerPorId(params.id).subscribe(genero => {
        this.modelo = genero;
      }, () => this.router.navigate(['/generos']))
    });
  }

  guardarCambios(genero: generoCreacionDTO){
    this.generoService.editar(this.modelo.id,genero).subscribe(() =>{
      this.router.navigate(['/generos']);
    }, error => this.errores = parseErroresAPI(error));
    
  }

}
