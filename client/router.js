/**
 * Created by Kevin on 4/29/2015.
 */

Router.configure({
    layoutTemplate: 'layout',
    //loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});
/*
Router.route('/', {
    name: 'map',
    subscriptions: function () {
        this.subscribe('group').wait();
    },
    onBeforeAction: function () {
        GoogleMaps.load();
        this.next();
    },
    action: function () {
        if (!this.ready()) {
            IonLoading.show();
        }
        else {
            IonLoading.hide();
            this.render();
        }
    }
});
*/
Router.route('/map/:_id?', {
    name: 'map',
    onBeforeAction: function () {
        GoogleMaps.load();
        this.next();
    },
    subscriptions: function () {
        return Meteor.subscribe('group', this.params._id);
    }
});

Router.route('/about', {
    name: 'about'
});

Router.route('/groups', {
    name: 'groups',
    subscriptions: function () {
        this.subscribe('allGroups').wait()
    }
    /*,
    action: function () {
        if (!this.ready()) {
            IonLoading.show();
        }
        else {
            IonLoading.hide();
            this.render();
        }
    }
    */
});

Router.route('/profile', {
    name: 'profile',
    onBeforeAction: function () {
        if (!Meteor.userId()) {
            this.redirect('signIn');
        }
        else {
            this.next();
        }
    }

});

Router.route('/auth', {
    name: 'signIn'
});