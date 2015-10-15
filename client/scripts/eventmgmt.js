$(function() {
	$(document).on("click","#btnAdd",function(){ 
		$("#addCalendar").dialog({ modal: true, title: event.title, width:600, height:400,
		    buttons: {
		      Submit: function() {
		        $( this ).dialog( "close" );
		      },
		      Cancel: function() {
		        $( this ).dialog( "close" );
		      }
		    }
		});
	});
});