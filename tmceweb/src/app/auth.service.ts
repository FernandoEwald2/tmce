import { Global } from 'src/app/global';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(@Inject(Router) private router: Router, private global: Global) {}

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

      // exp está em segundos → converter para ms
      const expirationDate = new Date(exp * 1000);
      const now = new Date();

      if (expirationDate <= now) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {      
      return false;
    }
  }

  logout(): void {
    this.global.logout();   
    this.router.navigate(['/login']);
  }
}
