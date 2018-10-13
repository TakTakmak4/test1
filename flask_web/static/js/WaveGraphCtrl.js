WaveGraphCtrl = function () {
  this.width;
  this.height;
  this.svg;
  this.x;
  this.y;

};

WaveGraphCtrl.prototype.setInitGraph = function () {
  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 20, bottom: 30, left: 50 };
  this.width = 600 - margin.left - margin.right,
  this.height = 600 - margin.top - margin.bottom;

  // parse the date / time
  var parseTime = d3.timeParse("%d-%b-%y");

  // set the ranges
  this.x = d3.scaleLinear().range([0, this.width]);
  this.y = d3.scaleLinear().range([this.height, 0]);

  // define the line
  var valueline = d3.line()
    .x(function (d) { return this.x(d.date); })
    .y(function (d) { return this.y(d.close); });

  // append the svg obgect to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  this.svg = d3.select("#grapharea").append("svg")
    .attr("width", this.width + margin.left + margin.right)
    .attr("height", this.height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
  
  this.y.domain([0,300]);
  this.x.domain([0,300]);

  // Add the X Axis
  this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x));

  // Add the Y Axis
  this.svg.append("g")
      .call(d3.axisLeft(this.y));

};

WaveGraphCtrl.prototype.makeGraph = function () {
  var that = this;
  var url = "/static/data/wavedata.json";
  fetch(url).then(function(response) {
      return response.json();
  }).then(jsonData => {
      //console.log('jsonData:', jsonData);
      jsonData.items.forEach(function( value ) {
          console.log(value);
      });
  }).catch(err => {
      console.log('rejected:', err); 
  });
};

WaveGraphCtrl.prototype.moveGraph = function () {
  return "DEBUG";
};