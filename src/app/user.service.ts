import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class UserService {
  private isUserLoggedIn: boolean;
  public username: string;

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
  }
  setUserLoggedIn() {
    this.isUserLoggedIn = true;
    this.username = 'admin';
  }
  checkLogin(formLogin) {
    const url = 'http://localhost:3000/login';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(formLogin);
    return this.http.post(url, body, {headers});
  }
  getUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }
}
