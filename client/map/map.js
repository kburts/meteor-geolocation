/**
 * Created by Kevin on 4/3/2015.
 */

Meteor.startup(function () {
    GoogleMaps.load();
});

/*
 Set center of map to current location.
 @param: google.maps.map object.
 */
function setCenter(map) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var center = position;
        map.instance.setCenter(new google.maps.LatLng(center.coords.latitude, center.coords.longitude));
    });
}

/*
 updatePosition(client) calls updatePerson(both) to update the database.
 updatePosition uses the navigator.geolocation API to get your current position.
 */
function updatePosition() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            Meteor.call("updatePerson", {position: position});
        }, function (error) {
            console.log("Error getting your geolocation!");
        },
        {timeout: 10000}
    );
}

Template.map.onCreated(function () {
    // Object to store all the markers.
    // format is _id: point - each user gets a marker.
    // eventually going to have a marker for the user's pointer as well.
    var markers = {};

    // Create a new Person on the map if there isn't one for the ID already.
    // Meteor.call("createPerson");
    // Looking to move to Accounts.onCreateUser.

    Meteor.setInterval(function () {
        updatePosition();
    }, 10000);


    GoogleMaps.ready('exampleMap', function (map) {
        // Initial setup of map. - set the center to your position (at 10 zoom from .loaded())
        setCenter(map);

        People.find().observeChanges({
            added: function (id, document) {
                //console.log(document.location.coords);
                //console.log("added");
                //console.log(document);
                if (!_.has(document, "location"))
                    return false;
                var loc = document.location.coords;
                markers[id] = new google.maps.Marker({
                    position: new google.maps.LatLng(
                        loc.latitude,
                        loc.longitude
                    ),
                    map: map.instance
                });
            },
            changed: function (id, fields) {
                /*
                 Changed seems to have some strange interactions on the client. The database is updated in memory,
                 which calls changed, then that change happens on the server side, which calls changed again.
                 I'm assuming this may cause some issues down the road with respect to validation, but it should
                 actually be pretty useful for the time being with latency compensation.
                 */
                // First time using underscoreJS. - pretty stoked, works as expected.
                if (!_.has(fields, "location"))
                    return false;
                var loc = fields.location.coords;
                markers[id].setMap(null);
                markers[id] = new google.maps.Marker({
                    position: new google.maps.LatLng(
                        loc.latitude,
                        loc.longitude
                    ),
                    map: map.instance
                });
            }
        });
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