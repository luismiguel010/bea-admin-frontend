import { AuthenticationRequest } from './../models/AuthenticationRequest';
import { AuthenticationResponse } from './../models/AuthenticationResponse';
import { Injectable } from '@angular/core';
import { Admin } from '../models/Admin';
import { Observable } from 'rxjs';
import { sha256 } from 'js-sha256';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticationResponse: AuthenticationResponse;
  private authenticationRequest: AuthenticationRequest;
  private admin!: Admin;
  private token!: string;

  constructor(private http: HttpClient) {
    this.authenticationResponse = new AuthenticationResponse();
    this.authenticationRequest = new AuthenticationRequest();
  }

  public getAdmin(): Admin {
    if (this.admin != null) {
      return this.admin;
    } else if (this.admin == null && sessionStorage.getItem('admin') != null) {
      this.admin = JSON.parse(sessionStorage.getItem('admin') || '{}') as Admin;
      return this.admin;
    }
    return new Admin();
  }

  public getToken(): any {
    if (this.token != null) {
      return this.token;
    } else if (this.token == null && sessionStorage.getItem('token') != null) {
      this.token = sessionStorage.getItem('token') || '{}';
      return this.token;
    } else {
      return null;
    }
  }

  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    this.authenticationRequest.username = authenticationRequest.username;
    this.authenticationRequest.password = sha256(authenticationRequest.password);
    return this.http.post<AuthenticationResponse>(environment.url_backend, this.authenticationRequest);
  }

  saveToken(accessToken: string): void {
    this.token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  getDataToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    } else {
      return null;
    }
  }


}
