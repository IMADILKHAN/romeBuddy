import { Injectable } from '@angular/core';
import {Place} from './place.model';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject} from 'rxjs';
import {take,map,tap,delay} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places= new BehaviorSubject<Place[]>([
    {
      id:'1',
      title:'Museum Of Natural History',
      description:" the Museum has advanced its global mission to discover, interpret, and disseminate information about human cultures, the natural world, and the universe through a wide-ranging program of scientific research, education, and exhibition.",
      imageUrl:"https://images.unsplash.com/photo-1583003595083-c564c7151235?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80",
      price:8,
      availableFrom:new Date('2021-01-01'),
      availableTo:new Date("2022-01-01"),
      userId:'1'
    },
    {
      id:'2',
      title:'Tower of London',
      description:"The Tower of London, officially Her Majesty's Royal Palace and Fortress of the Tower of London.",
      imageUrl:"https://images.unsplash.com/photo-1578666062144-080ac96e3e24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dG93ZXIlMjBvZiUyMGxvbmRvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
      price:8,
      availableFrom:new Date('2021-01-01'),
      availableTo:new Date("2022-01-01"),
      userId:'1'
    },
    {
      id:'3',
      title:'Oxford Street',
      description:"Welcome to Oxford Street!  ",
      imageUrl:"https://images.unsplash.com/photo-1589136328987-24ba4e6d74b9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80",
      price:8,
      availableFrom:new Date('2021-01-01'),
      availableTo:new Date("2022-01-01"),
      userId:'1'
    },
  ]);
  get places(){
    return this._places.asObservable();
  }
  getPlaces(id:string){
    return this.places.pipe(take(1),map(places=>{
      return {...places.find(p=> p.id==id)}
    }));
  }
  constructor(private authService:AuthService ) { }
  addPlace(
    id:string,
    title:string,
    description:string,
    imageUrl:string,
    price:number,
    availableFrom:Date,
    availableTo:Date,
    userId:string
  ){
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      "https://images.unsplash.com/photo-1535912852591-fd8300cf52db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=932&q=80",
      price,
      availableFrom,
      availableTo,
      this.authService.userId);
      // this._places.push(newPlace)
      return this.places.pipe(take(1),delay(1000),tap(places=>{
        this._places.next(places.concat(newPlace));
      })
    );
  }

}
