/**
 * Created by Kevin on 5/2/2015.
 */


Template.newGroup.events({
    'click #new-group-create': function (event, template) {
        var name = template.find("#new-group-name").value;
        var private = template.$("#new-group-private")[0].checked;
        Meteor.call("createGroup", name, function (error, result) {
            if (error) {
                throw new Meteor.Error('cannot-create-group', 'Error creating new group.');
                //console.log("Error creating new group.");
            }
            else {
                IonModal.close();
                Router.go('map', {_id: result});
            }
        });
    }
});