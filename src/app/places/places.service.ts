import { Injectable } from '@angular/core';
import {Place} from './place.model';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http' ;
import {take,map,tap,delay,switchMap} from 'rxjs/operators';

interface PlaceData{
  availableFrom: string
  availableTo: string
  description: string
  imageUrl: string
  price: number
  title: string
  userId: string
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places= new BehaviorSubject<Place[]>([])
;
  get places(){
    return this._places.asObservable();
  }
  fetchPlaces(){
    return this.http.get<{[key:string]:PlaceData}>('https://romebuddy-default-rtdb.firebaseio.com/offered-places.json')
    .pipe(map(resData=>{
        const places = [];
        for (const key in resData){
          places.push(new Place(key,resData[key].title,resData[key].description,resData[key].imageUrl,resData[key].price,new Date(resData[key].availableFrom) ,new Date(resData[key].availableTo),resData[key].userId))
        }
        return places
      }),
      tap(places=>{
        this._places.next(places);
      })
    )
  }

  getPlaces(id:string){
    // return this.http.get()
  }
  constructor(private authService:AuthService,private http:HttpClient) { }
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
    let generatedId:string;
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      "https://images.unsplash.com/photo-1535912852591-fd8300cf52db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=932&q=80",
      price,
      availableFrom,
      availableTo,
      this.authService.userId);
      return this.http.post<{name:string}>('https://romebuddy-default-rtdb.firebaseio.com/offered-places.json',{...newPlace,id:null})
      .pipe(
        switchMap(resData=>{
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap(places=>{
            newPlace.id = generatedId;
            this._places.next(places.concat(newPlace));
          })
      )

    //   return this.places.pipe(take(1),delay(1000),tap(places=>{
    //     this._places.next(places.concat(newPlace));
    //   })
    // );
  }
  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        return this.http.put(
          `https://romebuddy-default-rtdb.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }
}


















// {
//   id:'1',
//   title:'Museum Of Natural History',
//   description:" the Museum has advanced its global mission to discover, interpret, and disseminate information about human cultures, the natural world, and the universe through a wide-ranging program of scientific research, education, and exhibition.",
//   imageUrl:"https://images.unsplash.com/photo-1583003595083-c564c7151235?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80",
//   price:8,
//   availableFrom:new Date('2021-01-01'),
//   availableTo:new Date("2022-01-01"),
//   userId:'1'
// },
// {
//   id:'2',
//   title:'Tower of London',
//   description:"The Tower of London, officially Her Majesty's Royal Palace and Fortress of the Tower of London.",
//   imageUrl:"https://images.unsplash.com/photo-1578666062144-080ac96e3e24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dG93ZXIlMjBvZiUyMGxvbmRvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
//   price:8,
//   availableFrom:new Date('2021-01-01'),
//   availableTo:new Date("2022-01-01"),
//   userId:'1'
// },
// {
//   id:'3',
//   title:'Oxford Street',
//   description:"Welcome to Oxford Street!  ",
//   imageUrl:"https://images.unsplash.com/photo-1589136328987-24ba4e6d74b9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80",
//   price:8,
//   availableFrom:new Date('2021-01-01'),
//   availableTo:new Date("2022-01-01"),
//   userId:'1'
// },
