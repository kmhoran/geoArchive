/*
   Rotate Image Overlay (Rio) Extention of LeafletJS
   - Kevin Horan
*/


L.RotateImageOverlay = L.ImageOverlay.extend ({

    // Overrides for "inherited" methods

    include: L.Mixin.Events,

    initialize: _RioInitialize,
    
    // handles smooth zooming.
    _animateZoom: _RioAnimateZoom,

    // Renders image overlay after zoom completes.
    _reset: _RioReset,

    _initImage: _RioInitImage,

    getRotation: _getRotation
});



L.RotateImageOverlay.addInitHook(function () {

    this._image = this.getElement();

    this.on('remove', function () {
        if (this.editing) { this.editing.disable(); }
    });
});


// .................................................................................................

function _RioInitialize(url, bounds, options) {

    this._url = url;

    this._bounds = new L.latLngBounds(bounds);

    this._rotate = options.rotate;

    L.setOptions(this, options);

}


// .................................................................................................

function _RioAnimateZoom(e) {

    var scale = this._map.getZoomScale(e.zoom),
                offset = this._map._latLngBoundsToNewLayerBounds(this._bounds, e.zoom, e.center).min;

    _RioSetTransform(this._image, offset, scale);
}


// .................................................................................................

function _RioReset () {
    var image = this._image,
        bounds = new L.Bounds(
            this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
        size = bounds.getSize();

    _RioSetPosition(image, bounds.min);

    image.style.width = size.x + 'px';
    image.style.height = size.y + 'px';

}


// .................................................................................................

function _RioSetPosition(el, point) { // (HTMLElement, Point[, Boolean])

    /*eslint-disable */
    el._leaflet_pos = point;
    /*eslint-enable */

    if (L.Browser.any3d) {
        _RioSetTransform(el, point);
    } else {
        el.style.left = point.x + 'px';
        el.style.top = point.y + 'px';
    }
}



// .................................................................................................

function _RioSetTransform (el, offset, scale) {
    var pos = offset || new L.Point(0, 0);

    var rotate = el.getAttribute('data-rotate');

    el.style['webkitTransformOrigin'] = pos.x + 'px,' + pos.y + 'px';

    el.style[L.DomUtil.TRANSFORM] = 
        (L.Browser.ie3d ?
            'translate(' + pos.x + 'px,' + pos.y + 'px) rotate('+ rotate +'deg)' :
            'translate3d(' + pos.x + 'px,' + pos.y + 'px,0) rotate(' + rotate + 'deg)') +
        (scale ? ' scale(' + scale + ')' : '');
}


// .................................................................................................

function _RioInitImage () {
    var img = this._image = L.DomUtil.create('img',
            'leaflet-image-layer ' + (this._zoomAnimated ? 'leaflet-zoom-animated' : ''));

    var rotateVal = this._rotate != null ? this._rotate : 0;
    img.setAttribute("data-rotate", rotateVal);

    img.onselectstart = L.Util.falseFn;
    img.onmousemove = L.Util.falseFn;

    img.onload = L.bind(this.fire, this, 'load');

    if (this.options.crossOrigin) {
        img.crossOrigin = '';
    }

    img.src = this._url;
    img.alt = this.options.alt;
}


// .................................................................................................

function _getRotation() {
    return Number(this._image.getAttribute('data-rotate'));
}


