import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  private url_kmeans = 'http://localhost:4001/kmeans/';
  private url_analysis = 'http://localhost:4001/exploratory-analysis';

  constructor(private http: HttpClient) {}

  getKmeans(client_num: any) {
    return this.http.get(this.url_kmeans + client_num, {
      responseType: 'text',
    });
  }
  getExploratoryAnalysis() {
    return this.http.get(this.url_analysis, {
      responseType: 'text',
    });
  }

  storedClient() {
    return localStorage.getItem('client');
  }
}
