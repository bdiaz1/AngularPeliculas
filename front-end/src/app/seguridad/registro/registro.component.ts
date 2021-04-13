import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { credencialesUsuario } from '../seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private seguridadService: SeguridadService,
    private router: Router) { }

  errores: string[]=[];

  ngOnInit(): void {
  }

  registrar(credencialesUsuario: credencialesUsuario){
    this.seguridadService.registrar(credencialesUsuario).subscribe( respuesta => {
      this.seguridadService.guardarToken(respuesta);
      this.router.navigate(['/']);
    }, errores => this.errores = parseErroresAPI(errores));
  }
}
