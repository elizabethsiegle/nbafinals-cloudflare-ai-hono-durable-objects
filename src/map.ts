import { map, latLng, tileLayer, MapOptions } from "leaflet";

import 'leaflet/dist/leaflet.css';

const options: MapOptions = {
  center: latLng(40.731253, -73.996139),
  zoom: 12,
};

const mymap = map('map', options);

const key = 'hcLfzFCnmAs2xCqYjeFf';

tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`,{ //style URL
  tileSize: 512,
  zoomOffset: -1,
  minZoom: 1,
  attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
  crossOrigin: true
}).addTo(mymap);






  