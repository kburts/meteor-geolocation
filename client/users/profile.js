/**
 * Created by Kevin on 5/1/2015.
 */

Template.profile.helpers({
    username: function () {
        return People.findOne() && People.findOne().user.username;
    },
    isScrambled: function () {
        return People.findOne() && People.findOne().scrambleLocation;
    }
});

Template.profile.events({
    'click #logout': function (event, template) {
        event.preventDefault();
        Meteor.logout();
    },
    'click #profile-scramble-location': function (event, template) {
        var checkbox = template.$(event.target)[0].checked;
        Meteor.call('setScrambledLocation', checkbox);
    }
});

