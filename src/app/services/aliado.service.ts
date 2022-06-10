import { environment } from './../../environments/environment';
import { Aliado } from './../models/aliado';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AliadoService {

  constructor(protected http: HttpClient, private authService: AuthService, private router: Router) {
  }

  private isNotAuthorized(e: any): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('username:password'));
  }

  save_aliado(aliado: Aliado, file: File): Observable<any> {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    let token = this.authService.getToken();
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    let formdata: FormData = new FormData();
    const fileData = new Blob([file], { type: "multipart/form-data" })
    formdata.append('file', fileData, file.name);
    const aliadoJson = new Blob([JSON.stringify(aliado)], { type: "application/json" });
    formdata.append('aliado', aliadoJson);

    return this.http.post(environment.url_backend + "aliado/save", formdata, {
      headers: httpHeaders,
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  getAllAliado(): Observable<any> {
    return this.http.get(environment.url_backend + 'aliado/getAll').pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  deleteAliado(idAliado: string): Observable<any> {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    let token = this.authService.getToken();
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.http.delete(environment.url_backend + 'aliado/delete/' + idAliado, {
      headers: httpHeaders,
    }).pipe(
      catchError(e => {
        return throwError(e)
      })
    )
  }


}
