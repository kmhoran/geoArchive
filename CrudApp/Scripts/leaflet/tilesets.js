// Tilesets for leaflet maps
var Tilesets = (function () {
	console.log("Tilesets added.")
	var greyscale = L.tileLayer('https://api.mapbox.com/styles/v1/kevinmichaelhoran/cizrozqad006o2smiimub0e5b/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2V2aW5taWNoYWVsaG9yYW4iLCJhIjoiY2l6cWNpc2JyMDBoZTJwb2FuM2pwanZmdSJ9.KmxQvSUTgN6Ak_wWizCBcA', {
                    id: 'mapbox.light',
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18,
                    id: 'kevinmichaelhoran',
                    accessToken: 'pk.eyJ1Ijoia2V2aW5taWNoYWVsaG9yYW4iLCJhIjoiY2l6cWNpc2JyMDBoZTJwb2FuM2pwanZmdSJ9.KmxQvSUTgN6Ak_wWizCBcA'
                });

var terrain = L.tileLayer('https://api.mapbox.com/styles/v1/kevinmichaelhoran/cizxapqs300222sobz933ozuh/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2V2aW5taWNoYWVsaG9yYW4iLCJhIjoiY2l6cWNpc2JyMDBoZTJwb2FuM2pwanZmdSJ9.KmxQvSUTgN6Ak_wWizCBcA', {
                    id: 'mapbox.outdoors',
                    attribution: '',
                    maxZoom: 18,
                    id: 'kevinmichaelhoran',
                    accessToken: 'pk.eyJ1Ijoia2V2aW5taWNoYWVsaG9yYW4iLCJhIjoiY2l6cWNpc2JyMDBoZTJwb2FuM2pwanZmdSJ9.KmxQvSUTgN6Ak_wWizCBcA'
                });
return {
	greyscale: greyscale,

	terrain: terrain
}

})(L);


