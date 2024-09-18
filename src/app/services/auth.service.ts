import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private tokenKey = 'authToken';

    constructor() { }
    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
      }
    
      getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
      }


  removeToken() {
    localStorage.removeItem('user_token');
  }

  

 isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
