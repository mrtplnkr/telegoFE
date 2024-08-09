import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenDetails } from './storage.service';

const API_URL = 'http://localhost:4200/api/';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getItemsByUserId(userId: number, token: string): Observable<any> {
    return this.http.get(`${API_URL}items/${userId}`, {
      // responseType: 'text',
      headers: {
        token: `Bearer ${token}`,
      },
    });
  }

  createNewItem(newItem: string, token: TokenDetails) {
    console.log('newItem', newItem, token);

    return this.http.post(
      `${API_URL}items/create`,
      {
        text: newItem,
        userId: token.id,
      },
      {
        headers: {
          token: `Bearer ${token.access_token}`,
        },
      }
    );
  }

  updateItem(id: number, token: any) {
    return this.http.patch(
      `${API_URL}items/${id}`,
      {
        done: true,
      },
      {
        headers: {
          token: `Bearer ${token.access_token}`,
        },
      }
    );
  }

  deleteItem(id: number, token: TokenDetails) {
    return this.http.delete(`${API_URL}items/${id}`, {
      headers: {
        token: `Bearer ${token.access_token}`,
      },
    });
  }
}
