import {DEFAULT_COORDINATES, DEFAULT_ZOOM} from '../common/params.js';

const mapAndFilters = L.map('map');
const popupTemplate = document.querySelector('#map-baloon__template').content.querySelector('.user-card');
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

const createBalloonContent = (user) => {
  const popup = popupTemplate.cloneNode(true);
  popup.querySelector('.user-card__user-name').style.flexBasis = '100%';
  popup.querySelector('[data-name]').textContent = user.userName;
  if(!user.isVerified) {
    popup.querySelector('.user-card__user-name svg').remove();
  }
  popup.querySelector('[data-currency]').textContent = user.balance.currency;
  popup.querySelector('[data-exchangerate]').textContent = user.exchangeRate;
  popup.querySelector('[data-cashlimit]').textContent = `${user.minAmount}\xA0₽\xA0-\xA0${user.exchangeRate * user.balance.amount}\xA0₽`;

  if(user.paymentMethods.length) {
    const paymentMethodTemplate = popup.querySelector('.user-card__badges-item');
    popup.querySelector('[data-paymentmethods]').innerHTML = '';
    user.paymentMethods.forEach((method) => {
      const paymentMethod = paymentMethodTemplate.cloneNode(true);
      paymentMethod.textContent = method.provider;
      popup.querySelector('.user-card__badges-list').appendChild(paymentMethod);
    });
  }
  return popup;
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
    marker.addTo(mapAndFilters).bindPopup(createBalloonContent());
  });
};

const getUserPin = (user) => L.icon({
  iconUrl: user.isVerified ? './img/pin-verified.svg' : './img/pin.svg',
  iconSize: [36, 46],
  iconAnchor: [18, 46]
});

const addSellerToMap = (user) => {
  const marker = L.marker(
    {
      lat: user.coords.lat,
      lng: user.coords.lng
    },
    {
      draggable: false,
      icon: getUserPin(user)
    }
  );
  marker.addTo(mapAndFilters).bindPopup(createBalloonContent(user));
  markers.push(marker);
};

const deleteMarkers = () => {
  markers.forEach((marker) => {
    mapAndFilters.removeLayer(marker);
  });
};

export {initMap, addMarkersToMap, addSellerToMap, mapAndFilters, deleteMarkers};
