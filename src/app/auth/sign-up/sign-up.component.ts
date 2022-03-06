import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm : FormGroup
  constructor( private fb:FormBuilder,private router: Router, private authService: AuthService) { 
    this.signUpForm = fb.group({
      fullName:'',
      email:'',
      password:'',
      confirmPassword:''
    })
  }

  ngOnInit(): void {
  }
  register(){
    let password = this.signUpForm.get('password')
    let confirmPassword = this.signUpForm.get('confirmPassword')
    console.log({pass:password?.value, conf: confirmPassword?.value});
    console.log(password?.value != confirmPassword?.value);
    console.log(this.signUpForm.invalid, password?.value == "");
    
    
    if (password?.value == "" || 
    (password?.value != confirmPassword?.value)||
    this.signUpForm.invalid
    )
    return alert('datos pls');
    
    console.log(this.signUpForm.controls);
    let user = {
      email: this.signUpForm.get('email')?.value,
      password: password?.value,
  }
    // this.authService.signUp(user)
    this.router.navigateByUrl('auth/confirm')
    
  }

}
