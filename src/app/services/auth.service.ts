import { AuthenticationRequest } from './../models/AuthenticationRequest';
import { AuthenticationResponse } from './../models/AuthenticationResponse';
import { Injectable } from '@angular/core';
import { Admin } from '../models/Admin';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticateResponse: AuthenticationResponse;
  private admin!: Admin;
  private token!: string;

  constructor() {
    this.authenticateResponse = new AuthenticationResponse();
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

  public getToken(): string {
    if (this.token != null) {
      return this.token;
    } else if (this.token == null && sessionStorage.getItem('token') != null) {
      this.token = sessionStorage.getItem('token') || '{}';
      return this.token;
    }
    return '';
  }


}
