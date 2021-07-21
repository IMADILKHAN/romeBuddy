import { Component, OnInit,Input,ViewChild} from '@angular/core';
import {Place} from '../../places/place.model';
import {ModalController} from '@ionic/angular';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f',{static:true}) form:NgForm;
  startDate: string;
  endDate: string;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom)
    const availableTo = new Date(this.selectedPlace.availableTo)
    if (this.selectedMode=='random'){
      this.startDate = new Date(
        availableFrom.getTime() + (Math.random()*5)*(7*24*40*60*10000) ).toISOString()
    }
  }
  onCancel(){
    this.modalCtrl.dismiss(null,'cancel');
  }
  onBookPlace(){
    this.modalCtrl.dismiss({
      bookingData:{
        firstName:this.form.value['first-name'],
        lastName:this.form.value['last-name'],
        guestNumber:+this.form.value['guest-number'],
        startDate:new Date(this.form.value['date-from'])
      }
    },'confirm');
  }
}
