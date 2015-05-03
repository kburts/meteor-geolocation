/**
 * Created by Kevin on 4/23/2015.
 */

/*
 People contains a list of currently logged in users and their locations on the map.
 user: name, _id, color, message.
 location: geolocation object.
 marker: geolocation object.
 color: random color in hex in #FF00FF form.
 updated: Date object last updated at.
 */

People = new Mongo.Collection("people");

// Methods
Meteor.methods({
    "updatePerson": function (options) {
        People.update(
            {"user._id": Meteor.userId()},
            {
                $set: {
                    location: options.position,
                    updated: new Date()
                }
            }
        )
    }
});