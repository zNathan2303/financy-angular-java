import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { User } from './user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<User>('/financy/v1/user').pipe(
      tap((res) => {
        localStorage.setItem('user-info', JSON.stringify(res));
      }),
    );
  }
}
