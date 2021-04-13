import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseErroresAPI } from 'src/app/utilidades/utilidades';
import { SeguridadService } from '../seguridad.service';
import { credencialesUsuario} from '../seguridad'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private seguridadService: SeguridadService,
    private router: Router) { }

    errores: string[]=[];

  ngOnInit(): void {
  }

  login(credencialesUsuario: credencialesUsuario){
    this.seguridadService.login(credencialesUsuario).subscribe( respuesta => {
      this.seguridadService.guardarToken(respuesta);
      this.router.navigate(['/']);
    }, errores => this.errores = parseErroresAPI(errores));
  }
}
