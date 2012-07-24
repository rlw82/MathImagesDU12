$(document).ready(function() {
  var board = JXG.JSXGraph.initBoard('exponential', {boundingbox: [-.5, 10000, 5, -1000], axis: true, showCopyright:false, showNavigation:false});      

  principal = board.create('slider', [[1, 1050], [2, 1050], [100, 1000, 3000]], {name:'Principal value', snapWidth: 0.5});
  interest = board.create('slider', [[1, 600], [2, 600], [0.05, 0.5, 1]], {name:'Interest Rate'});
  interval = board.create('slider', [[1, 250], [2, 250], [1, 1, 25]], {name:"Number of times interest is compounded each year",  snapWidth: 0.5});

  cont = board.create('functiongraph', [function(x) {
    return principal.Value() * Math.pow(Math.E, interest.Value() * x);
  }, 0 ], {strokeColor: 'green'});

  curve = board.create('functiongraph', [function(x) {
    return  principal.Value() * Math.pow(1 + (interest.Value()/interval.Value()), interval.Value() * x);
  }, 0 ]);

  curveGlide = board.create('glider', [3, 1000, curve], {withLabel:true, showInfobox:true, name:"Compounded x Times"});
  contGlide = board.create('glider', [3, 1000, cont], {withLabel:true, showInfobox:true, name:"Compunded Continuously"});

  var xAxisText = board.create('text',[1, -600, "Years"]);
  curveGlide.on('drag', function() {
    countGlide.moveTo([curveGlide.X(), Math.pow(Math.E, interest.value() * curveGlide.X())]);

  });

});
