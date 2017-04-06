(function () {
    "use strict";

    angular.module(project.APPNAME)
    .controller('contributeController', ContributeController);

    ContributeController.$inject = ['$scope', '$documentHttpService', '$ipLocationService'
        , '$leafletMapService', '$uibModal'];

    function ContributeController($scope, $documentHttpService, $ipLocationService
        , $leafletMapService, $uibModal) {

        // Injection
        var vm = this;

        vm.$documentHttp = $documentHttpService;
        vm.$ipLocationService = $ipLocationService;
        vm.$leafletMapService = $leafletMapService;
        vm.$uibModal = $uibModal;


        // Properties
        vm.location = null;
        vm.resourceUrl = null;
        vm.validResource = false;
        vm.documentType = 'map';
        vm.markerLatLng = null;
        //vm.documentDeatils = {
        //    title: null,
        //    date: null,
        //    contributor: null,
        //    description: null,
        //    sourceInstitution: null,
        //    institutionUrl: null,
        //    resourceUrl: null
        //};

        // Methods
        //vm.verifyResource = _verifyResource;
        vm.displayResource = _displayResource;
        vm.resetResource = _resetResource;
        vm.submitform = _submitForm;
        vm.openSelectCoordinatesModal = _openSelectCoordinatesModal;


        // Startup functions
        _getLocation();
 

        // /////////////////////////////////////////////////////////////////////////////////////////

        function _getLocation() {
            if (vm.location == null) {
                vm.$ipLocationService.getLocation()
                    .then(function populateVmLocation(location) {
                        
                        vm.location = location.data;
                        vm.markerLatLng = { lat: vm.location.lat, lng: vm.location.lon };
                        console.log("location: ", location.data); // TODO FIXME DELETE
                        console.log("latLng: ", vm.markerLatLng); // TODO FIXME DELETE
                    })
                    .catch(showError);
            }
        }


        // .........................................................................................

        function _displayResource() {
            switch (vm.documentType) {
                case "map":
                    _verifyImage(_displayMap);
                    break;

                case "picture":
                    _verifyImage(_displayPicture);
                    break;

            }
        }


        // .........................................................................................

        function _verifyImage(callback) {
            vm.validResource = (vm.resourceUrl.match(/\.(jpeg|jpg|gif|png)$/) != null);
            if (vm.validResource) {
                callback();
            }
        }



        // .........................................................................................

        function _displayMap() {
            vm.$leafletMapService.editMap(vm.markerLatLng, vm.resourceUrl);
        }



        // .........................................................................................

        function _displayPicture() {
            // Do something
        }


        // .........................................................................................

        function _displayVideo() {
            // Do something
        }



        // .........................................................................................

        function _resetResource() {
            vm.resourceUrl = '';
            vm.validResource = false;
            vm.$leafletMapService.removeMap();
        }



        // .........................................................................................

        function _submitForm(isValid) {
            if (isValid) {
                console.log("data is valid! go save this object -> ");
            } else {
                console.log("form submitted with invalid data :(")
            }
        };


        // .........................................................................................

        function showError(error) {
            console.log("An http error occured! ", error);
        };


        // .........................................................................................

        function _openSelectCoordinatesModal() {
            var modalInstance = vm.$uibModal.open({
                animation: true,
                templateUrl: '/Scripts/App/Pages/Templates/selectCoordinatesModal.html',       
                controller: 'selectCoordinatesModalController as SlCdrMC',
                size: 'lg',
                resolve: { 
                    items: function () {
                        return vm.markerLatLng;
                    }
                }
            });

            //  when the modal closes it returns a promise
            modalInstance.result.then(function (newMarker) {
                vm.markerLatLng = newMarker;    //  if the user closed the modal by clicking Save  
            }, function () {
                console.log('Modal dismissed at: ' + new Date());   //  if the user closed the modal by clicking cancel
            });
        }
    }

})();