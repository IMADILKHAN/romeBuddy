import { Component, OnInit, OnDestroy } from '@angular/core';
import {PlacesService} from '../places.service';
import {Place} from '../place.model';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  loadedOffers: Place[];
  isLoading = false;
  private placesSub: Subscription;
  constructor(private placesService:PlacesService) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places=>{
      this.loadedOffers  = places;
    });
  }
  ionViewWillEnter(){
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(()=>{
      this.isLoading = false;
    })
  }
  onEdit(offerId:string){
    console.log('EDITING')
  }
  ngOnDestroy(){
    if (this.placesSub){
      this.placesSub.unsubscribe();
    }
  }
}
