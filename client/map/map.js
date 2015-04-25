/**
 * Created by Kevin on 4/3/2015.
 */

Meteor.startup(function() {
    GoogleMaps.load();
});

/*
 updatePosition(client) calls updateUser(both) to update the database.
 updatePosition uses the navigator.geolocation API to get your current position.
 */
function updatePosition () {
    navigator.geolocation.getCurrentPosition(function (position) {
        Meteor.call("updateUser", {position: position});
        console.log("intervaling");
        //Session.set("location", [position.coords.latitude, position.coords.longitude]);
        Session.set("lat", position.coords.latitude + Math.random());
        Session.set("lng", position.coords.longitude + Math.random());
    });
}
Template.map.onCreated(function() {
    // Object to store all the markers.
    var markers = {};


    GoogleMaps.ready('exampleMap', function(map) {
        // Initial setup of map.
        navigator.geolocation.getCurrentPosition(function (position) {
            center = position;
            console.log("center: ", center);
            map.instance.setCenter(new google.maps.LatLng(center.coords.latitude, center.coords.longitude));
        });
        // Update position on map
        Meteor.setInterval(function () {
            console.log("intervaling!");
            updatePosition();
            console.log(Session.get("location"));
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(Session.get("lat"), Session.get("lng")),
                map: map.instance
            });
            //markers.current = new google.maps.Marker({
            //    position: Session.get("location")
            //});

        }, 5000);
        // Check for location updates.
        /*
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
        */
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
                center: new google.maps.LatLng(49.0, -123.0),
                zoom: 10
            };
        }
    },
    updated: function () {
      return Session.get("updated");
    }
});