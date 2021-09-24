import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userRole:string = "customer";
  //userRole:string = "admin";
  //userRole:string = "retailer";

  IsLoading:boolean = false;
  UserDoesNotExist:boolean = false;
  InvalidPassword:boolean = false;


  LoginForm = new FormGroup({
    Email: new FormControl("", [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
    Password: new FormControl("",  [Validators.required, Validators.pattern("[A-Z](?=.*[a-z0-9A-Z])(?=.*?[!@#\$&*~]).{7,15}$")]),
  })

  constructor(public service:AuthenticationService, public router2:Router) { }

  ngOnInit(): void {
  }

 public get Email2()  {
    return this.LoginForm.get('Email');
  }

  get Password2(){
    return this.LoginForm.get("Password");
  }

  changeUserRole(currentRole:string){
    this.userRole = currentRole;
  }

  SubmitForm(){
    this.IsLoading=true;
    this.UserDoesNotExist = false;
    this.InvalidPassword = false;
    console.log(this.LoginForm.value);
    this.service.Login(this.LoginForm.value).subscribe( (data:any) =>{ 
      console.log(data);
      
      if(data["LoginMessage"] == "UserDoesNotExist"){
        this.UserDoesNotExist=true;
        this.IsLoading=false;
      }
      else if(data["LoginMessage"] == "InvalidPassword"){
        this.InvalidPassword=true;
        this.IsLoading=false;
      }
      else if(data["LoginMessage"] == "Success"){
        this.IsLoading=false;
        sessionStorage.setItem("Email", this.LoginForm.value["Email"])
        this.router2.navigateByUrl('Home');
      }


     } 
     );
  }

}
