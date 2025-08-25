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
  cpfMask(cpf: any) {
    // Remove todos os caracteres não numéricos
    var v = cpf.value;
   
   if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
      cpf.value = v.substring(0, v.length-1);
      return;
   }
   
   cpf.setAttribute("maxlength", "14");
   if (v.length == 3 || v.length == 7) cpf.value += ".";
   if (v.length == 11) cpf.value += "-";

  }
}
