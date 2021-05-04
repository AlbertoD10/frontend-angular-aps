import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AnalysisService } from '../../services/analysis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss'],
})
export class InfoClientComponent implements OnInit {
  client: any = {};
  html_analysis: any;

  //To pass the html to the parent
  @Output() analysis_event = new EventEmitter();

  constructor(
    private analysis_service: AnalysisService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    if (localStorage.getItem('client')) {
      this.client = JSON.parse(localStorage.getItem('client') || '');
    }
  }

  ngOnInit(): void {}

  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showError(message: string) {
    this.toastr.error(message);
  }
  kmeans() {
    this.spinner.show();

    console.log(this.client.CLIENTNUM);
    this.analysis_service.getKmeans(this.client.CLIENTNUM).subscribe(
      (htmlResult) => {
        this.html_analysis = htmlResult;
        this.analysis_event.emit(this.html_analysis);
        this.spinner.hide();
        this.showSuccess('Análisis generado');
      },
      (err) => {
        console.log(err);
        this.spinner.hide();
        this.showSuccess('Ha ocurrido un error');
      }
    );
  }
}
