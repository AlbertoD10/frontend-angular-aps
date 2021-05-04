import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalysisService } from 'src/app/services/analysis.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  user = {};

  constructor(private authService: AuthService, private router: Router) {
    const user_name: any = this.authService.decodeToken(
      localStorage.getItem('accessToken')
    );
    this.user = user_name.name;
  }

  logout() {
    this.authService.logout();
  }

  analysis_service() {
    this.router.navigate(['/analysis']);
  }
  ngOnInit(): void {}
}
