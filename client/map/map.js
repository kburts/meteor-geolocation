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
        console.log("intervaling");
        //Session.set("location", [position.coords.latitude, position.coords.longitude]);
        Session.set("lat", position.coords.latitude + Math.random());
        Session.set("lng", position.coords.longitude + Math.random());
    });
}
Template.map.onCreated(function () {
    // Object to store all the markers.
    var markers = {};

    // Create a new Person on the map if there isn't one for the ID already.
    Meteor.call("createPerson");


    GoogleMaps.ready('exampleMap', function (map) {
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
        }, 50000);
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