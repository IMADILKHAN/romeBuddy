import { Component, OnInit } from '@angular/core';
import {BookingService} from './booking.service'
import {Booking} from './booking.model'
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  loadedBookings :Booking[]
  constructor(private bookingsService:BookingService) { }

  ngOnInit() {
    this.loadedBookings = this.bookingsService.bookings;
  }
  onCanelBooking(bookingId:string){
    console.log(bookingId)
  }

}
