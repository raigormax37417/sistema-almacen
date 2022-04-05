import { Profile, ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DocumentReference } from '@firebase/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
confirmForm : FormGroup
userProfile : Profile | null = null
  constructor( private fb:FormBuilder,private router: Router, private authService: AuthService, private profileService : ProfileService) { 

    this.confirmForm = fb.group({
      name:['',[Validators.required]],
      career:['',[Validators.required]],
      controlNumber:['',[Validators.required]],
      semester:['',[Validators.required]],
      group:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.profileService.profile.subscribe(
      profile =>{
        console.log('pr', profile);
        this.userProfile = profile!
        this.setValues(profile!)
        
      }
    )
    console.log('inited');
    
  }
  setValues(data: Profile){
    this.confirmForm.setValue({
      name: data.name,
      career: data.career,
      group: data.group,
      semester: data.semester,
      controlNumber: data.controlNumber,
    })
   
  }
  
  completeRegister(){
    if (this.confirmForm.invalid) return 0
    let newData: Profile ={
      name: this.confirmForm.get('name')?.value,
      career: this.confirmForm.get('career')?.value,
      group: this.confirmForm.get('group')?.value,
      semester: this.confirmForm.get('semester')?.value,
      controlNumber: this.confirmForm.get('controlNumber')?.value,
    } 

    this.profileService.update( newData)
    this.router.navigate(['students'])
    return 1
  }

}
