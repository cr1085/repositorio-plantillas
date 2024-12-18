import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://cli3cb.3cbsoluciones.com'; // URL del backend
  private tokenKey = 'authToken'; // Clave para almacenar el token en localStorage
  private userKey = 'authUser';
  // BehaviorSubject para manejar el estado de autenticación
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Observable expuesto al resto de la app

  constructor(private http: HttpClient) { }

  /**
   * Método para registrar un usuario
   * @param userData - Objeto con email y password
   */
  register(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  /**
   * Método de inicio de sesión
   * @param credentials - Objeto con email y password
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, JSON.stringify(response.user));
          this.isAuthenticatedSubject.next(true); // Actualiza estado
        }
      })
    );
  }

  /**
   * Método para cerrar sesión
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Devuelve si el usuario está autenticado
   */
  isLoggedIn(): boolean {
    return this.hasToken();
  }

  /**
   * Obtiene el token actual
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  /**
 * Verifica si el usuario es premium
 */
  isPremiumUser(): boolean {
    const user = this.getUser(); // Recupera el usuario desde localStorage
    return user?.premium || false; // Devuelve true si el usuario tiene la propiedad premium en true
  }

  
  /**
   * Verifica si existe un token en localStorage
   */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
