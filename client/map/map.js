/**
 * Created by Kevin on 4/3/2015.
 */

Meteor.startup(function () {
    GoogleMaps.load();
});

/*
 Set center of map to current location.
 @param: google.maps.Map object.
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
            console.log(error)
        },
        {timeout: 10000}
    );
}


/*
  Create a url to a colored marker.
  @param color: color (should be in format #ff00ff)
 */
function createMarkerColor(color) {
    var url = "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|";
    return url + color.replace("#", "");
}

/*
  Create a new google maps marker, and return it.
  All arguments should be passed in one large object.
  eg. createMarker({map: map, latlng: loc, color: "#ff00ff"});
  @param map: google.maps.Map object
  @param coords: Geolocation.location.coords object
  @param optional args
    - color, color of marker
    - marker, string url to marker image
        eg. http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2| (without color hex code)
    - shadow, string url to shadow image
 */
function createMarker(kwargs) {
    var marker = {
        map: kwargs.map.instance
    };
    if (_.has(kwargs, "coords")) {
        var latlng = new google.maps.LatLng(kwargs.coords.latitude, kwargs.coords.longitude);
        marker["position"] = latlng;
    }
    if (_.has(kwargs, "marker") && _.has(kwargs, "color")) {
        var color = kwargs.color.replace("#", "");
        marker['icon'] = createMarkerColor(color);
    }
    if (_.has(kwargs, "shadow"))
        marker['shadow'] = "http://chart.apis.google.com/chart?chst=d_map_pin_shadow";
    return new google.maps.Marker(marker);
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
                if (!_.has(document, "location") || !_.has(document.location, "coords")) {
                    // case for new users.
                    // New users don't have a location, so you need to make a marker without it and add it in later.
                    updatePosition();
                    markers[id] = createMarker({
                        map: map,
                        marker: true,
                        color: document.color
                    });
                    return false;
                }

                var loc = document.location.coords;
                markers[id] = createMarker({
                    map: map,
                    coords: loc,
                    marker: true,
                    color: document.color
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
                markers[id].setPosition(
                    new google.maps.LatLng(loc.latitude, loc.longitude)
                );
            },
            removed: function (id) {
                console.log("removing: " + id);
                console.log(markers);
                markers[id].setMap(null);
                delete markers[id];
            }
        });
    });
});

Template.map.helpers({
    /*
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
    */
    people: function () {
        return People.find();
    },
    getMarkerImage: function (color) {
        return createMarkerColor(color);
    }
    /*,
    updatedAgo: function (date) {
        return moment(date).fromNow();
    }*/
});