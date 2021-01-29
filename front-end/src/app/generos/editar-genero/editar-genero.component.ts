import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent {

  modelo: generoCreacionDTO = {nombre: 'Drama'};

  constructor(private router: Router) { }

  guardarCambios(genero: generoCreacionDTO){
    //...guardar los cambios
    console.log(genero);
    this.router.navigate(['/generos']);
  }

}
