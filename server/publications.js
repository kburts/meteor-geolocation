/**
 * Created by Kevin on 5/2/2015.
 */

// People
Meteor.publish('profile', function () {
    return People.find({"user._id": this.userId});
});

// Groups
Meteor.publish('allGroups', function () {
    /*
     List all the public groups you can join.
     */
    return Groups.find(
        {
            $or: [
                {private: {$ne: true}},
                {"owner._id": this.userId}
            ]
        },
        {
            sort: {created: -1}
        }
    );
});

Meteor.publish('group', function (id) {
    /*
     Return a specific Group and all the People in it.
     id is an optional parameter, if it is undefined will return all people (for now.)
     */
    if (id == undefined) {
        return People.find();
    }
    var people = Groups.findOne({_id: id}).people;
    var peopleId = people.map(function (person) { // list of People._id's in Group
        return person._id;
    });

    return [
        Groups.find({_id: id}),
        People.find({"user._id": {$in: peopleId}})
    ]
});