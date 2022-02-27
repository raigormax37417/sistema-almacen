import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup
  constructor(private fb: FormBuilder, private router : Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: '',
      password: ''
    })
   }

  ngOnInit(): void {
   
  }
  login(){
    if(this.loginForm.invalid)
    return alert('credenciales pls')
    
    let user = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
    this.authService.loginEmail(user)
  }
  forgotPassword(){}

}
