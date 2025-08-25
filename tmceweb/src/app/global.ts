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
  mascararTexto(texto: string): string {
  if (texto.length <= 3) {
    return texto; // se tiver 3 ou menos caracteres, retorna normal
  }
  const primeirosTres = texto.slice(0, 3); // pega os 3 primeiros caracteres
  const mascarado = '*'.repeat(texto.length - 3); // gera os '*' restantes
  return primeirosTres + mascarado;
}
  
}
