import { Component, OnInit,OnDestroy } from '@angular/core';
import {BookingService} from './booking.service';
import {Booking} from './booking.model';
import {LoadingController} from '@ionic/angular';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit,OnDestroy {
  loadedBookings :Booking[]
  private bookingSub:Subscription
  constructor(private bookingsService:BookingService,private loadingCtrl:LoadingController) { }

  ngOnInit() {
  this.bookingSub=this.bookingsService.bookings.subscribe(
      bookings =>{
        this.loadedBookings = bookings;

      }
    )
  }

  onCanelBooking(bookingId:string){
    this.loadingCtrl.create({
      message:'Cancelling....'}).then(loadingEl=>{
        loadingEl.present();
        this.bookingsService.cancelBooking(bookingId).subscribe(()=>{
          loadingEl.dismiss();
        })})
  }
  ngOnDestroy(){
    if (this.bookingSub){
    this.bookingSub.unsubscribe();
  }}
}
