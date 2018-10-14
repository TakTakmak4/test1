WaveGraphCtrl = function () {
    this.width;
    this.height;
    this.svg;
    this.wvline;
    this.xscale;
    this.yscale;
};


WaveGraphCtrl.prototype.setInitGraph = function () {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    this.width = 600 - margin.left - margin.right;
    this.height = 600 - margin.top - margin.bottom;
    
    // set the ranges
    x = d3.scaleLinear().range([0, this.width]);
    x.domain([0, 300]);
    this.xscale = x;
    y = d3.scaleLinear().range([this.height, 0]);
    y.domain([0, 700]);
    this.yscale = y;


    // define the line
    this.wvline = d3.line()
        .x(function (d) { return d.x; })
        .y(function (d) { return y(d.y); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    this.svg = d3.select("#grapharea").append("svg")
        .attr("width", this.width + margin.left + margin.right)
        .attr("height", this.height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // Add the X Axis
    this.svg.append("g")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    this.svg.append("g")
        .call(d3.axisLeft(y));

};

WaveGraphCtrl.prototype.calcDistance = function (eqlat, eqlng, slat, slng) {
    function radians(deg) {
        return deg * Math.PI / 180;
    }

    return 6378.14 * Math.acos(Math.cos(radians(eqlat)) *
        Math.cos(radians(slat)) *
        Math.cos(radians(slng) - radians(eqlng)) +
        Math.sin(radians(eqlat)) *
        Math.sin(radians(slat)));
};
WaveGraphCtrl.prototype.calcDistance = function (fromtime,totime){
    var tomom = moment(totime,"YYYYMMDDhhmmss");
    var frommom = moment(fromtime,"YYYYMMDDhhmmss");
    return tomom.diff(frommom,'seconds',true);
};

WaveGraphCtrl.prototype.drowWave = function (_that, jsonData) {
    that = _that;
    jsonData.items.forEach(function (value, itmidx) {
        var dist = that.calcDistance(36.123, 139.123, value.lat, value.lng);
        var siteid = value.siteid;
        var pathinfo = [];
        
        value.data.forEach(function (wval, idx) {
            //itmidx:test
            pathinfo.push({ x: idx * 0.5 + itmidx * 20, y: wval*10.0+dist });
        });
        that.svg.append("path")
            .attr("d", that.wvline(pathinfo)) // さきほどの関数に座標の配列を引数で渡す
            .style("stroke-width", 2) // 線の太さを決める
            .style("stroke", "steelblue") // 色を決める
            .style("fill", "none");
        
        console.log(dist);
    });
};

WaveGraphCtrl.prototype.makeGraph = function () {
    var that = this;
    var url = "/static/data/wavedata.json";
    fetch(url).then(function (response) {
        return response.json();
    }).then(jsonData => {
        that.drowWave(that, jsonData);
    }).catch(err => {
        console.log('rejected:', err);
    });
};

WaveGraphCtrl.prototype.moveGraph = function () {
    return "DEBUG";
};