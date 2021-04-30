import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss'],
})
export class InfoClientComponent implements OnInit {
  client: any = {};
  constructor() {
    if (localStorage.getItem('client')) {
      this.client = JSON.parse(localStorage.getItem('client') || '');
    }
  }

  ngOnInit(): void {}
}
