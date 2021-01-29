import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-generico',
  templateUrl: './listado-generico.component.html',
  styleUrls: ['./listado-generico.component.css']
})
export class ListadoGenericoComponent implements OnInit {

  @Input()
  listado: { title: string; launchDate: Date; price: number; }[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  // remover(indicePelicula: number){
  //   this.listado?.splice(indicePelicula,1);
  // }

}
