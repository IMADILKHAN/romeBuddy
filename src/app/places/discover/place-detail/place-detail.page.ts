import { Component, OnInit } from '@angular/core';
import {Place} from '../../place.model';
import {ActivatedRoute} from '@angular/router';
import {NavController,ModalController,ActionSheetController} from '@ionic/angular';
import {PlacesService} from '../../places.service';
import {CreateBookingComponent} from 'src/app/bookings/create-booking/create-booking.component'
@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place:Place;
  constructor(
    private route:ActivatedRoute,
    private navCtrl:NavController,
    private placesService:PlacesService,
    private modalCtrl:ModalController,
    private actionSheetCtrl:ActionSheetController
    ) { }

  ngOnInit() {
  this.route.paramMap.subscribe(paramMap=>{
    if (!paramMap.has('placeId')){
        this.navCtrl.navigateBack('/places/tabs/discover');
        return
    }
    this.place=this.placesService.getPlaces(paramMap.get('placeId'))
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
        console.log(resultData.data,resultData.role);
        if (resultData.role =='confirm'){
          console.log('BOOKED!')
        }
      })
  }
}
