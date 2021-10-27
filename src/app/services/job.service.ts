import { catchError } from 'rxjs/operators';
import { Job } from './../models/Job';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(protected http: HttpClient, private authService: AuthService, private router: Router) { }

  private isNotAuthorized(e: any): boolean {
    if (e.status == 401 || e.status == 403) {
      this.router.navigate(['/login'])
      return true;
    }
    return false;
  }

  getJobById(idJob: string): Observable<Job> {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    let token = this.authService.getToken();
    if (token != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.http.get<Job>(environment.url_backend + 'job/getById/' + idJob, { headers: httpHeaders }).pipe(
      catchError(e => {
        this.isNotAuthorized(e);
        return throwError(e);
      })
    );
  }
}
