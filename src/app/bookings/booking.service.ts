import {Injectable} from '@angular/core';
import {Booking} from './booking.model';
import {BehaviorSubject} from 'rxjs';
import {take,tap,delay,switchMap,map} from 'rxjs/operators'
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http'

interface BookingData{
  firstName: string;
  guestNumber: number;
  lastName: string;
  placeId: string;
  placeImage: string;
  placeTitle: string;
  userId:string;
  bookedfrom:string;
}

@Injectable({providedIn:'root'})
export class BookingService {
  constructor(private authService:AuthService,private http:HttpClient){}

  private _bookings = new BehaviorSubject<Booking[]>([]);

  get bookings(){
    return this._bookings.asObservable();
  }

  addBooking(
    placeId:string,
    placeTitle:string,
    placeImage:string,
    firstName:string,
    lastName:string,
    guestNumber:number,
    dateFrom:Date
    ){
    let generatedId:string;
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.userId,
      placeTitle,
      placeImage,
      firstName,
      lastName,
      guestNumber,
      dateFrom,
    );
    return this.http.post<{name:string}>('https://romebuddy-default-rtdb.firebaseio.com/bookings.json',
  {...newBooking,id:null}
).pipe(switchMap(resData=>{
  generatedId = resData.name;
  return this.bookings
}),take(1),tap(bookings=>{
  newBooking.id = generatedId
  this._bookings.next(bookings.concat(newBooking))
}))
  }

  cancelBooking(bookingId:string){
    return this.bookings.pipe(
      take(1),
      delay(500),
      tap(bookings=>{
        this._bookings.next(bookings.filter(b=> b.id!==bookingId)
      )
      })
    )
  }

  fetchBooking(){
    return this.http.get<{[key:string]:BookingData}>(`https://romebuddy-default-rtdb.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.userId}"`)
    .pipe(map(bookingData=>{
      const bookings = [];
      for (const key in bookingData){
        if (bookingData.hasOwnProperty(key)){
          bookings.push(new Booking(key,bookingData[key].placeId,bookingData[key].userId,bookingData[key].placeTitle,bookingData[key].placeImage,bookingData[key].firstName,bookingData[key].lastName,bookingData[key].guestNumber,new Date(bookingData[key].bookedfrom)))
        }
        }
        return bookings;
      }),tap(bookings=>{
        this._bookings.next(bookings)
      })
    )
  }
}
