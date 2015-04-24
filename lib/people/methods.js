/**
 * Created by Kevin on 4/23/2015.
 */

Meteor.methods("updateUser", function (options) {
    var user = People.findOne({"user._id": Meteor.userId()});
    user.update({
        location: options.location,
        updated: new Date()
    })
});