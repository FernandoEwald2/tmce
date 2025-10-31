import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Global } from 'src/app/global';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:44325'; // URL base da sua API
  private urlViaCep = 'https://viacep.com.br/ws/'; // URL base para consultas de CEP

  constructor(
    private http: HttpClient,
    private global: Global,
    private router: Router
  ) {}

  private tratarErro(error: HttpErrorResponse) {
    let mensagem = 'Ocorreu um erro inesperado.';

    if (error.error?.mensagem) {
      mensagem = error.error.mensagem;
    } else if (error.status === 0) {
      mensagem = 'Não foi possível conectar ao servidor.';
    } else if (error.status === 400 || error.status === 401) {
      mensagem =  'Usuário não autenticado ou sessão expirada. Por favor, faça login novamente.';
      this.global.logout();
      this.router.navigate(["/login"]);
    }

    return throwError(() => new Error(mensagem));
  }

  // GET genérico
  get<T>(rota: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        httpParams = httpParams.append(key, params[key]);
      });
    }
    return this.http
      .get<T>(`${this.baseUrl}/${rota}`, {
        params: httpParams,
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `${this.global.getTokenUsuario()}`),
      })
      .pipe(catchError((error) => this.tratarErro(error))); 
  }

  // POST genérico
  post<T>(rota: string, body: any): Observable<T> {
    return this.http
      .post<T>(`${this.baseUrl}/${rota}`, body, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `${this.global.getTokenUsuario()}`),
      })
      .pipe(catchError((error) => this.tratarErro(error))); 
  }

  // PUT genérico
  put<T>(rota: string, body: any): Observable<T> {
    return this.http
      .put<T>(`${this.baseUrl}/${rota}`, body, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `${this.global.getTokenUsuario()}`),
      })
      .pipe(catchError((error) => this.tratarErro(error))); 
  }

  // DELETE genérico
  delete<T>(rota: string): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${rota}`, {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `${this.global.getTokenUsuario()}`),
      })
      .pipe(catchError((error) => this.tratarErro(error))); 
  }

  buscarCep(cep: string): Observable<any> {
    const url = `${this.urlViaCep}${cep}/json/`;
    return this.http.get<any>(url).pipe(catchError((error) => this.tratarErro(error))); 
  }
}
