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
        /*
          Update a user's position in the database. Coordinates are passes in options.
         */
        if (!Meteor.userId()) {
            // If not logged in just return.
            return;
        }
        People.update(
            {"user._id": Meteor.userId()},
            {
                $set: {
                    location: options,
                    updated: new Date()
                }
            }
        );
        if (People.findOne({"user._id": Meteor.userId()}).scrambleLocation == true) {
            // random is +/- 0.005 Lat and Lng.
            var randLat = (Random.fraction() - 0.5) / 100;
            var randLng = (Random.fraction() - 0.5) / 100;
            People.update(
                {"user._id": Meteor.userId()},
                {
                    $inc: {
                        "location.coords.latitude": randLat,
                        "location.coords.longitude": randLng
                    }
                }
            );
        }
    },
    'setScrambledLocation': function (bool) {
        People.update(
            {"user._id": Meteor.userId()},
            {
                $set: {
                    scrambleLocation: bool
                }
            }
        );
    }
});