import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const URLPOLPULARS = environment.urlPopular;

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  // private baseUrl = URL;
  private baseUrl = URL;
  private baseUrlPopulars = URLPOLPULARS;

  private http = inject(HttpClient);
  private userPremiumStatus = false;

  constructor() {

  }

  getTemplates(category: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${category}/`);
  }


  getPopularTemplates(): Observable<any> {
    return this.http.get(`${this.baseUrlPopulars}/popular-templates`);
  }

  // registerView(templateId: number): Observable<any> {
  //   return this.http.post(`${this.baseUrlPopulars}/register-view/${templateId}`, {});
  // }

  registerView(category: string, id: number): Observable<any> {
    return this.http.post(`${this.baseUrlPopulars}/register-view/${category}/${id}`, {});
  }


  isPremiumUser(): boolean {
    // Simulación; esto debería verificar un token o llamar a un endpoint
    return this.userPremiumStatus;
  }

  setPremiumUserStatus(status: boolean) {
    this.userPremiumStatus = status;
  }


}
