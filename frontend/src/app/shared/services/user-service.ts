import { Injectable } from '@angular/core';
import { User } from '../../core/services/user/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUserInfo() {
    const userInString = localStorage.getItem('user-info');

    if (!userInString) return;

    const userInJson: User = JSON.parse(userInString);

    return userInJson;
  }

  clearUser() {
    localStorage.removeItem('user-info');
  }
}
