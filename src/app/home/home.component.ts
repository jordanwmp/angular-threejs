import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menu:any[] = [
    {
      label: 'Movimento câmera',
      url: '',
    },
    {
      label: 'Modelo Sol',
      url: '',
    },
    {
      label: 'Animação Sol',
      url: '',
    },
    {
      label: 'Move Light with mouse',
      url: '/move-light',
    },
    {
      label: 'Movimentar objeto',
      url: '/movimentar-objeto',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
