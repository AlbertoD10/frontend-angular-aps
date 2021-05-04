import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
  constructor() {}
  event_analysis: any;

  getAnalysis(analysis: any) {
    this.event_analysis = analysis;
  }

  ngOnInit(): void {}
}
