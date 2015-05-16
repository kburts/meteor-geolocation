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
    }
});