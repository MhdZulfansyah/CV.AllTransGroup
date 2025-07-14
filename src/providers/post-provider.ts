import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // pastikan ini ada agar bisa digunakan global
})
export class PostProvider {

  // Sesuaikan URL lokal atau server hosting kamu
  // server: string = 'https://tis1.itbi.ac.id/api/'; // untuk production
  server: string = 'https://transgroup.aplikasi.blog/'; // untuk development lokal

  constructor(public http: HttpClient) {}

  postData(body: any, file: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    return this.http.post(this.server + file, JSON.stringify(body), options);
  }
}
 