import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { actorCreacionDTO } from '../actor';

@Component({
  selector: 'app-crear-actor',
  templateUrl: './crear-actor.component.html',
  styleUrls: ['./crear-actor.component.css']
})
export class CrearActorComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

    guardarCambios(actor: actorCreacionDTO){
    //...guardar los cambios
    // this.router.navigate(['/actores']);
    console.log(actor);
  }
}
