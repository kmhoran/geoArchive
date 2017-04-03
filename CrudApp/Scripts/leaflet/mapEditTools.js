/*
        Map Edit Toos is extention of and inspired by the opacity slider tool credited below.
*/




console.log("mapEditTools.js attached.")


// Global Variables
var targetLayer;
var theMap;

L.Control.rotate = L.Control.extend({
    options: {
        position: 'topright'
    },
    setTargetLayer: function (layer) {
        targetLayer = layer;
    },
    
    onAdd: function (map) {
        var rotationDiv = L.DomUtil.create('div', 'roatation-control');

        // Specifies in-map rotation controller object. LeafletJS severly limits these options.
        rotationDiv.innerHTML = '<br/><p><strong>Set Rotation</strong></p><input id="rotation-input" type="number" max="180" min="-180" value="0" />';


        $("#map").on("click", "#rotation-input", function () {
            
            var rotate = $(this).val();
            console.log("A change!", rotate);
            targetLayer._image.setAttribute("data-rotate", rotate);
            console.log("An Effect!", targetLayer._image.getAttribute("data-rotate"));
            targetLayer._reset();
        });



        theMap = map;
        //When you double-click on the control, do not zoom.
        theMap.doubleClickZoom.disable();
        theMap.once('click', function (e) {
            theMap.doubleClickZoom.enable();
        });
        return rotationDiv;

    }
});




// /////////////////////////////////////////////////////////////////////////////////////////////////
/*
        Leaflet.OpacityControls, a plugin for adjusting the opacity of a Leaflet map.
        (c) 2013, Jared Dominguez
        (c) 2013, LizardTech
        https://github.com/lizardtechblog/Leaflet.OpacityControls
*/





//Create a control to increase the opacity value. This makes the image more opaque.
L.Control.higherOpacity = L.Control.extend({

    options: {
        position: 'topright',
    },
    setOpacityLayer: function (layer) {
        // This cannot be set on Add because of LeafletJS particularities
        targetLayer = layer;
    },

    onAdd: function (map) {

        var higher_opacity_div = L.DomUtil.create('div', 'higher_opacity_control');

        theMap = map;

        L.DomEvent.addListener(higher_opacity_div, 'click', L.DomEvent.stopPropagation)
            .addListener(higher_opacity_div, 'click', L.DomEvent.preventDefault)
            .addListener(higher_opacity_div, 'click', function () {onClickHigherOpacity();});

        

        return higher_opacity_div;
    }

});

//Create a control to decrease the opacity value. This makes the image more transparent.
L.Control.lowerOpacity = L.Control.extend({
    options: {
        position: 'topright'
    },

    setOpacityLayer: function (layer) {
        // This cannot be set on Add because of LeafletJS particularities
        targetLayer = layer;
    },
    onAdd: function (map) {

        var lower_opacity_div = L.DomUtil.create('div', 'lower_opacity_control');

        L.DomEvent.addListener(lower_opacity_div, 'click', L.DomEvent.stopPropagation)
            .addListener(lower_opacity_div, 'click', L.DomEvent.preventDefault)
            .addListener(lower_opacity_div, 'click', function () { onClickLowerOpacity() });

        theMap = map;

        return lower_opacity_div;
    }
});



function onClickHigherOpacity() {

    // TODO FIXME DELETE
    var opacity_value = targetLayer.options.opacity;

    if (opacity_value > 1) {
        return;
    } else {
        targetLayer.setOpacity(opacity_value + 0.2);
        //When you double-click on the control, do not zoom.

        theMap.doubleClickZoom.disable();
        theMap.once('click', function (e) {
            theMap.doubleClickZoom.enable();
        });
    }

}

function onClickLowerOpacity() {
    // TODO FIXME DELETE
    console.log("layer options: ", targetLayer)

    var opacity_value = targetLayer.options.opacity;

    if (opacity_value < 0) {
        return;
    } else {
        targetLayer.setOpacity(opacity_value - 0.2);
        //When you double-click on the control, do not zoom.
        theMap.doubleClickZoom.disable();
        theMap.once('click', function (e) {
            theMap.doubleClickZoom.enable();
        });
    }

}

// /////////////////////////////////////////////////////////////////////////////////////////////////

