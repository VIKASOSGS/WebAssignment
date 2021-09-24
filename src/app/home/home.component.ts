import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isUserAuthorized:boolean  =  false;

  constructor(public router2:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("Email") == null ){
        this.router2.navigateByUrl("Login")
    }
    else if(sessionStorage.getItem("Email") != null ){
        this.isUserAuthorized = true;
        console.log(sessionStorage.getItem("Email"));
        
    }

  }

}
