import { Component, OnInit,OnDestroy } from '@angular/core';
import {Place} from '../../place.model';
import {ActivatedRoute} from '@angular/router';
import {NavController} from '@ionic/angular';
import {PlacesService} from '../../places.service';
import {FormGroup,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
import {Subscription} from 'rxjs';
@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit,OnDestroy {
  place:Place;
  form:FormGroup;
  private placeSub:Subscription;
  constructor(private route:ActivatedRoute,private navCtrl:NavController,private placesService:PlacesService) { }

  ngOnInit() {
  this.route.paramMap.subscribe(paramMap=>{
    if (!paramMap.has('placeId')){
        this.navCtrl.navigateBack('/places/tabs/offers');
        return
    }
    this.placeSub=this.placesService.getPlaces(paramMap.get('placeId')).subscribe(place=>{
      this.place = place;
      this.form = new FormGroup({
        title:new FormControl(this.place.title,{
          updateOn:'blur',
          validators:[Validators.required]
        }),
        description:new FormControl(this.place.description,{
          updateOn:'blur',
          validators:[Validators.required]
        })
      })
    })

  })

  }
  onEdit(){
    console.log(this.form)
  }
  ngOnDestroy(){
      if (this.placeSub){
        this.placeSub.unsubscribe();
      }
  }

  }
