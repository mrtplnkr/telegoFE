import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api/';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getItemsByUserId(userId: number): Observable<any> {
    return this.http.get(`${API_URL}items/${userId}`, {
      // responseType: 'text',
      headers: {
        token:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3MjMwMjU2MjEsImV4cCI6MTcyMzAyNjUyMX0.sc9cDtWL_5miYbPGHzM0E4RVIPSgItyMkFGlcQVcJOM',
      },
    });
  }
}
