(function () {
  const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  const w = $('#chart').width();
  const h = 300;
  const padding = 40;

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
      ]).range([padding, w]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset, (d) => d[1])])
      .range([padding, h - padding]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    xAxis.ticks(6);
    yAxis.tickValues([yScale(0), yScale(15000)]);

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
      .attr("y", (d) => h - yScale(d[1]))
      .attr("width", w / dataset.length)
      .attr("height", (d) => yScale(d[1]) - padding)
      .attr("fill", "#c94c4c")
      .attr("data-toggle", "tooltip")
      .attr("data-placement", "right")
      .attr("title", "titulo");

    svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0, " + (h - padding) + ")")
      .call(xAxis);

    svg.append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxis);

    // Initialize Bootstrap Tooltips
    $('[data-toggle="tooltip"]').tooltip()

  };

})();