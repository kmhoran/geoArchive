/*
        Angularized service for LeafletJS
        - Kevin
*/

(function () {
    "use strict";

    angular.module(project.APPNAME)
    .factory("$leafletMapService", LeafletMapService);

    LeafletMapService.$inject = [];

    function LeafletMapService() {
        // Public values
        var service = {};

        // Private values
        var secret = {};

        // Properties
        secret.map;
        secret.selectCoords = null;
        secret.selectBounds = null;
        secret.editImage = null;

        // Public Methods
        service.editMap = _editMap;
        service.displayMap = _displayMap;
        service.removeMap = _removeMap;
        service.selectCoordinates = _selectCoordinates;
        service.removeSelectedCoords = _removeSelectedCoords;
        service.getSelectedCoords = _getSelectedCoords;
        service.getSelectedBounds = _getSelectedBounds;
        service.getRotation = _getRotation;

        return service;

        // /////////////////////////////////////////////////////////////////////////////////////////


        function _editMap(latLng, url) {
            if (latLng == null || url == null) {
                throw UserException("DisplayMap: invalid Request");
            }

            // Clear map space.
            _removeMap();

            // Set tilesets;
            var tilesets = _injectTileSets();
            console.log("tilesets: ", tilesets);
            console.log("latlng: ", latLng);

            var initialBounds = _setInitialBounds(latLng);

            secret.selectBounds = initialBounds;

            secret.map = L.map('map', {
                // Map default settings
                center: [latLng.lat, latLng.lng],
                zoom: 10,
                layers: [tilesets.tileset[0]]
            });

            // Fit map to edit image, and give a little room to work
            secret.map.fitBounds(initialBounds.pad(0.1));


            // Initialize image to Edit

            var editImgUrl = url;

            console.log("map to edit: ", editImgUrl);
            var editImgBounds = initialBounds;
            var editImgOptions = {
                "opacity": 0.5,

            };

            var editImg = new L.RotateImageOverlay(editImgUrl, editImgBounds, editImgOptions).addTo(secret.map);
            secret.editImage = editImg;


            // Dragable image bounds markers

            var dragMeTop = L.marker(initialBounds.getNorthEast(), {
                draggable: true
            });

            var dragMeBottom = L.marker(initialBounds.getSouthWest(), {
                draggable: true
            });

            // Update image bounds on marker move
            dragMeTop.on("dragend", function updateDMTop(e) {

                // TODO FIXME DELETE 
                console.log(editImg.getRotation())

                var newLatLng = this.getLatLng();

                var oldLatLng = dragMeBottom.getLatLng();

                var newBounds = new L.latLngBounds(newLatLng, oldLatLng);

                editImgBounds = newBounds;

                secret.selectBounds = newBounds;

                editImg.setBounds(editImgBounds);

            });


            dragMeBottom.on("dragend", function updateDMBottom(e) {

                // TODO FIXME DELETE 
                console.log(editImg.getRotation())

                var newLatLng = this.getLatLng();

                var oldLatLng = dragMeTop.getLatLng();

                var newBounds = new L.latLngBounds(newLatLng, oldLatLng);

                editImgBounds = newBounds;

                secret.selectBounds = newBounds;

                editImg.setBounds(editImgBounds);

            });

            // Add markers to map 
            dragMeTop.addTo(secret.map);
            dragMeBottom.addTo(secret.map);


            // Set map legend
            var baseMaps = tilesets.baseMaps;


            L.control.layers(baseMaps).addTo(secret.map);

            //Set opacity controls
            var higherOpacity = new L.Control.higherOpacity();
            secret.map.addControl(higherOpacity);
            var lowerOpacity = new L.Control.lowerOpacity();
            secret.map.addControl(lowerOpacity);

            var rotation = new L.Control.rotate();
            secret.map.addControl(rotation);

            higherOpacity.setOpacityLayer(editImg);
            lowerOpacity.setOpacityLayer(editImg);
            rotation.setTargetLayer(editImg);

        }


        // .........................................................................................

        function _displayMap(options, url) {
            // Verify neccessary components are present
            if (options.bounds == null || url == null) {
                throw UserException("DisplayMap: invalid Request");
            }

            // Prepare map

            // Clear map space.
            _removeMap();

            // Inject Tile Sets
            var tilesets = _injectTileSets();

            // Bounds should be an array of "double" values.
            var bounds = L.latLngBounds(options.bounds);
            var center = bounds.getCenter();

            // This assumes the HTML map element has id='map'.
            secret.map = L.map('map', {
                center: center,
                zoom: 10,
                layers: [tilesets.tileset[0]]
            });

            // Fit map to image, and give a little room to work. (maybe not)
            //map.fitBounds(L.latLngBounds(bounds).pad(0.02));

            // Prepare display image

            var rotate = options.rotate != null ? options.rotate : 0;
            var imgOptions = {
                "opacity": 0.5,
                "rotate": rotate
            };

            var displayImg = new L.RotateImageOverlay(url, bounds, imgOptions).addTo(secret.map);

            // Set map legend

            var baseMaps = tilesets.baseMaps;
            L.control.layers(baseMaps).addTo(secret.map);

            //Set opacity controls

            var higherOpacity = new L.Control.higherOpacity();
            secret.map.addControl(higherOpacity);
            var lowerOpacity = new L.Control.lowerOpacity();
            secret.map.addControl(lowerOpacity);

            higherOpacity.setOpacityLayer(displayImg);
            lowerOpacity.setOpacityLayer(displayImg);

        }



        // .........................................................................................

        function _selectCoordinates(latLng) {
            if (latLng == null) {
                throw UserException("SelectCoordinates: invalid request");
            }

            // Clear map space
            _removeMap()

            // Inject Tile Sets
            var tilesets = _injectTileSets();
            console.log("tilesets: ", tilesets);
            console.log("latlng: ", latLng);

            var initialBounds = _setInitialBounds(latLng);

            secret.map = L.map('map', {
                // Map default settings
                center: [latLng.lat, latLng.lng],
                zoom: 13,
                layers: [tilesets.tileset[0]]
            });
            
            // Draggable marker

            var dragMe = L.marker(latLng, {
                draggable: true
            });

            dragMe.on("dragend", function updateSelectCoord(e) {

                var newLatLng = this.getLatLng();
                secret.selectCoords = newLatLng;
            });

            // Add markers to map 
            dragMe.addTo(secret.map);

            secret.selectCoords = dragMe.getLatLng();

            // Attatch instructional pop-up 
            dragMe.bindPopup("<b>Drag & Drop!</b>").openPopup();
        }



        // .........................................................................................

        function _removeMap () {
            if (secret.map != null) {

                secret.selectCoords = null;
                secret.selectBounds = null;
                secret.editImage = null;

                secret.map.remove();

                delete secret.map;
            }
        }



        // .........................................................................................

        function _getSelectedCoords() {

            return secret.selectCoords != null? _objectifyLpoint(secret.selectCoords) : null;
        }



        // .........................................................................................

        function _getSelectedBounds() {

            return secret.selectBounds != null ? _objectifyLbounds(secret.selectBounds) : null;
        }



        // .........................................................................................

        function _getRotation() {
            return secret.editImage != null ? secret.editImage.getRotation() : null;
        }



        // .........................................................................................

        function _removeSelectedCoords()
        {
            secret.selectCoords = null;
        }



        // .........................................................................................

        function _setInitialBounds(initialLatLng) {
            var initialBounds = L.latLngBounds([(initialLatLng.lat + 1), (initialLatLng.lng - 1)], [(initialLatLng.lat - 1), (initialLatLng.lng + 1)]);

            return initialBounds;
        }


        // .........................................................................................

        function _injectTileSets() {
            // Tileset Layers
            var greyscale = Tilesets.greyscale;
            var terrain = Tilesets.terrain;
            var noMap = new NoMapLayer();

            // Set map legend
            var baseMaps = {
                "No Map": noMap,
                "Greyscale": greyscale,
                "Terrain": terrain
            };

            return {
                tileset: [greyscale, terrain, noMap],
                baseMaps: baseMaps
            }
        }


        // .........................................................................................

        function UserException(message) {
            this.message = message;
            this.name = "User Exception";
        }


        // .........................................................................................

        function _objectifyLpoint(point) {

            var latLng = { lat: 0, lng: 0 };
            var string = point.toString();

            // string returned in format "LatLng(xxx, ooo)"
            var arr = string.substring(7, string.length - 1).split(", ");

            latLng.lat = Number(arr[0]);
            latLng.lng = Number(arr[1]);

            return latLng;
        }


        // .........................................................................................

        function _objectifyLbounds(bounds) {
            var northEast = bounds.getNorthEast();
            var southWest = bounds.getSouthWest();

            var objectBounds = {
                northEast: _objectifyLpoint(northEast),
                southWest: _objectifyLpoint(southWest)
            };
            
            return objectBounds;
        }
    }

})();