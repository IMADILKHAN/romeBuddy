import { Injectable } from '@angular/core';
import {Place} from './place.model';
@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private _places:Place[]=[
    {
      id:'1',
      title:'Museum Of Natural History',
      description:" the Museum has advanced its global mission to discover, interpret, and disseminate information about human cultures, the natural world, and the universe through a wide-ranging program of scientific research, education, and exhibition.",
      imageUrl:"https://images.unsplash.com/photo-1583003595083-c564c7151235?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80",
      price:8
    },
    {
      id:'2',
      title:'Tower of London',
      description:"The Tower of London, officially Her Majesty's Royal Palace and Fortress of the Tower of London.",
      imageUrl:"https://images.unsplash.com/photo-1578666062144-080ac96e3e24?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dG93ZXIlMjBvZiUyMGxvbmRvbnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60",
      price:8
    },
    {
      id:'3',
      title:'Oxford Street',
      description:"Welcome to Oxford Street!  ",
      imageUrl:"https://images.unsplash.com/photo-1589136328987-24ba4e6d74b9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1800&q=80",
      price:8
    },
  ];

  get places(){
    return [...this._places]
  }
  constructor() { }
}
