import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Capacitacion } from './../models/Capacitacion';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CapacitacionService {

  constructor(protected http: HttpClient, private authService: AuthService, private router: Router) { }

  private isNotAuthorized(e: any): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getCapacitacionById(idCapacitacion: string): Observable<Capacitacion> {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    let token = this.authService.getToken();
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.http.get<Capacitacion>(environment.url_backend + 'capacitacion/getById' + idCapacitacion, { headers: httpHeaders }).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }

  getAllCapacitaciones(): Observable<Capacitacion[]> {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    let token = this.authService.getToken();
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.http.get<Capacitacion[]>(environment.url_backend + 'capacitacion/getAll', { headers: httpHeaders }).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }

  updateCapacitacion(capacitacion: Capacitacion) {
    let httepHeaders: HttpHeaders = new HttpHeaders();
    let token = this.authService.getToken();
    if (token != null) {
      httepHeaders = httepHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.http.put(environment.url_backend + 'capacitacion/update', capacitacion, { headers: httepHeaders }).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }

  createCapacitacion(capacitacion: Capacitacion) {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    let token = this.authService.getToken();
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.http.post(environment.url_backend + 'capacitacion/save', capacitacion, { headers: httpHeaders }).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }

  deleteCapacitacion(id: string) {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    let token = this.authService.getToken();
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.http.delete(environment.url_backend + 'capacitacion/delete/' + id, {
      headers: httpHeaders,
    }).pipe(
      catchError(e => {
        return throwError(e)
      })
    )
  }
}
