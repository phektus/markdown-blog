Articles = new Meteor.Collection('articles');

// set permissions
/*
Articles.allow({
    insert: function(userId, article) {
	return false;
    },
    update: function(userId, article) {
	return userId === article.owner;
    },
    remove: function(userId, article) {
	return userId === article.owner;
    }
}); // end permissions set
*/

createArticle = function(options) {
    var id = Random.id();
    console.log('About to create article with options:', options);
    Meteor.call(
	'createArticle', 
	_.extend({ id: id }, options));
    return id;
}; // end createArticle

publishArticle = function(articleId) {
    console.log('About to publish article');
    Meteor.call('publishArticle', articleId);
}; // end publishArticle

Meteor.methods = ({
    createArticle: function(options) {
	console.log('Creating article with options:', options);
	var id;

	// check fields
	check(options, {
	    title: NonEmptyString,
	    body: NonEmptyString,
	    published: Math.Optional(Boolean),
	    _id: Match.Optional(NonEmptyString)
	}); 
	
	if(options.title.length>200)
	    throw new Meteor.Error(
		413, 
		'Title too long'
	    );
	if(options.body.length>6000) 
	    throw new Meteor.Error(
		413,
		'Body too long'
	    );
	if(!this.userId) 
	    throw new Meteor.Error(
		403, 
		'You must be logged in'
	    );
	// end check fields

	// create the article
	id = options._id || Random.id();
	Articles.insert({
	    _id: id,
	    owner: this.userId,
	    title: options.title,
	    body: options.body,
	    published: false,
	    created: (new Date()).time
	});

	console.log('Created article:', id);
	return id;	
    }, // end createArticle

    publishArticle: function(articleId) {
	console.log('Publishing article with id:', articleId);
	Articles.update(articleId, {
	    $set: {
		published: true
	    }
	});

    }
}); // end meteor global methods
