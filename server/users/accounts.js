/**
 * Created by Kevin on 4/27/2015.
 */

Accounts.onCreateUser(function (options, user) {
    /*
      When a user is created I also want to create a Person to be placed on the map.
     */
    People.insert({
        user: {
            _id: user._id,
            username: user.username
        },
        updated: new Date()
    });
    return user;
    //Meteor.call("createPerson")
});