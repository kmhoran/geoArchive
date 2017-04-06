(function () {
    "use strict";

    angular.module(project.APPNAME)
        .controller('selectCoordinatesModalController', SelectCoordinatesModalController);

    SelectCoordinatesModalController.$inject = ['$scope', '$leafletMapService'
        , '$uibModalInstance', 'items'];

    function SelectCoordinatesModalController(
        $scope
        , $leafletMapService
        , $uibModalInstance
        , items) {

        // Injection
        var vm = this;

        vm.$scope = $scope;
        vm.$leafletMapService = $leafletMapService;
        vm.$uibModalInstance = $uibModalInstance;

        // Properties
        vm.markerLatLng = items;

        // Methods
        vm.confirm = _confirm;
        vm.cancel = _cancel;

        // Startup Functions
        vm.$uibModalInstance.rendered.then(function () {
            vm.$leafletMapService.selectCoordinates(vm.markerLatLng);
        });
        

        // /////////////////////////////////////////////////////////////////////////////////////////

        //  $uibModalInstance is used to communicate and send data back to main controller
        function _confirm() {

            vm.markerLatLng = vm.$leafletMapService.getSelectedCoords();
            vm.$leafletMapService.removeSelectedCoords();
            vm.$uibModalInstance.close(vm.markerLatLng);
        };


        // .........................................................................................

        function _cancel () {
            vm.$uibModalInstance.dismiss('cancel');
        };
    }
})();