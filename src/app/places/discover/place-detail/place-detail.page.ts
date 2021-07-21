import { Component, OnInit,OnDestroy } from '@angular/core';
import {Place} from '../../place.model';
import {ActivatedRoute} from '@angular/router';
import {NavController,ModalController,ActionSheetController} from '@ionic/angular';
import {PlacesService} from '../../places.service';
import {CreateBookingComponent} from 'src/app/bookings/create-booking/create-booking.component'
import {BookingService} from '../../../bookings/booking.service'
import {Subscription} from 'rxjs';
import {LoadingController} from '@ionic/angular'
@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit,OnDestroy{
  place:Place;
  private placeSub:Subscription;
  constructor(
    private route:ActivatedRoute,
    private navCtrl:NavController,
    private placesService:PlacesService,
    private modalCtrl:ModalController,
    private actionSheetCtrl:ActionSheetController,
    private bookingsService:BookingService,
    private loadingCtrl:LoadingController
    ) { }

  ngOnInit() {
  this.route.paramMap.subscribe(paramMap=>{
    if (!paramMap.has('placeId')){
        this.navCtrl.navigateBack('/places/tabs/discover');
        return
    }

    this.placeSub = this.placesService.getPlaces(paramMap.get('placeId')).subscribe(place=>{
      this.place = place
    })

  })
  }
  onBookPlace(){
      this.actionSheetCtrl.create({
          header:'Chose an action',
        buttons:[
            {
              text : 'Select Date',
              handler:()=>{
                this.openBookingModal('select')
              }
            },
            {
              text: 'Random Date',
              handler:()=>{
                this.openBookingModal('random')
              }
            },
            {
              text :'Cancel',
              role : "cancel"
            }
        ]
      })
      .then(actionSheetEl =>{
        actionSheetEl.present();
      })
  }
  openBookingModal(mode:'select'|'random'){
      console.log(mode)
      this.modalCtrl.create({component:CreateBookingComponent, componentProps:
        {selectedPlace:this.place,selectedMode:mode}})
      .then(modalEl =>{
        modalEl.present();
        return modalEl.onDidDismiss();})
      .then(resultData =>{

        if (resultData.role =='confirm'){
          this.loadingCtrl.create({
            message:'Booking this experience....'
          }).then(loadingEl=>{
            loadingEl.present()
            const data = resultData.data.bookingData;
            this.bookingsService.addBooking(this.place.id,this.place.title,this.place.imageUrl,data.firstName,data.lastName,data.guestNumber,data.dateFrom).subscribe(()=>{
              loadingEl.dismiss();
            })
          })

        }
      })
  }
  ngOnDestroy(){
      if (this.placeSub){
        this.placeSub.unsubscribe();
      }
  }
}
