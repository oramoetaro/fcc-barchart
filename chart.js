(function () {
  const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';
  const w = 500;
  const h = 500;
  const padding = 30;

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
      ]).range(padding, w - padding);

    const yScale = d3.scaleLinear()
      .domain([
        d3.min(dataset, (d) => d[1]),
        d3.max(dataset, (d) => d[1])
      ]).range([0, w]);

    const svg = d3.select(".chart")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .style("fill", "blue");

    // document.getElementById('char-wrapper')
    //   .innerHTML = JSON.stringify(dataset);
  };

})();