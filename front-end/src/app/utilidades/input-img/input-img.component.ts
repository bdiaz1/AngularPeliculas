import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toBase64 } from '../utilidades';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  imagenBase64!: string;

  @Input()
  urlImagenActual:string | any;

  @Output()
  archivoSeleccionado: EventEmitter<File> = new EventEmitter<File>();

  change(event:any){
    if(event.target.files.length > 0){
      console.log(event);
      const file: File=event.target.files[0];
      toBase64(file).then((value: string | any) => this.imagenBase64 = value)
      .catch(error => console.log(error));
      this.archivoSeleccionado.emit(file);
      this.urlImagenActual = null;
    }
  }

}
