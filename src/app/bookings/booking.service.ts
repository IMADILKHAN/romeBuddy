import {Injectable} from '@angular/core';
import {Booking} from './booking.model'
@Injectable({providedIn:'root'})
export class BookingService {
  private _bookins:Booking[] = [
    {
      id:'xyz',
      placeId:'p1',
      userId:'abc',
      placeTitle:'Museum',
      guestNumber:2
    }
  ];

  get bookings(){
    return [...this._bookins]
  }
}
