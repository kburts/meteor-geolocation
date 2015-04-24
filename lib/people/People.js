/**
 * Created by Kevin on 4/23/2015.
 */

/*
 People contains a list of currently logged in users and their locations on the map.
 user: name, _id, color, message, updated
 location: geolocation object
 marker: geolocation object
 */
People = new Mongo.Collection("people");

Meteor.publish("main-map", function () {
    return People.find({});
});