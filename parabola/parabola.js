$(document).ready(function() {

  var size = Math.PI*100

  var board = JXG.JSXGraph.initBoard('parabola', {boundingbox: [-size, size, size, -size], axis:true, showCopyright:false});

  //create the parabola
  var focus = board.create('point', [0, size/2], {name:'focus'});


  //turn the point into a glider along the y axis
  var y_axis = board.create('line', [[0, size], [0, -size]], {visible:false});
  focus.makeGlider(y_axis);

  var parab = board.create('functiongraph', function(x) {
    return Math.pow(x, 2)/(4*focus.Y());
  });


  var p = board.create('point', [100, (100*100)/4*focus.Y()]);
  p.makeGlider(parab);

  //create a second point to create a vertical line
 var ray_point = board.create('point', [function(){ return p.X(); }, function() {
   var a = 1000;
    //make sure the points stay aligned to each other as p moves
    if(p.Y() < 0){
      a = -a;
    }
    return p.Y() + 2 * a; 
  }]);

  var incoming_ray = board.create('arrow', [p, ray_point], {strokecolor:'red', name:'Incoming Beam', withLabel:true});

  var reflected = board.create('segment', [focus, p], {strokecolor:'green', name:'Reflected Beam'});

  var tangent = board.create('normal', [parab, p]);


});

