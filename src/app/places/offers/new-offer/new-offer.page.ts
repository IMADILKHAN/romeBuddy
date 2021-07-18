import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,ReactiveFormsModule} from '@angular/forms';
import {PlacesService} from '../../places.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})
export class NewOfferPage implements OnInit {
  form:FormGroup;
  constructor(private placesService:PlacesService,private router:Router) {}
  ngOnInit() {
    this.form = new FormGroup({
      title:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      description:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      price:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      dateFrom:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
      dateTo:new FormControl(null,{
        updateOn:'blur',
        validators:[Validators.required]
      }),
    })
  }

  onCreateOffer(){
    // console.log(this.form.value.title)
    this.placesService.addPlace(
      '1',
      this.form.value.title,
      this.form.value.description,
      '',
      +this.form.value.price,
      new Date(this.form.value.dateFrom),
      new Date(this.form.value.dateTo),
      '1'
    )
    this.form.reset();
    this.router.navigate(['/'])
  }

}
