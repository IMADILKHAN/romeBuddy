import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Router} from '@angular/router'
import {Platform} from '@ionic/angular';
import {Plugins,Capacitor} from '@capacitor/core'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService:AuthService,
    private router:Router,
    private platform:Platform
  ) {
    this.initializeApp()  }
  initializeApp(){
    this.platform.ready().then(()=>{
      if (Capacitor.isPluginAvailable('SplashScreen')){
        Plugins.SplashScreen.hide();
      }
    })
  }
  onLogout(){
    this.authService.Logout();
    this.router.navigateByUrl('/auth')
  }
}
