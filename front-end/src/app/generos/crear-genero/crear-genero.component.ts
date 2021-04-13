import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDTO } from '../genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent{

  errores: string[] = [];

  constructor(private router: Router, private generosService: GenerosService) { }

  guardarCambios(genero: generoCreacionDTO){
    //...guardar los cambios
    this.generosService.crear(genero).subscribe(() => {
      this.router.navigate(['/generos']);
    }, error => this.errores = parseErroresAPI(error)
    );    
  }  
}
