(function () {
    "use strict";

    angular.module(project.APPNAME)
    .factory("$ipLocationService", IpLocationService);

    IpLocationService.$inject = ['$http', '$sce'];


    function IpLocationService($http, $sce) {
        var service = {};

        // Injection
        service.$http = $http;
        service.$sce = $sce;

        // Properties
        var baseUrl = "http://ip-api.com/json";

        // Methods
        service.getLocation = _getLocation;

        // Return Service
        return service;

        // /////////////////////////////////////////////////////////////////////////////////////////

        function _getLocation() {

            var trustedUrl = service.$sce.trustAsResourceUrl(baseUrl);

            return $http.jsonp(trustedUrl);
        }
    }
})();