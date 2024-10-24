import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppUser } from '../models/user.model';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:3000'; // Usa el root directamente

  constructor(private http: HttpClient) { }

  register(formValues: AppUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, formValues); // Cambia a /users
  }
  
  login(user: AppUser): Observable<any> {
    return this.http.get<any[]>(`http://localhost:3000/users?email=${user.email}&password=${user.password}`).pipe(
      map(users => {
        if (users.length > 0) {
          return { success: true, user: users[0] }; // Usuario encontrado
        } else {
          throw new Error('Credenciales inválidas');
        }
      }),
      catchError((error) => {
        console.error('Error en el login:', error);
        return throwError(error);
      })
    );
  }
  
  
  isLogged(): boolean {
    return localStorage.getItem("user_token") !== null;
  }

  getUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.apiUrl}/users`)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching users:', error);
          throw error;
        })
      );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting user:', error);
          throw error;
        })
      );
  }
}
