/**
 * Created by Kevin on 5/2/2015.
 */

/*
Template.groups.onRendered(function () {
    console.log(People.find.fetch());
});
    */

Template.groups.helpers({
    groups: function () {
        return Groups.find();
    }
});

Template.groups.events({
    'click .groups-join-group': function (event, template) {
        var groupId = this._id;
        Router.go('map', {_id: groupId});
    }
});