/**
 * Created by Kevin on 5/2/2015.
 */

// People
/* To remove later, merging main world map and custom group map.
Meteor.publish('allPeople', function () {
    return People.find();
});
*/

Meteor.publish('profile', function () {
    return People.find({"user._id": Meteor.userId()});
});

// Maps
Meteor.publish('allGroups', function () {
    return Groups.find({private: false});
});

Meteor.publish('group', function (id) {
    /*
     id is an optional parameter, if it is undefined will return all people (for now.)
     */
    if (id == undefined) {
        return People.find();
    }
    var people = Groups.findOne({_id: id}).people; // list of Id's
    var peopleId = people.map(function (person) {
        return person._id;
    });

    console.log("found group");
    console.log(peopleId);
    console.log(id);
    return [
        Groups.find({_id: id}),
        People.find({_id: {$in: peopleId}})
    ]
});