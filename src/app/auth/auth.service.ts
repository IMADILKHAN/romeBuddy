import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = false;

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
