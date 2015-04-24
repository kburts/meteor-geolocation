/**
 * Created by Kevin on 4/23/2015.
 */

/*
    updatePosition(client) calls updateUser(both) to update the database.
    updatePosition uses the navigator.geolocation API to get your current position.
 */
Meteor.methods({
    updatePositon: function() {
        navigator.geolocation.getCurrentPosition(function (position) {
            Meteor.call("updateUser", {position: position});
            //map.instance.setCenter(new google.maps.LatLng(center.coords.latitude, center.coords.longitude));
        })
    }
});