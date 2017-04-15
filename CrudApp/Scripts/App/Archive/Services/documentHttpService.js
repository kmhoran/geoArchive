(function () {
    "use strict";

    angular.module(project.APPNAME)
    .factory("$documentHttpService", DocumentHttpService);

    DocumentHttpService.$inject = ['$http'];


    function DocumentHttpService($http) {
        var service = {};

        // Injection
        service.$http = $http;

        // Properties
        var baseUrl = "http://localhost:52749/api/archive/";

        // Public Methods
        service.getDocumentById = _getDocumentById;
        service.getLatest = _getLatest;
        service.getMapByDocumentId = _getMapByDocumentId;

        // Return Service
        return service;

        // /////////////////////////////////////////////////////////////////////////////////////////

        function _getDocumentById(documentId) {

            var url = baseUrl + documentId;

            var settings = {
                method: "GET",
                url: url
            };

            return $http(settings);
        }



        // .........................................................................................

        function _getMapByDocumentId(documentId) {

            var url = baseUrl + documentId + "/map";

            var settings = {
                method: "GET",
                url: url
            };

            return $http(settings);
        }


        // .........................................................................................

        function _getLatest () {

            var url = baseUrl + "latest";

            var settings = {
                method: "GET",
                url: url
            };

            return $http(settings);
        }
    }

})();