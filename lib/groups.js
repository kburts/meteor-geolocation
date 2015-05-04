/**
 * Created by Kevin on 5/2/2015.
 */

/*
 Maps contain and array of People._id's, as well as some properties about the map itself.
 name: name of the map / event.
 people: array of people's _ids.
 private: boolean if map shows up on the list of maps.
 created: time created
 owner: user who created the map
 */

Groups = new Mongo.Collection("groups");

// Methods
Meteor.methods({
    'createGroup': function (name) {
        if (!Meteor.user()) {
            console.log("Please log in to do that.");
            Router.go('signIn');
        }
        else {
            var owner = {_id: Meteor.userId(), username: Meteor.user().username};
            var group = Groups.insert({
                name: name,
                owner: owner,
                people: [owner],
                private: false,
                created: new Date()
            });
        }
        return group;
    },
    'joinGroup': function (id) {
        var user = {_id: Meteor.userId(), username: Meteor.user().username};
        Groups.update({_id: id}, {$push: {people: user}});
    },
    'leaveGroup': function (id) {
        var user = {_id: Meteor.userId(), username: Meteor.user().username};
        Groups.update({_id: id}, {$pull: {people: user}});
    }
});