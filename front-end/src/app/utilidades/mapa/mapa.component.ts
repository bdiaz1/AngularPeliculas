import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tileLayer, latLng, LeafletMouseEvent, Marker, marker } from 'leaflet';
import { Coordenada, CoordenadaConMensaje } from './coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }

  @Input()
  coordenadasIniciales: CoordenadaConMensaje[] = [];

  @Input()
  soloLectura:boolean =false;

  @Output()
  coordenadaSeleccionada: EventEmitter<CoordenadaConMensaje> = new EventEmitter<CoordenadaConMensaje>();

  options = {
	  layers: [
		  tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
	  zoom: 14,
	  center: latLng(19.393312178709817, -99.00098276099017)
  };

  capas:Marker<any>[]=[];

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map((valor) => {
      let marcador = marker([valor.latitud,valor.longitud]);
      if(valor.mensaje){
        marcador.bindPopup(valor.mensaje, {autoClose: false, autoPan: false});
      }
      return marcador;
    });
  }

  manejarClick(event: LeafletMouseEvent){
    if(!this.soloLectura){
      const latitud = event.latlng.lat;
      const longitud = event.latlng.lng;
      // console.log({latitud,longitud});

      this.capas=[];
      this.capas.push(marker([latitud,longitud]));

      this.coordenadaSeleccionada.emit({latitud:latitud,longitud:longitud,mensaje:''});
    }    
  }

}
