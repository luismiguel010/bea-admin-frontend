import { AuthenticationResponse } from './../models/AuthenticationResponse';
import { AuthenticationRequest } from './../models/AuthenticationRequest';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticationRequest: AuthenticationRequest;
  authenticationResponse: AuthenticationResponse;

  constructor(private authService: AuthService, private router: Router) {
    this.authenticationRequest = new AuthenticationRequest();
    this.authenticationResponse = new AuthenticationResponse();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      swal.fire('Login', 'Hola, ya estás autenticado', 'info');
      this.router.navigate(['/main']);
      console.log("Enter auth service true");
    }
  }

  login(): void {
    if (this.authenticationRequest.username == null || this.authenticationRequest.password == null) {
      swal.fire('Error login', 'Correo o contraseña vacía', 'error')
      return;
    }
    this.authService.login(this.authenticationRequest).subscribe(response => {
      this.authService.saveToken(response.access_token);
      this.router.navigate(['/main']);
    }, err => {
      if (err.status == 400 || err.status == 403) {
        swal.fire('Error login', 'Correo o contraseña incorrectos', 'error');
      }
    })

  }

}
