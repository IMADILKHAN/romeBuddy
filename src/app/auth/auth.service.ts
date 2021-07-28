import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = true;
  private _userId = '1';

  get userIsAuthenticated(){
    return this._userIsAuthenticated
  }

  get userId(){
    return this._userId
  }

  constructor() { }
  Login(){
    this._userIsAuthenticated=true;
  }
  Logout(){
    this._userIsAuthenticated=false;
  }
}
