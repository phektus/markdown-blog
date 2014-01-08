if (Meteor.isClient) {
    Template.editor.rendered = function() {
	Meteor.setInterval(
	    Template.editor.updatePad, 
	    5 * 1000
	);
    };
    
    Template.editor.updatePad = function () {
	console.log($('#inputpad').value);
	$('#outputpad').html(markdown.toHTML(
	    $('#inputpad').val()
	));
    };
    
    Template.editor.events({
	'keyup textarea' : function() {
	    Template.editor.updatePad();
	}
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
	// code to run on server at startup
    });
}
