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