/**
 * Created by Kevin on 5/16/2015.
 */

/*
  Helper method to get the current user as a Person
 */
getCurrentPerson = function() {
    var userId = Meteor.userId();
    var me = People.findOne({
        "user._id": userId
    });
    console.log(me);
    return me;
};