import { AuthenticationResponse } from './../models/AuthenticationResponse';
import { AuthenticationRequest } from './../models/AuthenticationRequest';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticationRequest: AuthenticationRequest;
  authenticationResponse: AuthenticationResponse;

  constructor(private authService: AuthService) {
    this.authenticationRequest = new AuthenticationRequest();
    this.authenticationResponse = new AuthenticationResponse();
  }

  ngOnInit(): void {
  }

  login(): void {

  }

}
