angular.module('libraryServices', ['lbServices'])
.service('dbService', ['$q', 'Calendars', function($q, Calendars) {
    var dbService = this;
    var def = $q.defer();
    dbService.getAllCalendars = function(where) {
      // return the promise
      return $q(function(resolve, reject) {
          Calendars.find(where).$promise.then(

            function(response) {
              var calendars = response;
              if (calendars && calendars.length) {
                resolve(calendars);
              } else {
                reject("Library is empty.");
              }
            },

            function(errorData) {
                console.log(errorData);
                              if (errorData.status >= 400) {
                reject(errorData.data.error.message);
              }
            });

      });
    };
 }]);