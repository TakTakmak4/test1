// クラスとコンストラクタは関数を使って定義します
MapCtrl = function() {
  this.eqmap;
  this.eqdaylist;
  this.wavegraphctrl;
};
MapCtrl.prototype.setWaveGraphCtrl = function(_wavegraphctrl) {
    this.wavegraphctrl = _wavegraphctrl;
    this.wavegraphctrl.setInitGraph();
};
MapCtrl.prototype.makeMap = function() {
  this.eqmap = L.map('mapid').setView([35.0, 140.0], 5);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery c <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidGtiIiwiYSI6ImNqbXh3NHRkYzBkdnUzcW05c3lvYm1sZHgifQ.2E7quweEZfieV4FoW40rZA'
}).addTo(this.eqmap);
  return "DEBUG";
};

MapCtrl.prototype.protEq = function() {
    var that = this;
    var url = "/static/data/eqinfo.json";
    fetch(url).then(function(response) {
        return response.json();
    }).then(jsonData => {
        //console.log('jsonData:', jsonData);
        jsonData.items.forEach(function( value ) {
           var circle = L.circle([value.lat, value.lng], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5
            }).addTo(that.eqmap);
            circle.setRadius(200);
            circle.on('click', function (e) {
                that.wavegraphctrl.makeGraph();
            });
            console.log(value);
        });
    }).catch(err => {
        console.log('rejected:', err); 
    });
};