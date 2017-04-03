(function () {
    "use strict"
    angular.module(project.APPNAME)
    .controller("homeController", HomeController);

    HomeController.$inject = ['$documentHttpService', '$ipLocationService', '$leafletMapService'];

    function HomeController($documentHttpService, $ipLocationService, $leafletMapService) {

        // Injection
        var vm = this;
        vm.$documentHttp = $documentHttpService;
        vm.$ipLocationService = $ipLocationService;
        vm.$leafletMapService = $leafletMapService


        // Properties
        vm.latest = null;
        vm.location = null;
        vm.featuredMap = null;

        // Public Methods


        // Stat-up functions
        _getLatestDocuments();
        _getLocation();
        _getFeaturedMap(69);

        // /////////////////////////////////////////////////////////////////////////////////////////

        function _getLatestDocuments() {
            return $documentHttpService.getLatest()
                .then(function populateVmLatest(latest) {


                    vm.latest = latest.data.Items;

                    console.log("test: ", vm.latest); // TODO FIXME DELETE
                })
                .catch(showError);
        }



        // .........................................................................................

        function _getFeaturedMap(featuredDocumentId) {
            return $documentHttpService.getMapByDocumentId(featuredDocumentId)
            .then(function populateFeaturedMap(fMap) {
                vm.featuredMap = fMap.data.Item;
                console.log("featured map: ", fMap.data.Item); // TODO FIXME DELETE

                // Use data to populate featured map.
                var options = {
                    bounds: [
                        [
                            vm.featuredMap.TopLat,
                            vm.featuredMap.TopLng
                        ],
                        [
                            vm.featuredMap.BottomLat,
                            vm.featuredMap.BottomLng
                        ]],

                    rotate: vm.featuredMap.Rotate
                };

                //var latLng = { lat: vm.featuredMap.TopLat, lng: vm.featuredMap.TopLng }
                console.log("homeController options: ", options);
                vm.$leafletMapService.displayMap(options, vm.featuredMap.ResourceUrl);
                //project.services.leaflet.editMap(options, vm.featuredMap.ResourceUrl);

            })
            .catch(showError)
        }


        // .........................................................................................

        function _getLocation() {
            if (vm.location == null) {
                vm.$ipLocationService.getLocation()
                    .then(function populateVmLocation(location) {
                        console.log("location: ", location); // TODO FIXME DELETE
                        vm.location = location.data;
                    })
                    .catch(showError);
            }
        }


        // .........................................................................................

        function showError(error) {
            console.log("An http error occured! ", error);
        };

    }

})();