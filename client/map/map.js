/**
 * Created by Kevin on 4/3/2015.
 */

Meteor.startup(function() {
    GoogleMaps.load();
});


Template.map.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function(map) {
        navigator.geolocation.getCurrentPosition(function (position) {
            center = position;
            console.log(center);
            map.instance.setCenter(new google.maps.LatLng(center.coords.latitude, center.coords.longitude));
            var marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });

        });
        navigator.geolocation.watchPosition(function (position) {
          Session.set("lat", new Date());
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(lat, lng),
            map: map.instance
          });
          console.log("adding marker: ", marker);
        });
        // Add a marker to the map once it's ready

    });
});

Template.map.helpers({
    exampleMapOptions: function() {
        // Make sure the maps API has loaded

        if (GoogleMaps.loaded()) {
            // Map initialization options

            //center = new google.maps.LatLng(Session.get("center").coords.latitude, Session.get("center").coords.longitude);
            return {
                center: new google.maps.LatLng(-37.8136, 144.9631),
                //center: new google.maps.LatLng(Session.get("center").coords.latitude, Session.get("center").coords.longitude),
                //center: new google.maps.LatLng(center.coords.latitude, center.coords.longitude),
                zoom: 10
            };
        }
    },
    lat: function () {
      return Session.get("lat");
    }
});

Template.map.events({
  'click button': function() {
    navigator.geolocation.getCurrentPosition(function (position) {
      Session.set("lat", position.coords.latitude);
    });
  }
});
