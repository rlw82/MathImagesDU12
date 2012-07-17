$(document).ready(function() {

  var size = Math.PI*100

  var board = JXG.JSXGraph.initBoard('parabola', {boundingbox: [-size, size, size, -size], axis:true, showCopyright:false});

  //create the parabola
  var focal_point = board.create('point', [0, size/2], {name:'focus'});


  //turn the point into a glider along the y axis
  var y_axis = board.create('line', [[0, size], [0, -size]], {visible:false});
  focal_point.makeGlider(y_axis);

  var parab = board.create('functiongraph', function(x) {
    return (x*x)/(4*focal_point.Y());
  });


  var p = board.create('point', [100, (100*100)/4*focal_point.Y()]);
  p.makeGlider(parab);

  //create a second point to create a vertical line
  var ray_point = board.create('point', [function(){ return p.X(); }, function() {
    var a = 1000;
    if(p.Y() < 0){
      a = -a;
    }
    return p.Y() + 2 * a; 
  }]);


  var incoming_ray = board.create('arrow', [p, ray_point], {strokecolor:'red', name:'Incoming Beam', withLabel:true});

  var reflected = board.create('segment', [focal_point, p], {strokecolor:'green', name:'Reflected Beam'});

});

