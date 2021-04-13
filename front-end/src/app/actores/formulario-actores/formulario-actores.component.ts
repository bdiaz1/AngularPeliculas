import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO,actorDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form!: FormGroup;

  @Input()
  errores: string[]=[];

  @Input()
  modelo:actorDTO | any;

  @Output()
  submitEvent: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

  imagenCambiada = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      fechaNacimiento: '',
      foto: '',
      biografia : ''
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  onSubmit(){
    if(!this.imagenCambiada){
      this.form.patchValue({'foto':null});
    }
    this.submitEvent.emit(this.form.value);
  }

  archivoSeleccionado(file:File){
    this.imagenCambiada = true;
    this.form.get('foto')?.setValue(file);
  }

  cambioMarkDown(texto:string){
    this.form.get('biografia')?.setValue(texto);
  }
}
