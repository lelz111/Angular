import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Auth {
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-api-key': 'reqres-free-v1',
      'Content-Type': 'application/json'
    });

    return this.http.post('https://reqres.in/api/login', { email, password }, { headers }).pipe(
      tap((res: any) => {
        if (res && res.token) {
          this.token = res.token;
          localStorage.setItem('auth_token', res.token);
        }
      }),
      catchError((err) => {
        console.error('Login error:', err);
        return throwError(() => err); // lempar ke komponen untuk ditangani
      })
    );
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!(this.token || localStorage.getItem('auth_token'));
  }
}
