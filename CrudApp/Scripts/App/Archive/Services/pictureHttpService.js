(function () {
    "use strict";

    angular.module(project.APPNAME)
    .factory('$pictureHttpService', PictureHttpService);

    PictureHttpService.$inject = ['$http'];

    function PictureHttpService($http) {

        // Base Url
        var baseUrl = "http://localhost:52749/api/archive/picture";

        return {
            contributePicture: _contributePicture
        }

        // /////////////////////////////////////////////////////////////////////////////////////////

        function _contributePicture(data) {

            var settings = {
                method: "POST",
                url: baseUrl,
                data: data
            }

            return $http(settings);
        }

    }
})();