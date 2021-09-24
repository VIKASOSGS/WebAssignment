import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isUserAuthorized:boolean  =  false;

  CurrentUserEmail!:any ;


  constructor(public router2:Router) { }

  ngOnInit(): void {

    if(sessionStorage.getItem("Email") == null ){
        this.router2.navigateByUrl("Login");
    }
    else if(sessionStorage.getItem("Email") != null ){
      this.CurrentUserEmail = sessionStorage.getItem("Email");
        this.isUserAuthorized = true;
    }
  }

  LogOutUser(){
    sessionStorage.removeItem("Email");
    this.router2.navigateByUrl("Login");
  }

}
