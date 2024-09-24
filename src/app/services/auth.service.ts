import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isAuthenticatedKey = 'isAuthenticated';

  constructor() { }

  // Establece el estado de autenticación del usuario
  setAuthenticated(isAuthenticated: boolean): void {
    localStorage.setItem(this.isAuthenticatedKey, JSON.stringify(isAuthenticated));
  }

  // Obtiene el estado de autenticación del usuario
  isAuthenticated(): boolean {
    const authState = localStorage.getItem(this.isAuthenticatedKey);
    return authState ? JSON.parse(authState) : false;
  }

  // Elimina el estado de autenticación, lo que equivaldría a cerrar sesión
  logout(): void {
    localStorage.removeItem(this.isAuthenticatedKey);
  }
}
