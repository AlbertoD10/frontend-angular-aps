import { Component, OnInit } from '@angular/core';
import { AnalysisService } from '../../services/analysis.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exploratory-analysis',
  templateUrl: './exploratory-analysis.component.html',
  styleUrls: ['./exploratory-analysis.component.scss'],
})
export class ExploratoryAnalysisComponent implements OnInit {
  html_analysis: any;
  constructor(
    private analysis_service: AnalysisService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.analysis_service.getExploratoryAnalysis().subscribe(
      (res) => {
        this.html_analysis = res;
        this.spinner.hide();
        this.showSuccess('Análisis generado');
      },
      (err) => {
        this.showSuccess('Ha ocurrido un error');
      }
    );
  }
  showSuccess(message: string) {
    this.toastr.success(message);
  }
  showError(message: string) {
    this.toastr.error(message);
  }
  back() {
    this.router.navigate(['/admin']);
  }
}
