/**
 * Created by Kevin on 5/2/2015.
 */


Template.newGroup.events({
    'click #new-group-create': function (event, template) {
        var name = template.find("#new-group-name").value;
        var private = template.find("#new-group-private").value;

        Meteor.call("createGroup", name, function (error, result) {
            if (error) {
                console.log("Error creating new group.");
            }
            else {
                IonModal.close();
                Router.go('map', {_id: result});
            }
        });
    }
});