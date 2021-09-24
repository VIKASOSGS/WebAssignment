import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDetails } from './user-details';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url='http://localhost:22372/api/Authentication';

  

  constructor(private client:HttpClient) { }

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  Register(userdetails:UserDetails){
    return this.client.post(this.url+"/Register", JSON.stringify(userdetails), this.httpOptions)
  }

  Login(userdetails:UserDetails){
    console.log(userdetails);
    
    return this.client.post(this.url+"/Login", JSON.stringify(userdetails), this.httpOptions)
  }


}
