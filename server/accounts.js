/**
 * Created by Kevin on 4/27/2015.
 */

Accounts.onCreateUser(function (options, user) {
    /*
     When a user is created I also want to create a Person to be placed on the map.
     See lib/people.js for more information.
     */

    // Username is dependant on what platform you signed up with.
    // for example facebook would be services.facebook.name for full name.
    var username = user.username || user.services.facebook.name;

    People.insert({
        user: {
            _id: user._id,
            username: username
        },
        color: randomColor({
            luminosity: 'dark'
        }),
        updated: new Date(),
        scrambleLocation: false
    });
    return user;
});

ServiceConfiguration.configurations.upsert(
    {
        service: "facebook"
    },
    {
        $set: {
            appId: Meteor.settings.private.FACEBOOK_APP_ID,
            secret: Meteor.settings.private.FACEBOOK_APP_SECRET
        }
    }
);