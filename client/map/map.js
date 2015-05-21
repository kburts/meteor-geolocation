/**
 * Created by Kevin on 4/3/2015.
 */

/*
 Set center of map to current location, or given location if given.
 @param: google.maps.Map object.
 @param options: center, saves a geolocation call.
 */
function setCenter(map, center) {
    if (center) {
        map.instance.setCenter(new google.maps.LatLng(center.latitude, center.longitude));
    }
    else {
        navigator.geolocation.getCurrentPosition(function (position) {
            var center = position;
            map.instance.setCenter(new google.maps.LatLng(center.coords.latitude, center.coords.longitude));
        });
    }
}

/*
 updatePosition(client) calls updatePerson(both) to update the database.
 updatePosition uses the navigator.geolocation API to get your current position.
 */
function updatePosition() {
    navigator.geolocation.getCurrentPosition(
        function (position) {
            var coords = position.coords;
            var options = {};

            options.timestamp = position.timestamp;
            options.coords = {
                latitude: coords.latitude,
                longitude: coords.longitude,
                accuracy: coords.accuracy
                // Excluding heading, altitude, altitude accuracy for not on putpose
            };
            //console.log(options);
            Meteor.call("updatePerson", options);
        }, function (error) {
            throw new Meteor.Error('cannot-get-location', 'Error getting your location', error);
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

    var updatePositionInterval = 10000; // 10 seconds
    Meteor.setInterval(function () {
        updatePosition();
    }, updatePositionInterval);


    GoogleMaps.ready('mainMap', function (map) {
        // Initial setup of map. - set the center to your position (at 10 zoom from .loaded())
        // setCenter(map);

        // Set center on 'center' Session variable change
        Tracker.autorun(function () {
            var center = Session.get('center');
            setCenter(map, center);
        });

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
                if (document.user._id == Meteor.userId()) {
                    Session.set('center', loc);
                }
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
                markers[id].setMap(null);
                delete markers[id];
            }
        });
    });
});

Template.map.helpers({
    mainMapOptions: function () {
        // Make sure the maps API has loaded

        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(49.0, -123.0),
                zoom: 12
            };
        }
    },
    people: function () {
        return People.find();
    },
    getMarkerImage: function (color) {
        return createMarkerColor(color);
    },
    title: function () {
        if (!Groups.findOne()) {
            return "World Map";
        }
        else {
            return Groups.findOne().name;
        }
    },
    canJoin: function () {
        // Return if you can join the group or not
        // conditions: not world map and not already in the group.
        return (
            Groups.findOne() != undefined
            && Groups.findOne({"people._id": Meteor.userId()}) == undefined
        );
    }
});

// This needs to go in the layout because it is a part of the top nav bar.
// Even though it is only present in the map template.
Template.layout.events({
    'click [data-action=maps-join-group]': function () {
        var groupId = Router.current().params._id;
        Meteor.call('joinGroup', groupId);
    },
    'click [data-action=maps-leave-group]': function () {
        var groupId = Router.current().params._id;
        Meteor.call('leaveGroup', groupId);
    },
    'click .map-person-marker': function () {
        Session.set('center', this.location.coords);
        //var map = new google.maps.Map(document.getElementById('map-container'))
    }
});