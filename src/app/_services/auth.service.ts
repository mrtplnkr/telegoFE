import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signin(username: string, password: string): Observable<any> {
    return this.http
      .post(`http://localhost:3000/api/auth/signin`, {
        email: username,
        password,
      })
      .pipe(map((res) => res));
  }
}
