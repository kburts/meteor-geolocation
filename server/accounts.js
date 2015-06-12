/**
 * Created by Kevin on 4/27/2015.
 */


/*
    Removed for now because it was calling when Accounts.onCreateUser even on a error (as intended by Meteor.)
    Eventually this will be readded in .onCreateUser probably, but it is not a large concern right now.

Accounts.validateNewUser(function (user) {
    /
        I Don't like putting many constraints on new users signing up but since this is a social site,
        people should know who exactly they're talking to.
     /
    var username = user.username;

    //Make sure the username is of reasonable length.
    if (username.length <= 3)
        throw new Meteor.Error('cannot-create-account', 'Username is a little too short, sorry.');

    //Ensure username isn't just user with a space on the end.
    if (username != username.replace(/(^\s+|\s+$)/g,''))
        throw new Meteor.Error('cannot-create-account', "Please don't try to impersonate other users.")

    //You username shouldn't just be someone else's with difference case.
    if (Meteor.users.findOne({'username': username.toLowerCase()}) != null)
        throw new Meteor.Error('cannot-create-account',
            'Your username is the same as another but with different case.');
    return true;
});
*/

Accounts.onCreateUser(function (options, user) {
    /*
     When a user is created I also want to create a Person to be placed on the map.
     See lib/people.js for more information.
     */
    var username = user.username;

    if (People.findOne({'user.username': user.username})) {
        throw new Meteor.Error('cannot-create-account', 'Cannot create account because person with that username exists');
    }
    else {
        People.insert({
            user: {
                _id: user._id,
                username: username
            },
            color: randomColor(),
            updated: new Date(),
            scrambleLocation: false
        });
        return user;
    }
});