import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/auth'; 
  private usersUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  register(formValues: AppUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formValues);
  }
  login(user: AppUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  isLogged(): boolean {
    return localStorage.getItem("user_token") !== null;
  }

  getUsers(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(this.usersUrl)
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching users:', error);
          throw error;
        })
      );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${userId}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting user:', error);
          throw error;
        })
      );
  }
}
