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
        var service = {};

        // Properties
        service.map;

        // Public Methods
        service.editMap = _editMap;
        service.displayMap = _displayMap;
        service.removeMap = _removeMap;

        return service;

        // /////////////////////////////////////////////////////////////////////////////////////////


        function _editMap(latLng, url) {
            if (latLng == null || url == null) {
                throw UserException("DisplayMap: invalid Request");
            }

            // Set tilesets;
            var tilesets = _injectTileSets();
            console.log("tilesets: ", tilesets);
            console.log("latlng: ", latLng);

            var initialBounds = _setInitialBounds(latLng);


            service.map = L.map('map', {
                // Map default settings
                center: [latLng.lat, latLng.lng],
                zoom: 10,
                layers: [tilesets.tileset[0]]
            });

            // Fit map to edit image, and give a little room to work
            service.map.fitBounds(L.latLngBounds(initialBounds).pad(0.1));


            // Initialize image to Edit
            // .................................................................................

            var editImgUrl = url;

            console.log("map to edit: ", editImgUrl);
            var editImgBounds = initialBounds;
            var editImgOptions = {
                "opacity": 0.5,

            };

            var editImg = new L.RotateImageOverlay(editImgUrl, editImgBounds, editImgOptions).addTo(service.map);

            // .................................................................................


            // Dragable image bounds markers
            // .................................................................................

            var dragMeTop = L.marker(initialBounds[0], {
                draggable: true
            });

            var dragMeBottom = L.marker(initialBounds[1], {
                draggable: true
            });

            // Update image bounds on marker move
            dragMeTop.on("dragend", function echoLatLng(e) {
                var newLatLng = this.getLatLng();

                var oldLatLng = dragMeBottom.getLatLng();

                var newBounds = new L.latLngBounds(newLatLng, oldLatLng);

                editImgBounds = newBounds;

                editImg.setBounds(editImgBounds);

                // TODO FIXME Logs new bounds coordinates
                console.log("lat-lng: ", editImg.getBounds().toBBoxString());

            });


            dragMeBottom.on("dragend", function echoLatLng(e) {
                var newLatLng = this.getLatLng();

                var oldLatLng = dragMeTop.getLatLng();

                var newBounds = new L.latLngBounds(newLatLng, oldLatLng);

                editImgBounds = newBounds;

                editImg.setBounds(editImgBounds);

                // TODO FIXME Logs new bounds coordinates
                console.log(editImg.getBounds().toBBoxString());

            });

            // Add markers to map 
            dragMeTop.addTo(service.map);
            dragMeBottom.addTo(service.map);

            // .................................................................................

            // Set map legend
            var baseMaps = tilesets.baseMaps;


            L.control.layers(baseMaps).addTo(service.map);
            // .................................................................................

            //Set opacity controls
            var higherOpacity = new L.Control.higherOpacity();
            service.map.addControl(higherOpacity);
            var lowerOpacity = new L.Control.lowerOpacity();
            service.map.addControl(lowerOpacity);

            var rotation = new L.Control.rotate();
            service.map.addControl(rotation);

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

            // ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
            // Prepare map

            // Inject Tile Sets
            var tilesets = _injectTileSets();

            // Bounds should be an array of "double" values.
            var bounds = L.latLngBounds(options.bounds);
            var center = bounds.getCenter();

            // This assumes the HTML map element has id='map'.
            service.map = L.map('map', {
                center: center,
                zoom: 10,
                layers: [tilesets.tileset[0]]
            });

            // Fit map to image, and give a little room to work. (maybe not)
            //map.fitBounds(L.latLngBounds(bounds).pad(0.02));

            // ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
            // Prepare display image

            var rotate = options.rotate != null ? options.rotate : 0;
            var imgOptions = {
                "opacity": 0.5,
                "rotate": rotate
            };

            var displayImg = new L.RotateImageOverlay(url, bounds, imgOptions).addTo(service.map);

            // ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
            // Set map legend

            var baseMaps = tilesets.baseMaps;
            L.control.layers(baseMaps).addTo(service.map);

            // ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
            //Set opacity controls

            var higherOpacity = new L.Control.higherOpacity();
            service.map.addControl(higherOpacity);
            var lowerOpacity = new L.Control.lowerOpacity();
            service.map.addControl(lowerOpacity);

            higherOpacity.setOpacityLayer(displayImg);
            lowerOpacity.setOpacityLayer(displayImg);

        }



        // .........................................................................................

        function _selectCoordinates(latLng) {
            if (latLng == null) {
                throw UserException("SelectCoordinates: invalid request");
            }

            // Set tilesets;
            var tilesets = _injectTileSets();
            console.log("tilesets: ", tilesets);
            console.log("latlng: ", latLng);

            var initialBounds = _setInitialBounds(latLng);


            service.map = L.map('map', {
                // Map default settings
                center: [latLng.lat, latLng.lng],
                zoom: 13,
                layers: [tilesets.tileset[0]]
            });

            
            // ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
            // Draggable marker

            var dragMe = L.marker(initialBounds[0], {
                draggable: true
            });

            // Add markers to map 
            dragMe.addTo(service.map);


            // Attatch instructional pop-up 
            dragMe.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
        }

        // .........................................................................................

        function _removeMap () {
            if (service.map != null) {
                service.map.remove();
                delete service.map;
            }
        }

        // .........................................................................................

        function _setInitialBounds(initialLatLng) {
            var initialBounds = [[(initialLatLng.lat + 1), (initialLatLng.lng - 1)], [(initialLatLng.lat - 1), (initialLatLng.lng + 1)]];

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
    }

})();