import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  modelo: actorDTO = {nombre: 'Felipe', fechaNacimiento: new Date(), biografia: '# biografia',
  foto: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/16A28/production/_110221729_driver_reu.jpg'};

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      // alert(params.id);
    });
  }

  guardarCambios(actor: actorCreacionDTO){
    console.log(actor);
  }

}
