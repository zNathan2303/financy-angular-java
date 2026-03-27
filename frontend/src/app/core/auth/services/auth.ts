import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/login';
import { tap } from 'rxjs';
import { RegisterRequest, RegisterResponse } from '../models/register';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}

  login({ email, password }: LoginRequest, rememberMe: boolean) {
    return this.http.post<LoginResponse>('/financy/v1/auth/login', { email, password }).pipe(
      tap((res) => {
        if (rememberMe) {
          localStorage.setItem('token', res.token);
        } else {
          sessionStorage.setItem('token', res.token);
        }
      }),
    );
  }

  register({ name, email, password }: RegisterRequest) {
    return this.http.post<RegisterResponse>('/financy/v1/auth/register', { name, email, password });
  }

  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
