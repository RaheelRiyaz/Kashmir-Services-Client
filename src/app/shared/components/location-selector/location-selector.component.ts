import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { SharedService } from 'src/app/services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.css'],
})
export class LocationSelectorComponent implements OnInit {
  searchInput!: string;
  map!: L.Map;
  marker!: L.Marker;
  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.map = L.map('map').setView([0, 0], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

    this.map.on('click', this.onMapClick.bind(this));
  }
  onMapClick(e: any) {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker(e.latlng).addTo(this.map);
    this.submitLocation();
  }
  searchLocation() {
    if (this.searchInput) {
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          this.searchInput
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            this.map.setView([lat, lon], 13);
            if (this.marker) {
              this.map.removeLayer(this.marker);
            }
            this.marker = L.marker([lat, lon]).addTo(this.map);
          } else {
            environment.fireErrorSwal('Location not found.');
          }
        })
        .catch((error) => {
          environment.fireErrorSwal(error.message);
        });
    } else {
      environment.fireErrorSwal('Please enter a location to search.');
    }
  }

  submitLocation() {
    if (this.marker) {
      const data = {
        longitude: this.marker.getLatLng().lat,
        latitude: this.marker.getLatLng().lng,
      };
      this.service.emitAddressEvent.emit(data);
    }
  }
}
