angular.module('sbAdminApp',['libraryServices','lbServices'])
  .controller('CalendarCtrl', ['$scope','uiCalendarConfig','$state','dbService',function($scope,uiCalendarConfig,$state,dbService) {

   $scope.alerts = [];

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };  

   $scope.change = function(eventSource,checked) {
        if (checked) {
            uiCalendarConfig.calendars['groupCalendar'].fullCalendar('addEventSource', eventSource);
        } else {
            uiCalendarConfig.calendars['groupCalendar'].fullCalendar( 'removeEventSource', eventSource);
        }
        uiCalendarConfig.calendars['groupCalendar'].fullCalendar('refetchEvents');//.fullCalendar( 'refetchEvents' )
    };
 
    // coloring of the eventSources
    $scope.initializeCalendars = function(index) {
      var bgColor = randomColor()
      $scope.eventSources[index].visible = true;
      $scope.eventSources[index].color = bgColor;
      $scope.eventSources[index].textColor = ContrastColor(bgColor);
    };

    $scope.eventChanged = 0;

    /* alert on eventClick */
    $scope.alertOnEventClick = function( date, jsEvent, view){
        $scope.alertMessage = (date.title + ' was clicked ');
        $scope.alerts.push({msg:$scope.alertMessage,type:'success' });
    };
    /* Change View */
    $scope.changeView = function(view,calendar) {
      uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Change View */
    $scope.renderCalender = function(calendar) {
      if(uiCalendarConfig.calendars[calendar]){
        uiCalendarConfig.calendars[calendar].fullCalendar('render');
      }
    };

    $scope.eventRender = function(event, element, view ){
        var multiDay =  false;
        var noDays = 1;
        if ((event.end != null) && (moment(event.end).diff(moment(event.start),'days')>0)) {
          if (!event.allDay) {
            noDays = moment(event.end).diff(moment(event.start),'days') + 1;
          } else {
            noDays = moment(event.end).diff(moment(event.start),'days');
          }
        }
        var dateString = "";
        for (i=1; i<=noDays; i++) {
          dateString = moment(event.start).add(i-1,'days').format('YYYY-MM-DD');
          $('.fc-day[data-date="' + dateString + '"]').addClass('fc-has-event');
        }
        element.click(function() {
            $("#startTime").html(moment(event.start).format('MMM Do h:mm A'));
            $("#endTime").html(moment(event.end).format('MMM Do h:mm A'));
            $("#eventInfo").html(event.description);
            $("#allDay").html((event.allDay?"Yes":"No"));
            $("#eventContent").dialog({ modal: true, title: event.title, width:350,
                                        buttons: {
                                          Ok: function() {
                                            $( this ).dialog( "close" );
                                          }
                                        }
                                      });
          });
    };

    $scope.eventDestroy = function( event, element, view ) { 
        var multiDay =  false;
        var noDays = 1;
        if ((event.end != null) && (moment(event.end).date() > moment(event.start).date())) {
          if (!event.allDay) {
//            noDays = (moment(event.end).date() - moment(event.start).date());
            noDays = moment(event.end).diff(moment(event.start),'days') + 1;
          } else {
            noDays = moment(event.end).diff(moment(event.start),'days');
          }
        }
        var dateString = "";
        for (i=1; i<=noDays; i++) {
          dateString = moment(event.start).add(i-1,'days').format('YYYY-MM-DD');
          $('.fc-day[data-date="' + dateString + '"]').removeClass('fc-has-event');
        }
    };

////////////Data/////////////////////

    var whereFilter = {filter:{"where":{"userid":{"inq":["admin@abc.com","manager@abc.com"]}},"include":["events"]}};
    $scope.eventSources=[];
    getAllCalendars = function() {
            dbService.getAllCalendars(whereFilter).then(
                function(eventSources) {
                    console.log(eventSources[0]);
                    for (var i=0;i<eventSources.length;i++) {
                      $scope.eventSources.push(eventSources[i]);
                      $scope.initializeCalendars(i);
                    }
                    
                   console.log($scope.eventSources);
                    //uiCalendarConfig.calendars['groupCalendar'].fullCalendar('render');
                },
                function(error) {
                    $scope.alerts.push({msg:error,type:'danger'});
                }
            );
    };
   getAllCalendars();
/////////////////////end data//////////////////
    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 750,
        timezone:'local',
        transmitTZD: true,
        editable: true,
        theme:true,
        nextDayThreshold: '00:00:00',
        header:{
          left: 'month agendaWeek agendaDay basicWeek',
          center: 'prevYear title nextYear',
          right: 'prev today next'
        },
        buttonText: {
          today:'Today',
          month: 'Monthly',
          agendaWeek: "Weekly",
          agendaDay: "Daily",
          basicWeek: "Weekly List"
        },
        buttonIcons:{
          prev: 'left-single-arrow',
          next: 'right-single-arrow',
          prevYear: 'left-double-arrow',
          nextYear: 'right-double-arrow'
        },
        themeButtonIcons:{
          prev: 'circle-triangle-w',
          next: 'circle-triangle-e',
          prevYear: 'seek-prev',
          nextYear: 'seek-next'
        },
        stick: true,
        eventClick: $scope.alertOnEventClick,
        eventRender:$scope.eventRender,
        eventDestroy:$scope.eventDestroy,
      }
    };


}]);
