﻿(function () {
    "use strict";

    angular.module(project.APPNAME)
    .factory("$documentHttpService", DocumentHttpService);

    DocumentHttpService.$inject = ['$http'];


    function DocumentHttpService($http) {

        // Properties
        var baseUrl = "http://localhost:52749/api/archive/";

        // Build Service
        var service = {
            getDocumentById: _getDocumentById,
            getNearbyDocuments: _getNearbyDocuments,
            getLatest: _getLatest,
            getMapByDocumentId: _getMapByDocumentId
        };

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

        function _getNearbyDocuments(latLng) {

            // Pass latLng as URL param
            var lat = latLng.lat;
            var lng = latLng.lng;

            var url = baseUrl.concat("nearby/?lat=", lat,"&lng=", lng);

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

        function _getLatest() {

            var url = baseUrl + "latest";

            var settings = {
                method: "GET",
                url: url
            };

            return $http(settings);
        }
    }

})();