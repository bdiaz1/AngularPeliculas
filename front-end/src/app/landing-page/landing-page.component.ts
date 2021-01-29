import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

ngOnInit(): void {
      this.peliculasEnCines = [{
        title: 'Spider-Man Home Coming',
        launchDate: new Date(),
        price: 1400.98,
        poster: 'https://i.pinimg.com/originals/5c/4e/f9/5c4ef91ea10d83196d89cf2aa7a02728.jpg'
      },{
        title: 'Moana',
        launchDate: new Date('2016-11-14'),
        price: 300.98,
        poster: 'https://i.pinimg.com/originals/e0/ae/48/e0ae489f31577f6c185ee9b13f39582c.jpg'
      }];

      this.peliculasProximas = [];
      // this.peliculasProximas = [{
      //   title: 'Spider-Man',
      //   launchDate: new Date(),
      //   price: 1400.98
      // },{
      //   title: 'Moana',
      //   launchDate: new Date('2016-11-14'),
      //   price: 300.98
      // }];
  }

  peliculasEnCines: { title: string; launchDate: Date; price: number; poster:string; }[] | undefined;
  peliculasProximas: { title: string; launchDate: Date; price: number;poster:string; }[] | undefined;


}
