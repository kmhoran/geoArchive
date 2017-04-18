(function () {
    "use strict";

    angular.module(project.APPNAME)
    .controller("goLocalController", GoLocalController);

    GoLocalController.$inject = ["$scope", "$documentHttpService", "$ipLocationService"];

    function GoLocalController($scope, $documentHttpService, $ipLocationService) {

        // Injection
        var vm = this;
        vm.$scope = $scope;
        vm.$documentHttpService = $documentHttpService;
        vm.$ipLocationService = $ipLocationService;

        // Properties
        vm.location = null;

        // Methods


        // Startup
        _getLocation();
        
        // /////////////////////////////////////////////////////////////////////////////////////////

        function _getLocation () {
            if (vm.location == null) {
                vm.$ipLocationService.getLocation()
                    .then(function populateVmLocation(location) {
                        console.log("location: ", location); // TODO FIXME DELETE
                        vm.location = location.data;

                        var latLng = { lat: vm.location.lat, lng: vm.location.lon };

                        console.log("local latLng: ", latLng);

                        _getNearbyDocuments(latLng);
                    })
                    .catch(showError);
            }
        }



        // .........................................................................................

        function _getNearbyDocuments(latLng) {

            if (latLng != null) {

                $documentHttpService.getNearbyDocuments(latLng).
                then(function populateVmNearby(nearbyDocs) {

                    vm.nearbyDocs = nearbyDocs.data.Items;

                    // TODO FIXME DELETE 
                    console.log("nearby documents: ", vm.nearbyDocs);

                })
                .catch(showError);
            }
            
        }


        // .........................................................................................

        function showError(error) {
            console.log("An http error occured! ", error);
        }
    }
})();