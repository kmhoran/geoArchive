﻿(function () {
    "use strict";

    angular.module(project.APPNAME)
    .factory("$mapHttpService", MapHttpService);

    MapHttpService.$inject = ['$http'];

    function MapHttpService($http) {

        //- Properties
        var baseUrl = "http://localhost:52749/api/archive/map";

        //- Public methods
        return {
            contributeMap: _contributeMap
        };


        // /////////////////////////////////////////////////////////////////////////////////////////


        function _contributeMap(data) {

            var settings = {
                method: "POST",
                url: baseUrl,
                data: data
            }

            return $http(settings);
        }
    }
})();