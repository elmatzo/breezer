import Ember from 'ember';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),

  lat: 32.75494243654723,
  lng: -86.8359375,
  zoom: 8,
  airQuality: {
    data_valid: false,
    init: true
  },
  markers: Ember.A([]),
  requesting: false,
  setMarker(lat, lng) {
    this.get('markers').clear();
    this.get('markers').pushObject({lat, lng});
    this.set('lat', lat);
    this.set('lng', lng);
  },
  getAirData(lat, lng) {
    this.setMarker(lat, lng);
    this.set('requesting', true);
    this.get('ajax').request('http://api.breezometer.com/baqi/?lat=' + lat + '&lon=' + lng + '&key=45357224e18841adacba40ecfb2c938b', {
      method: 'GET',
    }).then((airdata) => {
      this.set('requesting', false);
      this.set('airQuality', airdata);
      console.log(airdata);
    }).catch(error => {
      //error
    });
  },

  actions: {
    didUpdatePlace(event) {
      this.getAirData(event.lat, event.lng);
    },
    clickOnMap(event) {
      var lat = event.latLng.lat();
      var lng = event.latLng.lng();

      this.getAirData(lat, lng);
    }
  }
});
