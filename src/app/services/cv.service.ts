import { catchError } from 'rxjs/operators';
import { Cv } from './../models/Cv';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(protected http: HttpClient, private authService: AuthService, private router: Router) { }

  private isNotAuthorized(e: any): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getCvByIdUser(idUser: string): Observable<Cv> {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    let token = this.authService.getToken();
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.http.get<Cv>(environment.url_backend + 'cv/getByIdUser/' + idUser, { headers: httpHeaders }).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    )
  }
}
