/**
 * Created by Kevin on 4/3/2015.
 */

Meteor.startup(function() {
    GoogleMaps.load();
});


Template.map.onCreated(function() {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('exampleMap', function(map) {
        // Initial setup of map.
        navigator.geolocation.getCurrentPosition(function (position) {
            center = position;
            console.log("center: ", center);
            map.instance.setCenter(new google.maps.LatLng(center.coords.latitude, center.coords.longitude));
        });
        // Check for location updates.
        navigator.geolocation.watchPosition(function (position) {
            Session.set("updated", new Date());
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;
            Routes.insert({
                lat: lat,
                lng: lng
            });

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
            map: map.instance
            });
            Routes.find().observe({
                added: function (point) {
                    var marker = new google.maps.Marker({
                        //animation: google.maps.Animation.DROP,
                        position: new google.maps.LatLng(point.lat, point.lng),
                        map: map.instance,
                        id: point.id
                    })
                }
            })
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
                center: new google.maps.LatLng(49.2380381, -123.1865521),
                zoom: 10
            };
        }
    },
    updated: function () {
      return Session.get("updated");
    }
});
/*
Template.map.events({
  'click button': function() {
    navigator.geolocation.getCurrentPosition(function (position) {
      Session.set("updated", position.coords.latitude);
    });
  }
});
*/