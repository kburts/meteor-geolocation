/**
 * Created by Kevin on 5/1/2015.
 */

Template.signIn.events({
    'click #login-login': function (event, template) {
        event.preventDefault();
        var username = template.find("#login-username").value;
        var password = template.find("#login-password").value;

        Meteor.loginWithPassword(username, password, function(error) {
            if (error) {
                throw new Meteor.Error('cannot-login', 'Could not log you in', error);
            }
            else {
                Router.go('map')
            }
        });
        return false;
    },
    'click #login-register': function (event, template) {
        event.preventDefault();
        var username = template.find("#login-username").value;
        var password = template.find("#login-password").value;

        Accounts.createUser({username: username, password: password}, function(error) {
            if (error) {
                throw new Meteor.Error('cannot-register', 'Could not register', error);
            }
            else {
                Router.go('map')
            }
        });
        return false;
    },
    'click #login-facebook': function (event) {
        Meteor.loginWithFacebook({}, function (error) {
            if (error) {
                //Session.set('login-error', error);
                throw new Meteor.Error('cannot-login-facebook', 'Could not log you in with facebook')
            }
            else {
                Router.go('map');
            }
        })
    }
});

/*
Template.signIn.helpers({
    loginerror: function () {
        return Session.get('login-error');
    }
});
    */