import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  EmailInUse:boolean = false;
  IsLoading:boolean = false;
  PasswordMatch:boolean=true;

  RegistrationForm:FormGroup = new FormGroup({
    Email: new FormControl("", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
    Password: new FormControl("", [Validators.required, Validators.pattern("[A-Z](?=.*[a-z0-9A-Z])(?=.*?[!@#\$&*~]).{7,15}$")]),
    ConfirmPassword: new FormControl("", [Validators.required, Validators.pattern("[A-Z](?=.*[a-z0-9A-Z])(?=.*?[!@#\$&*~]).{7,15}$")]),
    City: new FormControl("", [Validators.required]),
    Mobile: new FormControl("", [Validators.required, Validators.pattern("[789][0-9]{9}")]),
  })



  constructor(public service:AuthenticationService, public router2:Router) { }

  ngOnInit(): void {
  }

  SubmitForm(){
    this.IsLoading=true;
    this.EmailInUse = false;
    console.log(this.RegistrationForm.value["Password"] );
    console.log(this.RegistrationForm.value["ConfirmPassword"]);
    
    
    if(this.RegistrationForm.value["Password"] != this.RegistrationForm.value["ConfirmPassword"] ){
      this.PasswordMatch = false;
      this.IsLoading=false;
      console.log();
      
    }
    else{
        console.log(this.RegistrationForm.value);
        this.service.Register(this.RegistrationForm.value).subscribe( (data:any) =>{ 
            if(data["RegistrationSuccess"] == true){
              console.log("Register Success");
              this.router2.navigateByUrl('Home');
            }
            else if(data["RegistrationSuccess"] == false){
              this.EmailInUse=true;
              this.IsLoading=false;
            }
         } 
         );

     }
  }

  
 public get Email2()  {
    return this.RegistrationForm.get('Email');
  }
  public get Password2()  {
    return this.RegistrationForm.get('Password');
  }
  public get ConfirmPassword2()  {
    return this.RegistrationForm.get('Password');
  }
  public get City2()  {
    return this.RegistrationForm.get('City');
  }
  public get Mobile2()  {
    return this.RegistrationForm.get('Mobile');
  }
  

}
