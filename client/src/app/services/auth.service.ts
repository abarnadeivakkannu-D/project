import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setLoginStatus(status: boolean) {
    localStorage.setItem('isLoggedIn', String(status));
  }

  getLoginStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  }
}


