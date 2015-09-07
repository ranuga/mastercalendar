// server/boot/sample-data.js
var async = require('async');

 var date = new Date();
    var d = date.getDate()-1;
    var m = date.getMonth();
    var y = date.getFullYear();
    var CALENDARS=[];
     var CALENDARS = [
      {
        userid: 'admin@abc.com',
        name: 'Admin',
        description: 'Admin',
        startDate:new Date(y, 1, 1),
        events: [
          {title: 'All Day Event',start: new Date(y, m, 1), allDay:true},
          {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2), allDay:true},
          {eventID: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
          {eventID: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
          {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
          {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 30),url: 'http://google.com/', allDay:true}
        ]
      },
      {
        userid: 'manager@abc.com',
        name: 'Manager',
        description: 'Manager',
        startDate:new Date(y, 1, 1),
        events: [ 
          {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
          {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/', allDay:true}
        ]
      }
    ];


module.exports = function(server, done) {
  console.log('Importing sample data...');
  var Calendars = server.models.Calendars;
  async.each(CALENDARS, function(calendars, next) {
    var events = calendars.events || [];
    delete calendars.events;
    Calendars.create(calendars, function(err, created) {
      if (err) return next(err);
      async.each(events, function(event, cb) {
        created.events.create(event, cb);
      },
      next);
    });
  }, function(err) {
    if (err)
      console.error('Cannot import sample data.', err);
    else
      console.log('Sample data was imported.');
    done(err);
  });
};