import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO,cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  modelo!: cineDTO;
  errores: string[]=[];

  constructor(private router: Router, 
    private cineService : CinesService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {    
    this.activatedRoute.params.subscribe(params => {
      this.cineService.obtenerPorId(params.id).subscribe(cine => {
        this.modelo = cine;
      }, () => this.router.navigate(['/cines']))
    });
  }

  guardarCambios(cine: cineCreacionDTO){
    this.cineService.editar(this.modelo.id,cine).subscribe(() =>{
      this.router.navigate(['/cines']);
    }, error => this.errores = parseErroresAPI(error));
    
  }
}
