import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthToken} from "./auth-token";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {AuthResponse} from "./auth-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "https://labjwt.zecer.wi.zut.edu.pl/api"

  constructor(
    private jwtHelper: JwtHelperService,
    private http: HttpClient
  ) { }

  public isAuthenticated() {
    return !this.jwtHelper.isTokenExpired()
  }

  public isAdmin() {
    const token = this.jwtHelper.decodeToken() as AuthToken;
    if (!this.isAuthenticated()) {
      return false;
    }
    return token && token.roles && token.roles.includes('ADMIN');
  }

  public getUsername() {
    const token = this.jwtHelper.decodeToken() as AuthToken;
    return token?.sub;
  }

  public login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, {username, password})
      .pipe(
        tap(response => {
          console.log("login() response: " + response)
          if (response.token) {
            localStorage.setItem('access_token', response.token)
          } else {
            localStorage.removeItem('access_token')
          }
        })
      )
  }

  public logout() {
    localStorage.removeItem('access_token');
  }
}
