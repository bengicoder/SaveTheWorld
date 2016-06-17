(function () {
    'use strict';

    var serviceId = 'datacontext';
    angular.module('app').factory(serviceId, ['common', datacontext]);

    function datacontext(common) {
        var $q = common.$q;

        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount
        };

        return service;

        function getMessageCount() { return $q.when(0); }

        function getPeople() {
            var people = [
                { name: 'Bengi', type: 'Bus', duration: 60, location: 'New Jersey' },
                { name: 'Jimmy', type: 'Car', duration: 44, location: 'California' },
                { name: 'Bubba', type: 'Car', duration: 33, location: 'New York' },
                { name: 'Bubba Jr', type: 'Car', duration: 8, location: 'Oregon' },
                { name: 'The Dude', type: 'Train', duration: 10, location: 'Vietnam' },
                { name: 'Bengi', type: 'Ship', duration: 200, location: 'California' },
                { name: 'Larry', type: 'Wheelchair', duration: 50, location: 'Arizona' }
            ];
            return $q.when(people);
        }
    }
})();