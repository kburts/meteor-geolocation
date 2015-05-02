/**
 * Created by Kevin on 5/1/2015.
 */

Template.profile.events({
    'click #logout': function (event, template) {
        event.preventDefault();
        Meteor.logout();
    }
});

