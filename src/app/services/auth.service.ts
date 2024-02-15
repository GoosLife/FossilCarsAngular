import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;
  private role: string | null = null;

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:3000/login', { username, password }, { headers: { 'Access-Control-Allow-Origin': '*' } })
        .subscribe({
          next: (data: any) => {
            if (data.isAuthenticated) {
              this.isLoggedIn = true;
              this.role = data.role;
              console.log('Logged in as:', data.role);
              resolve(true);
            } else {
              this.isLoggedIn = false;
              resolve(false);
            }
          },
          error: (error) => {
            console.error('Login error:', error);
            reject(error);
          }
        });
    });
  }

  logout() {
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  hasRole(role: string): boolean {
    console.log('Current role: ' + this.role + ', required role: '+ role);
    return this.role === role;
  }
}
