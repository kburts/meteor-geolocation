/**
 * Created by Kevin on 4/23/2015.
 */


People = new Mongo.Collection("people");

/*
 People contains a list of currently logged in users and their locations on the map.
 user: name, _id, color, message
 location: geolocation object
 marker: geolocation object
 updated: Date object last updated at.
 */

/*
Meteor.publish("mainMap", function () {
    return People.find();
});
*/

Meteor.methods({
    "updatePerson": function (options) {
        People.update(
            {
                user: {
                    _id: Meteor.userId()
                }
            },
            {
                $set: {
                    location: options.position,
                    updated: new Date()
                }
            }
        )
    },
    "createPerson": function () {
        People.upsert(
            {user: {_id: Meteor.userId()}},
            {
                $set: {
                    user: {
                        //username: Meteor.user().username,
                        _id: Meteor.userId()
                    },
                    updated: new Date()
                }
            }
        )
    }
});