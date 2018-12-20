(function () {
  const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
  var req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.send();
  req.onload = function () {
    json = JSON.parse(req.responseText);
    const dataset = json.data;
    document.getElementById('char-wrapper')
    .innerHTML = JSON.stringify(dataset);
  };
})();