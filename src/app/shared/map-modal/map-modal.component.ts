import { Component, OnInit,AfterViewInit,ViewChild,Renderer2} from '@angular/core';
import {ModalController} from '@ionic/angular';
import { environment } from '/Users/adilkhan/Desktop/newProj/romeBuddy/src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
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
    private modalCtrl:ModalController
  ) { }

  @ViewChild('map') mapElementRef;
  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }
  ngAfterViewInit(){}

  onCancel(){
      this.modalCtrl.dismiss()
  }
}
