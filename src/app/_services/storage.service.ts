import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

export type TokenDetails = {
  access_token: string;
  id: number;
};

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    const user = window.sessionStorage.getItem(USER_KEY);
    console.log('user', user);
    if (user) {
      return JSON.parse(user);
    }
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    console.log('logged', user);

    if (user) {
      return true;
    }

    return false;
  }
}
