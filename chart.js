(function () {

  $('[data-toggle="tooltip"]').tooltip();

  const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  const w = $('#chart').width();
  const h = 300;
  const padding = 0;

  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.send();
  req.onload = () => {
    json = JSON.parse(req.responseText);
    const dataset = json.data;

    const xScale = d3.scaleLinear()
      .domain([
        d3.min(dataset, (d) => new Date(d[0]).getTime()),
        d3.max(dataset, (d) => new Date(d[0]).getTime())
      ]).range([padding, w - padding]);

    const yScale = d3.scaleLinear()
      .domain([
        d3.min(dataset, (d) => d[1]),
        d3.max(dataset, (d) => d[1])
      ]).range([padding, h - padding]);

    const svg = d3.select(".chart")
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("x", (d) => xScale(new Date(d[0]).getTime()))
    .attr("y", (d) => h - yScale(d[1]))
    .attr("width", w / dataset.length)
    .attr("height", (d) => yScale(d[1]))
    .attr("fill", "#c94c4c")
    .append("title")
    .text((d) => d[0]);

    // document.getElementById('char-wrapper')
    //   .innerHTML = JSON.stringify(dataset);
  };

})();