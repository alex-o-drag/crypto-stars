import {DEFAULT_COORDINATES, DEFAULT_ZOOM} from '../common/params.js';

const mapAndFilters = L.map('map');
const markers = [];

const initMap = () => {
  mapAndFilters.setView([DEFAULT_COORDINATES.lat, DEFAULT_COORDINATES.lng], DEFAULT_ZOOM);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: DEFAULT_ZOOM,
    attribution: '<a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> | Crypto Stars by <a href="https://htmlacademy.ru/" target="_blank">HTML Academy</a>'
  }).addTo(mapAndFilters);


  const marker = L.marker(
    {
      lat: DEFAULT_COORDINATES.lat,
      lng: DEFAULT_COORDINATES.lng
    },
    {
      draggable: false,
    }
  );

  marker.addTo(mapAndFilters);
};


const addMarkersToMap = (users) => {
  users.forEach((user) => {
    const marker = L.marker(
      {
        lat: user.coords.lat,
        lng: user.coords.lng
      },
      {
        draggable: false,
      }
    );
    marker.addTo(mapAndFilters);
  });
};

const addSellerToMap = (user) => {
  const marker = L.marker(
    {
      lat: user.coords.lat,
      lng: user.coords.lng
    },
    {
      draggable: true,
    }
  );
  marker.addTo(mapAndFilters);
  markers.push(marker);
};

const deleteMarkers = () => {
  markers.forEach((marker) => {
    mapAndFilters.removeLayer(marker);
  });
};

export {initMap, addMarkersToMap, addSellerToMap, mapAndFilters, deleteMarkers};
