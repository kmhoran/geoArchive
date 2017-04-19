(function () {
    angular.module(project.APPNAME)
    .controller('mapController', MapController);

    MapController.$inject = ['$scope', '$leafletMapService'];

    function MapController($scope, $leafletMapService) {

        // Injection
        var vm = this;
        vm.$leafletMapService = $leafletMapService;

        // Properties
        vm.baseModel = null;

        // Methods


        // Startup 
        $scope.init = function (baseModel) {
            vm.baseModel = baseModel;
            console.log("this is the passed vm: ", baseModel);

            var options = {
                bounds: vm.baseModel.Bounds,
                rotate: vm.baseModel.Rotation 
            }

            vm.$leafletMapService.displayMap(options, vm.baseModel.ResourceUrl);
        }

        // /////////////////////////////////////////////////////////////////////////////////////////


    }
})();