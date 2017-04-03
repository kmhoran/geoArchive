
// Extention for LeafletJs

// On initialize
console.log("noMap.js attached.");

// ...............................................................................................................

var NoMapLayer = L.GridLayer.extend({
    createTile: function(coords){
        // create a <canvas> element for drawing
        var tile = L.DomUtil.create('canvas', 'leaflet-tile');

        // setup tile width and height according to the options
        var size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;

        // get a canvas context and draw something on it using coords.x, coords.y and coords.z
        var context = tile.getContext('2d');

		context.beginPath();
		context.rect(0, 0, 256, 256);
		context.lineWidth = 2;

		context.fillStyle = 'white';

        // return the tile so it can be rendered on screen
        return tile;
    }
});



// ...............................................................................................................
// Code based on:
// https://github.com/Leaflet/Leaflet/issues/2776
// https://mourner.github.io/Leaflet/reference.html#gridlayer
var DebugLayer = L.GridLayer.extend({
    createTile: function(coords){
        // create a <canvas> element for drawing
        var tile = L.DomUtil.create('canvas', 'leaflet-tile');

        // setup tile width and height according to the options
        var size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;

        // get a canvas context and draw something on it using coords.x, coords.y and coords.z
        var context = tile.getContext('2d');

		context.beginPath();
		context.rect(0, 0, 256, 256);
		context.lineWidth = 2;
		context.strokeStyle = 'white';
		context.stroke();

		context.font="20px Arial";
		context.fillStyle = 'white';
		context.fillText(coords.x + " / " + coords.y + " / " + coords.z, 80, 140);

        // return the tile so it can be rendered on screen
        return tile;
    }
});

// These do not work:
//debugLayer.addTo(map);

// Use this in main project.
//--> new DebugLayer().addTo(map);