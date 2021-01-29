import { Component, OnInit } from '@angular/core';
import { cineCreacionDTO,cineDTO } from '../cine';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor() { }
  
  modelo:cineDTO = {nombre: 'Iztapalapa sur',latitud : 19.393312178709817, longitud : -99.00098276099017};

  ngOnInit(): void {
  }

  guardarCambios(cine: cineCreacionDTO){
    console.log(cine);
  }
}
