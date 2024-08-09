import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const AUTH_API = 'http://localhost:4200/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signin(username: string, password: string) {
    return this.http.post(`${AUTH_API}auth/signin`, {
      email: 'test@gmail.com',
      password: '123password',
    });
  }
}
