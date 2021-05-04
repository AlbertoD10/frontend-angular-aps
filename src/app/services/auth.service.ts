import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = `http://localhost:3001/api/v1`;
  dateTime = Date.now();
  currentTime = Math.floor(this.dateTime / 1000);

  constructor(private http: HttpClient, private router: Router) {}

  signUpUser(user: any) {
    return this.http.post<any>(this.url + '/sign-up', user);
  }

  loginUser(user: any) {
    return this.http.post<any>(this.url + '/login', user);
  }

  //To verify if the user is logged
  isLogged() {
    const accessToken = this.getAcessToken();

    if (accessToken) {
      const decoded: any = jwtDecode(accessToken);

      //Check if the token is expired
      if (this.currentTime >= decoded.exp) {
        console.log('Expiro el token y verifico con el refresh');
        const refreshToken = this.checkRefreshToken(this.getRefreshToken());

        console.log(refreshToken);

        //If my refresh is false, then i logout
        if (!refreshToken) {
          return false;
        }
        //else keep the session
        return true;
      } else {
        return true;
      }
    }

    //If no token, return false
    return false;
  }

  logout() {
    this.router.navigate(['']);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('client');
  }

  checkRefreshToken(refreshToken: any) {
    return this.http
      .post(this.url + '/refresh-access-token', { refreshToken })
      .subscribe(
        (res: any) => {
          if (res.status === 200) {
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('refreshToken', res.refreshToken);
            return true;
          } else {
            return false;
          }
        },
        (err: any) => {
          return false;
        }
      );
  }

  decodeToken(token: any) {
    return jwtDecode(token);
  }

  getAcessToken() {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
}
