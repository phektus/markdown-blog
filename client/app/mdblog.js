

Template.editor.rendered = function() {
    Meteor.setInterval(
	Template.editor.updatePad, 
	5 * 1000
    );
};

Template.editor.updatePad = function () {
    $('#outputpad').html(markdown.toHTML(
	$('#inputpad').val()
    ));
};

Template.editor.events({
    'keyup textarea' : function() {
	Template.editor.updatePad();
    }
});

