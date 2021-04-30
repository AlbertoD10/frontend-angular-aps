import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  user = {};
  public isMenuCollapsed = true;

  constructor(private authService: AuthService) {
    const lolazo: any = this.authService.decodeToken(
      localStorage.getItem('accessToken')
    );
    this.user = lolazo.name;
  }

  logout() {
    this.authService.logout();
  }
  // assignName() {
  //   const token = this.authService.decodeToken(
  //     localStorage.getItem('accessToken')
  //   );
  //   console.log(token);
  // }
  ngOnInit(): void {}
}
