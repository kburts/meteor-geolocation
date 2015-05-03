/**
 * Created by Kevin on 5/1/2015.
 */

Template.profile.helpers({
    username: function () {
        return Meteor.user() && Meteor.user().username;
    }
});

Template.profile.events({
    'click #logout': function (event, template) {
        event.preventDefault();
        Meteor.logout();
    }
});

