/**
 * Created by Kevin on 4/29/2015.
 */

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'
});

Router.route('/', {
    name: 'map'
});

Router.route('/about', {
    name: 'about'
});

Router.route('/auth', {
    name: 'signIn'
});