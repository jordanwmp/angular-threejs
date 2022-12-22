import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menu:any[] = [
    {
      label: 'Move camera',
      url: '',
    },
    {
      label:'Solar System',
      url:'/solar-system'
    },
    {
      label: 'Sun',
      url: '/sun',
    },
    {
      label: 'Sun animation',
      url: '',
    },
    {
      label: 'Move Light with mouse',
      url: '/move-light',
    },
    {
      label: 'Move object',
      url: '/movimentar-objeto',
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
