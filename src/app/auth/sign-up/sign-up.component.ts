import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  fullNameError = ''
  emailError = ''
  passwordError = ''
  passwordConfirmError = ''
  signUpForm: FormGroup

  private validationMessages: { [char: string]: string } ={
    required: 'Campo requerido',
    email: 'No se reconoce como email válido',
    pattern: 'Debe usar su email institucional',
    minlength: 'El campo no cumple con el mínimo de caracteres',
    maxlength: 'El campo excede el máximo de caracteres'
  }

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signUpForm = fb.group({
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120),
        ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(200),
          Validators.email,
          Validators.pattern('^[A-Za-z0-9._%+-]+@voaxaca.tecnm.mx$')
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120),
        ]
      ],
      confirmPassword: ['',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(120),
        ]
      ],
    })
  }

  ngOnInit(): void {
    let fullName = this.signUpForm.get('fullName')!
    let email = this.signUpForm.get('email')!
    let password = this.signUpForm.get('password')!
    let passwordConfirm = this.signUpForm.get('confirmPassword')!
    
    fullName.valueChanges.subscribe(val => this.fullNameError = this.setMessage(fullName))
    email.valueChanges.subscribe(val => this.emailError = this.setMessage(email))
    password.valueChanges.subscribe(val => this.passwordError = this.setMessage(password))
    passwordConfirm.valueChanges.subscribe(val => this.passwordConfirmError = this.setMessage(passwordConfirm))
    
  }
  register() {
    let fullName = this.signUpForm.get('fullName')!
    let password = this.signUpForm.get('password')
    let confirmPassword = this.signUpForm.get('confirmPassword')


    if (password?.value == "" ||
      (password?.value != confirmPassword?.value) ||
      this.signUpForm.invalid
    )
      return alert('datos pls');

    console.log(this.signUpForm.controls);
    let user = {
      email: this.signUpForm.get('email')?.value,
      password: password?.value,
      displayName: fullName.value
    }
    this.authService.signUp(user).then(r =>{
      if (r) {
        console.log(r);
        
        // this.router.navigateByUrl('auth/confirm')
      }
      else{
        alert(r)
      }
    })
    

  }

  // Refactor
  setMessage(control: AbstractControl){
    if((control.touched || control.dirty) && control.errors)
    return Object.keys(control.errors).map(
      key => this.validationMessages[key]
    ).join('. ')

    return ''
  }

}
