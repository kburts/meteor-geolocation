/**
 * Created by Kevin on 4/29/2015.
 */

Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

Router.route('/', function () {
    this.redirect('map');
});

Router.route('/map/:_id?', {
    name: 'map',
    onBeforeAction: function () {
        GoogleMaps.load({key: Meteor.settings.public.GOOGLE_MAPS_API_KEY});
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
        this.subscribe('allGroups').wait();
    }
});

Router.route('/profile', {
    name: 'profile',
    subscriptions: function () {
        this.subscribe('profile').wait();
        this.subscribe('allGroups').wait()
    },
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