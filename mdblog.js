if (Meteor.isClient) {
  Template.editor.events({
    'keypress textarea' : function () {
	var raw = $('textarea#inputpad').val();
	$('#outputpad').html(raw);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
