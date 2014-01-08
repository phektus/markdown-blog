Meteor.startup(function () {
    console.log('Starting server');
});

Meteor.publish('articles', function() {
    return Articles.find({'published':true});
});
