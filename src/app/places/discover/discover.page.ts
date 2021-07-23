import { Component, OnInit, OnDestroy } from '@angular/core';
import {PlacesService} from '../places.service';
import {Place} from '../place.model';
import {Subscription} from 'rxjs'
@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit,OnDestroy {
  loadedPlaces: Place[];
  private placesSub:Subscription;
  constructor(private placesService:PlacesService) { }

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe(places=>{
      this.loadedPlaces = places;
    })
  }
  ionViewWillEnter(){
    this.placesService.fetchPlaces().subscribe()
  }
  ngOnDestroy(){
    if (this.placesSub){
      this.placesSub.unsubscribe();
    }
  }
}
