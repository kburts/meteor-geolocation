/**
 * Created by Kevin on 4/27/2015.
 */

Accounts.onCreateUser(function (options, user) {
    /*
     When a user is created I also want to create a Person to be placed on the map.
     See lib/people.js for more information.
     */
    People.insert({
        user: {
            _id: user._id,
            username: user.username
        },
        color: randomColor({
            luminosity: 'dark'
        }),
        updated: new Date()
    });
    return user;
});