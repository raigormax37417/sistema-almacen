import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
confirmForm : FormGroup
  constructor( private fb:FormBuilder,private router: Router, private authService: AuthService) { 
    this.confirmForm = fb.group({
      career:'',
      controlNumber:'',
      semester:'',
      group:''
    })
  }

  ngOnInit(): void {
  }
  
  completeRegister(){

  }

}
