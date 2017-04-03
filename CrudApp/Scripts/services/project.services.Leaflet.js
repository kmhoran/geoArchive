// Leaflet Js services

project.services.leaflet = project.services.leaflet || {};

//project.services.Leaflet.editMap = function (latLng) {
//                global = {};

//                // Set tilesets;
//                var tilesets = project.services.Leaflet.injectTilesets();
//                console.log("tilesets: ", tilesets);

//                global.initialBounds = project.services.Leaflet.setInitialBounds(latLng);


//                var map = L.map('map', {
//                    // Map default settings
//                    center: [latLng.lat, latLng.lng],
//                    zoom: 10,
//                    layers: [tilesets.tileset[0]]
//                });

//                // Fit map to edit image, and give a little room to work
//                map.fitBounds(L.latLngBounds(global.initialBounds).pad(0.1));


//                // Initialize image to Edit
//                // .................................................................................

//                var editImgUrl = "https://tile.loc.gov/image-services/iiif/service:gmd:gmd436:g4363:g4363o:la000032/full/pct:12.5/0/default.jpg";

//                console.log("map to edit: ", editImgUrl);
//                //var editImgUrl = "https://tile.loc.gov/image-services/iiif/service:gmd:gmd436:g4363:g4363l:ct001439/full/pct:25/0/default.jpg";
//                global.editImgBounds = global.initialBounds;
//                var editImgOptions = {
//                    "opacity": 0.5,
//                    //"rotate": 0
//                };

//                global.editImg = new L.RotateImageOverlay(editImgUrl, global.editImgBounds, editImgOptions).addTo(map);

//                // .................................................................................


//                // Dragable image bounds markers
//                // .................................................................................
//                var dragMeTop = L.marker(global.initialBounds[0], {
//                    draggable: true
//                });

//                var dragMeBottom = L.marker(global.initialBounds[1], {
//                    draggable: true
//                });

//                // Update image bounds on marker move
//                dragMeTop.on("dragend", function echoLatLng(e) {
//                    var newLatLng = this.getLatLng();

//                    var oldLatLng = dragMeBottom.getLatLng();

//                    var newBounds = new L.latLngBounds(newLatLng, oldLatLng);

//                    global.editImgBounds = newBounds;

//                    global.editImg.setBounds(global.editImgBounds);

//                    // TODO FIXME Logs new bounds coordinates
//                    console.log("lat-lng: ",global.editImg.getBounds().toBBoxString());

//                });


//                dragMeBottom.on("dragend", function echoLatLng(e) {
//                    var newLatLng = this.getLatLng();

//                   var oldLatLng = dragMeTop.getLatLng();

//                    var newBounds = new L.latLngBounds(newLatLng, oldLatLng);

//                    global.editImgBounds = newBounds;

//                    global.editImg.setBounds(global.editImgBounds);

//                    // TODO FIXME Logs new bounds coordinates
//                    console.log(global.editImg.getBounds().toBBoxString());

//                });

//                // Add markers to map 
//                dragMeTop.addTo(map);
//                dragMeBottom.addTo(map);

//                // .................................................................................

//                // Set map legend
//                var baseMaps = tilesets.baseMaps;


//                L.control.layers(baseMaps).addTo(map);
//                // .................................................................................

//                 //Set opacity controls
//                var higherOpacity = new L.Control.higherOpacity();
//                map.addControl(higherOpacity);
//                var lowerOpacity = new L.Control.lowerOpacity();
//                map.addControl(lowerOpacity);

//                var rotation = new L.Control.rotate();
//                map.addControl(rotation);

//                higherOpacity.setOpacityLayer(global.editImg);
//                lowerOpacity.setOpacityLayer(global.editImg);
//                rotation.setTargetLayer(global.editImg);

//                var rotate = global.editImg._image.getAttribute('data-rotate') + "deg";
//                console.log("degree: ", rotate);

//            }
//            // END RENDER MAP





project.services.leaflet = (function () {
    var returnObject = {
        editMap: _editMap,
        displayMap: _displayMap
    };

    return returnObject;

    // /////////////////////////////////////////////////////////////////////////////////

    function _editMap(latLng, url) {

        // Set tilesets;
        var tilesets = injectTilesets();
        console.log("tilesets: ", tilesets);
        console.log("latlng: ", latLng);

        var initialBounds = setInitialBounds(latLng);


        var map = L.map('map', {
            // Map default settings
            center: [latLng.lat, latLng.lng],
            zoom: 10,
            layers: [tilesets.tileset[0]]
        });

        // Fit map to edit image, and give a little room to work
        map.fitBounds(L.latLngBounds(initialBounds).pad(0.1));


        // Initialize image to Edit
        // .................................................................................

        var editImgUrl = url;

        console.log("map to edit: ", editImgUrl);
        editImgBounds = initialBounds;
        var editImgOptions = {
            "opacity": 0.5,

        };

        editImg = new L.RotateImageOverlay(editImgUrl, editImgBounds, editImgOptions).addTo(map);

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
        dragMeTop.addTo(map);
        dragMeBottom.addTo(map);

        // .................................................................................

        // Set map legend
        var baseMaps = tilesets.baseMaps;


        L.control.layers(baseMaps).addTo(map);
        // .................................................................................

        //Set opacity controls
        var higherOpacity = new L.Control.higherOpacity();
        map.addControl(higherOpacity);
        var lowerOpacity = new L.Control.lowerOpacity();
        map.addControl(lowerOpacity);

        var rotation = new L.Control.rotate();
        map.addControl(rotation);

        higherOpacity.setOpacityLayer(editImg);
        lowerOpacity.setOpacityLayer(editImg);
        rotation.setTargetLayer(editImg);

        var rotate = editImg._image.getAttribute('data-rotate') + "deg";
        console.log("degree: ", rotate);

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
        var map = L.map('map', {
            center: center,
            zoom: 10,
            layers: [tilesets.tileset[0]]
        });

        // Fit map to image, and give a little room to work.
        // map.fitBounds(L.latLngBounds(bounds).pad(0.1));

        // ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
        // Prepare display image

        var rotate = options.rotate != null ? options.rotate : 0;
        var imgOptions = {
            "opacity": 0.5,
            "rotate": rotate
        };

        var displayImg = new L.RotateImageOverlay(url, bounds, imgOptions).addTo(map);

        // ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
        // Set map legend

        var baseMaps = tilesets.baseMaps;
        L.control.layers(baseMaps).addTo(map);

        // ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
        //Set opacity controls

        var higherOpacity = new L.Control.higherOpacity();
        map.addControl(higherOpacity);
        var lowerOpacity = new L.Control.lowerOpacity();
        map.addControl(lowerOpacity);

        higherOpacity.setOpacityLayer(displayImg);
        lowerOpacity.setOpacityLayer(displayImg);

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


    // .....................................................................................

    function setInitialBounds(initialLatLng) {
        var initialBounds = [[(initialLatLng.lat + 1), (initialLatLng.lng - 1)], [(initialLatLng.lat - 1), (initialLatLng.lng + 1)]];

        return initialBounds;
    }


    // .................................................................................

    function injectTilesets() {
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
})();
