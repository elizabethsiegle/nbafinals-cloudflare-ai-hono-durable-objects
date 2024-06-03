import * as L from 'leaflet';
// Initialize the map and set its view to a default location and zoom level
const map = L.map('map').setView([51.505, -0.09], 13);

// Add a tile layer to the map (OpenStreetMap tiles)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to add a marker at the specified coordinates
function addMarker(lat, lng) {
  L.marker([lat, lng]).addTo(map)
    .bindPopup(`Marker at (${lat.toFixed(5)}, ${lng.toFixed(5)})`)
    .openPopup();
}

// Add a click event listener to the map to add a marker on click
map.on('click', function(e) {
  const { lat, lng } = e.latlng;
  addMarker(lat, lng);
});



  