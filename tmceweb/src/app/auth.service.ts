import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(@Inject(Router) private router: Router) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenValid(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp;

      if (!exp) {
        return false;
      }

      const tokenDate = new Date(decoded.exp * 1000);
      const now = new Date();
      tokenDate.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);

      if (tokenDate.toDateString() !== now.toDateString()) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Token inválido:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
