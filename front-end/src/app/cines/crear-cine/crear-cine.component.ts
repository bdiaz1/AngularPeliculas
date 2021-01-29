import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cineCreacionDTO } from '../cine';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css']
})
export class CrearCineComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

    guardarCambios(cine: cineCreacionDTO){
    //...guardar los cambios
    // this.router.navigate(['/cines']);
    console.log(cine);
  }
}
