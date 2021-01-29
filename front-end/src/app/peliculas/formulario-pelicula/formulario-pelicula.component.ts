import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/multipleSelectorModel';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form!:FormGroup;

  @Input()
  modelo!: PeliculaDTO;

  generosNoSeleccionados:MultipleSelectorModel[]=[
    {llave: 1, valor:'Drama'},
    {llave: 2, valor:'Comedia'},
    {llave: 3, valor:'Accion'},
    {llave: 4, valor:'Amor'}
  ];

  generosSeleccionados: MultipleSelectorModel[]=[];

  cinesNoSeleccionados:MultipleSelectorModel[]=[
    {llave: 1, valor:'Neza'},
    {llave: 2, valor:'Chalco'},
    {llave: 3, valor:'Los reyes'},
    {llave: 4, valor:'Benito'}
  ];

  cinesSeleccionados: MultipleSelectorModel[]=[];

  @Output()
  OnSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter<PeliculaCreacionDTO>();

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: [
        '',
        {
          validators: [Validators.required]
        }
      ],
      resumen:'',
      enCines: false,
      trailer:'',
      fechaLanzamiento:'',
      poster:'',
      generosId: '',
      cinesId:''
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambios(){
    const generosIds = this.generosSeleccionados.map(val => val.llave);
    this.form.get('generosId')?.setValue(generosIds);

    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    this.form.get('cinesId')?.setValue(cinesIds);

    this.OnSubmit.emit(this.form.value);
  }

  archivoSeleccionado(archivo: File){
    this.form.get('poster')?.setValue(archivo);
  }

  changeMarkdown(texto:any){
    this.form.get('resumen')?.setValue(texto);
  }
}
