import { AbstractControl, ValidatorFn } from "@angular/forms";
import {ValueConverter} from '@angular/compiler/src/render3/view/template'

export function primeraLetraMayuscula(): ValidatorFn {
    return (control: AbstractControl):any => {
        const valor = <string>control.value;

        if(!valor) return;
        if(valor.length === 0) return;

        const primeraLetra = valor[0];
        if(primeraLetra !== primeraLetra.toUpperCase()){
            return {
                primeraLetraMayuscula: {
                    mensaje: 'La primera letra debe ser mayúscula'
                }
            };
        }
        return;
    }
}