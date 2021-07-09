import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = true;

  get userIsAuthenticated(){
    return this._userIsAuthenticated
  }
  constructor() { }
  Login(){
    this._userIsAuthenticated=true;
  }
  Logout(){
    this._userIsAuthenticated=false;
  }
}
