(function () {
    "use strict";

    angular.module(project.APPNAME)
    .factory("$mapHttpService", MapHttpService);

    MapHttpService.$inject = ['$http'];

    function MapHttpService($http) {
        //- Injection
        var vm = this;
        vm.$http = $http;

        //- Properties
        var baseUrl = "http://localhost:52749/api/map/";

        //- Public methods
        vm.contributeMap = _contributeMap;


        // /////////////////////////////////////////////////////////////////////////////////////////


        function _contributeMap(data) {

            settings = {
                method: "POST",
                url: baseUrl,
                data: data
            }

            vm.$http(settings);
        }
    }
})();