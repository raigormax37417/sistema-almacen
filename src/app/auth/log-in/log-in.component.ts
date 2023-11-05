import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  emailError = ''
  passwordError = ''
  loginForm: FormGroup

  private validationMessages: { [char: string]: string } ={
    required: 'Campo requerido',
    email: 'No se reconoce como email válido',
    pattern: 'Debe usar su email institucional',
    minlength: 'El campo no cumple con el mínimo de caracteres',
    maxlength: 'El campo excede el máximo de caracteres'
  }

  constructor(private fb: FormBuilder, private router : Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: new FormControl('',[Validators.required, Validators.minLength(5), Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@voaxaca.tecnm.mx$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
   }

  ngOnInit(): void {
    let email = this.loginForm.get('email')!
    let password = this.loginForm.get('password')!
    if (email) 
    email.valueChanges.subscribe(val => this.emailError=this.setMessage(email))
    if (password) 
    password.valueChanges.subscribe(val => this.passwordError=this.setMessage(password))
   
  }
  login(){
    if(this.loginForm.invalid)
    return alert('credenciales pls')
    
    let user = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    }
    
    let loged = this.authService.loginEmail(user)
    
    if (this.authService.redirectUrl) {
      this.router.navigateByUrl(this.authService.redirectUrl)
    } else {
      this.router.navigate(['auth'])
    }
  }
  
  googleLogin(){
    this.authService.loginGoogle()
  }
  
  forgotPassword(){}

  setMessage(control: AbstractControl){
    if((control.touched || control.dirty) && control.errors)
    return Object.keys(control.errors).map(
      key => this.validationMessages[key]
    ).join('. ')

    return ''
  }

}
