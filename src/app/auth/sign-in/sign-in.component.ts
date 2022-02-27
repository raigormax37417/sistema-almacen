import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm : FormGroup
  constructor( private fb:FormBuilder,private router: Router, private authService: AuthService) { 
    this.signInForm = fb.group({
      fullName:'',
      email:'',
      password:'',
      confirmPassword:''
    })
  }

  ngOnInit(): void {
  }
  register(){
    let password = this.signInForm.get('password')
    let confirmPassword = this.signInForm.get('confirmPassword')
    console.log({pass:password?.value, conf: confirmPassword?.value});
    console.log(password?.value != confirmPassword?.value);
    
    
    if (password?.value == "" || (password?.value != confirmPassword?.value))
    return alert('pass pls');
    
    console.log(this.signInForm.controls);
    let user = {
      email: this.signInForm.get('email')?.value,
      password: password?.value,
  }
    // this.authService.signUp(user)
    this.router.navigateByUrl('auth/confirm')
    
  }

}
