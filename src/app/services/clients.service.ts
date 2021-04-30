import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private url = 'http://localhost:3001/api/v1/client/';
  private httpHeaders = new HttpHeaders();
  private headers: any;

  constructor(private http: HttpClient, private router: Router) {
    this.headers = this.httpHeaders.set('Content-Type', 'application/json');
    this.headers = this.httpHeaders.set(
      'Authorization',
      `${localStorage.getItem('accessToken')}`
    );
  }

  getClient(id: any) {
    return this.http.get<any>(this.url + id, { headers: this.headers });
    // .pipe(
    //   map((result) => {
    //     console.log(result);

    //     return result;
    //   })
    // );
  }

  storedClient() {
    return localStorage.getItem('client');
  }
}
