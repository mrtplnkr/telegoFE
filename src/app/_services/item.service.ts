import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService, TokenDetails } from './storage.service';

const API_URL = 'http://localhost:4200/api/';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  getItemsByUserId(): Observable<any> {
    const token = this.storage.getUser();

    return this.http.get(`${API_URL}items/${token.id}`, {
      // responseType: 'text',
      headers: {
        token: `Bearer ${token}`,
      },
    });
  }

  createNewItem(newItem: string) {
    const token = this.storage.getUser();
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

  updateItem(id: number) {
    const token = this.storage.getUser();
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

  deleteItem(id: number) {
    const token = this.storage.getUser();
    return this.http.delete(`${API_URL}items/${id}`, {
      headers: {
        token: `Bearer ${token.access_token}`,
      },
    });
  }
}
