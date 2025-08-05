import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class Global {
  gerarMD5(texto: string): string {
    return CryptoJS.MD5(texto).toString(CryptoJS.enc.Hex);
  }
  setTokenUsuario(token: string): void {
    localStorage.setItem('token', token);
  }
  getTokenUsuario(): string | null {
    return localStorage.getItem('token');
  }
  deleteTokenUsuario(): void {
    localStorage.removeItem('token');
  }
  setUsuarioLogado(usuario: string): void {
    localStorage.setItem('usuario', usuario);
  }
  getUsuarioLogado(): string | null {
    return localStorage.getItem('usuario');
  }
  deleteUsuarioLogado(): void {
    localStorage.removeItem('usuario');
  }
  
}
