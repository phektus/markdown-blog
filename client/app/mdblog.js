Meteor.subscribe('articles');

//
//
// Blog
//
//

Template.blog.articles = function() {
    return Articles.find(
	{}, 
	{
	    sort:{created:-1}
	}
    );
}; 

Template.blog.mdToHTML = function(md) {
    return markdown.toHTML(md);
};

Template.blog.events({
    'click .create': function() {
	if(!Meteor.userId()) return;
	Session.set('selected', null);
    },
    'click .article': function(e, template) {
	if(!Meteor.userId()) return;
	Session.set('selected', e.currentTarget.id);
    }
});

//
//
// Editor
//
//

Template.editor.article = function() {
    if(!Session.get('selected')) return null;
    return Articles.findOne(
	Session.get('selected')
    );
}; 

Template.editor.updatePad = function () {
    $('#outputpad').html(markdown.toHTML(
	$('#inputpad').val()
    ));
};

Template.editor.events({
    'keypress textarea' : function() {
	Template.editor.updatePad();
    },

    'keydown textarea' : function() {
	Template.editor.updatePad();
    },

    'keyup textarea' : function() {
	Template.editor.updatePad();
    },

    'click .save': function(e, template) {
	console.log('Saving article');
	var id = createArticle({
	    title: $('#titlepad').val(),
	    body: $('#inputpad').val()
	});
	Session.set('selected', id);
    },

    'click .publish': function(e, template) {
	console.log('Publishing article');
	publishArticle($('#_id').value);
    }
});

