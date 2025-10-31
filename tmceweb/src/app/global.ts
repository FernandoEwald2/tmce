import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class Global {
  listaPerfis = [
    { id: 0, value: 'Administrador' },
    { id: 1, value: 'Usuario' },
  ];
  gerarMD5(texto: string): string {
    return CryptoJS.MD5(texto).toString(CryptoJS.enc.Hex);
  }
  async setTokenUsuario(token: string) {
    await localStorage.setItem('token', token);
  }
  getTokenUsuario(): string | null {
    return localStorage.getItem('token');
  }
  deleteTokenUsuario() {
    localStorage.removeItem('token');
  }
  async setUsuarioLogado(usuario: string) {
    await localStorage.setItem('usuario', usuario);
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
  formatarTelefone(tel: string): string {
    if (!tel) return '';

    // Remove tudo que não é número
    const numeros = tel.replace(/\D/g, '');

    // Aplica a máscara (00) 0 0000 0000
    if (numeros.length === 11) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 3)} ${numeros.slice(
        3,
        7
      )} ${numeros.slice(7, 11)}`;
    }

    return tel; // retorna como está se não tiver 11 dígitos
  }
  gerarMd5(texto: string): string {
    return CryptoJS.MD5(texto).toString(CryptoJS.enc.Hex);
  }
  async logout() {
    await localStorage.clear();   
  }
  listaQuantidadeItensPorPagina = [  
    { value: 1, label: '1' },  
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 50, label: '50' },
    { value: 100, label: '100' },
  ];
}
