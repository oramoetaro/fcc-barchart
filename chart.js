(function () {
  const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  const w = $('#chart').width();
  const h = 300;
  const xPadding = 40;
  const yPadding = 20;

  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.send();
  req.onload = () => {
    json = JSON.parse(req.responseText);
    const dataset = json.data;

    const xScale = d3.scaleTime()
      .domain([
        d3.min(dataset, (d) => new Date(d[0])),
        d3.max(dataset, (d) => new Date(d[0]))
      ]).range([xPadding, w]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
      .range([h - yPadding, yPadding]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

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
      .attr("x", (d) => xScale(new Date(d[0])))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", w / dataset.length)
      .attr("height", (d) => h - yScale(d[1]) - yPadding)
      .attr("fill", "#c94c4c")
      .attr("onmouseover", "tooltip(this)")
      .attr("onmouseout", "$('#tooltip').hide()");

    svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0, " + (h - yPadding) + ")")
      .call(xAxis);

    svg.append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(" + xPadding + ", 0)")
      .call(yAxis);
  };
})();

function tooltip(e) {
  const elem = $(e);
  const gdp = elem.attr("data-gdp");
  const date = elem.attr("data-date");
  const left = parseInt(elem.attr("x")) + 50;

  $("#tooltip")
    .show()
    .attr("data-date", date)
    .css("left", `${left}px`);

  $(".tooltip-date").text(date);
  $(".tooltip-gdp").text(`GDP: \$${gdp} billions`);
}