mermaid.initialize({
  startOnLoad: true,
  securityLevel: 'loose',
});


var sceneJSON; 
var currentSceneName;
var graphJSON;

window.onload = function () {
  localStorage.clear();
  loadGraph();
}

function loadGraph() {
    var url = "https://www.devi-a.com/FatalFrequenciesSceneGraph/data/graph.json";
  // use AJAX to fetch the appropriate JSON data
    $.ajax({
      url: url,
      dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
      success:function(results){
        graphJSON = results; // record the results of the json query and save that to a variable
        var graphDefinition = "";
        results.graph.forEach(function(element) {
          graphDefinition = graphDefinition + element + "\n"; 
        }); 
        parseGraph(graphDefinition);
      }
  });
}

function parseGraph(graphDefinition) {
  $('#graphInfo').empty();
  var element = document.querySelector("#graphInfo");

  var insertSvg = function(svgCode, bindFunctions){
    element.innerHTML = svgCode;
  };
  mermaid.mermaidAPI.render('graphInfo', graphDefinition, insertSvg);
}