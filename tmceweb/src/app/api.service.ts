import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://sua-api-base.com/api'; // coloque a URL base da sua API aqui
  private urlViaCep = 'https://viacep.com.br/ws/'; // URL base para consultas de CEP

  constructor(private http: HttpClient) { }

  // GET genérico - opcional pode receber query params
  get<T>(rota: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.append(key, params[key]);
      });
    }
    return this.http.get<T>(`${this.baseUrl}/${rota}`, { params: httpParams });
  }

  // POST genérico
  post<T>(rota: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${rota}`, body);
  }

  // PUT genérico
  put<T>(rota: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${rota}`, body);
  }

  // DELETE genérico - pode receber id ou rota completa
  delete<T>(rota: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${rota}`);
  }
  buscarCep(cep: string): Observable<any> {
  const url = `${this.urlViaCep}${cep}/json/`;
  return this.http.get<any>(url);
}
}
