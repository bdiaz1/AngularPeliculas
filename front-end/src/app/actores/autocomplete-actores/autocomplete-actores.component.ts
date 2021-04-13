import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { actorPeliculaDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  constructor(private actoresService: ActoresService) { }

  control: FormControl = new FormControl();

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] = [];

  columnasAMostrar= ['imagen','nombre','personaje','acciones'];

  actoresAMostrar: actorPeliculaDTO[] = [];

  @ViewChild(MatTable) 
  table!: MatTable<any>;

  ngOnInit(): void {
    // this.control.valueChanges.subscribe(nombre => {
    //     this.actoresService.obtenerPorNombre(nombre).subscribe( actores => {
    //       this.actoresAMostrar = actores;
    //     });
    //   });
    this.control.valueChanges.subscribe((nombre) => {
      if (typeof nombre === 'string' && nombre) {
        this.actoresService.obtenerPorNombre(nombre).subscribe(
          (actores) => (this.actoresAMostrar = actores),
          (error) => console.error(error)
        );
      }
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');

    if(this.table !== undefined){
      this.table.renderRows();
    }
  }

  eliminar(elemento:any){
    const indice = this.actoresSeleccionados.findIndex((a:any) => a.nombre === elemento.nombre);
    this.actoresSeleccionados.splice(indice,1);
    this.table.renderRows();
  }

  finalizaArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(
      (actor:any) => actor === event.item.data
    );
    moveItemInArray(this.actoresSeleccionados,indicePrevio,event.currentIndex);
    this.table.renderRows();
  }
}
