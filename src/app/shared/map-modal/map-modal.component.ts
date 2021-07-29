import { Component, OnInit,AfterViewInit,ViewChild,Renderer2} from '@angular/core';
import {AlertController,ModalController,ActionSheetController} from '@ionic/angular';
import { environment } from "/Users/adilkhan/Desktop/romeBuddy-main/src/environments/environment";
import {HttpClient} from '@angular/common/http'
import * as mapboxgl from 'mapbox-gl';
import {Capacitor} from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit,AfterViewInit{
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 19.0760;
  lng = 72.8777;
  constructor(
    private modalCtrl:ModalController,
    private http:HttpClient,
    private actionSheetCtrl:ActionSheetController,
    private alertCtrl:AlertController
  ) { }

  @ViewChild('map') mapElementRef;
  ngOnInit() {
    this.actionSheetCtrl.create({header:'Please Choose',
    buttons:[
      {text:'Auto-Locate',handler:()=>{
        this.locateUser();
      }},
      {text:'Pick on Map',handler:()=>{
        this.openMap()
      }},
      {text:'Cancel',role:'cancel'}
  ]}).then(actionSheetEl=>{
    actionSheetEl.present()
  })
  }
  private openMap(){
    mapboxgl.accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  private locateUser(){
    Geolocation.getCurrentPosition()
    .then(geoPosition=>{
      this.lat=geoPosition.coords.latitude
      this.lng=geoPosition.coords.longitude
      mapboxgl.accessToken = environment.mapbox.accessToken;
        this.map = new mapboxgl.Map({
          container: 'map',
          style: this.style,
          zoom: 13,
          center: [this.lng, this.lat]
      });

      this.map.addControl(new mapboxgl.NavigationControl());
    })

  }

  ngAfterViewInit(){}

  onCancel(){
      this.modalCtrl.dismiss()
  }
}
