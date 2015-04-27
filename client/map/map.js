/**
 * Created by Kevin on 4/3/2015.
 */

Meteor.startup(function () {
    GoogleMaps.load();
});

/*
 updatePosition(client) calls updatePerson(both) to update the database.
 updatePosition uses the navigator.geolocation API to get your current position.
 */
function updatePosition() {
    navigator.geolocation.getCurrentPosition(function (position) {
        Meteor.call("updatePerson", {position: position});
        Session.set("lat", position.coords.latitude + Math.random());
        Session.set("lng", position.coords.longitude + Math.random());
    });
}
Template.map.onCreated(function () {
    // Object to store all the markers.
    var markers = [];

    // Create a new Person on the map if there isn't one for the ID already.
    Meteor.call("createPerson");


    GoogleMaps.ready('exampleMap', function (map) {
        // Initial setup of map.
        navigator.geolocation.getCurrentPosition(function (position) {
            center = position;
            console.log("center: ", center);
            map.instance.setCenter(new google.maps.LatLng(center.coords.latitude, center.coords.longitude));
        });

        // Update position in database from geolocation (on interval.).
        Meteor.setInterval(function () {
            console.log("updating Person's position.");
            updatePosition();
            markers.push(new google.maps.Marker({
                    position: new google.maps.LatLng(Session.get("lat"), Session.get("lng")),
                    map: map.instance
                })
            );
            if (markers.length > 2) {
                for (var i = 0; i < markers.length; i ++) {
                    markers[i].setMap(null);
                }
                markers.length = 0;
                console.log("clearing array.");
            }
        }, 1000);
    });
});

Template.map.helpers({
    exampleMapOptions: function () {
        // Make sure the maps API has loaded

        if (GoogleMaps.loaded()) {
            // Map initialization options
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