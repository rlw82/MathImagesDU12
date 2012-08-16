
function bspline(context, points) {
  context.beginPath();
  var ax = (-points[0].x + 3*points[1].x - 3*points[2].x + points[3].x) / 6;
  var ay = (-points[0].y + 3*points[1].y - 3*points[2].y + points[3].y) / 6;
  var bx = (points[0].x - 2*points[1].x + points[2].x) / 2;
  var by = (points[0].y - 2*points[1].y + points[2].y) / 2;
  var cx = (-points[0].x +points[2].x) / 2;
  var cy = (-points[0].y +points[2].y) / 2;
  var dx = (points[0].x + 4*points[1].x + points[2].x) / 6;
  var dy = (points[0].y + 4*points[1].y + points[2].y) / 6;

  interval = 0.05

  for (var t = -1; t < 2.0; t += interval) {
    context.moveTo(
        ax*Math.pow(t, 3) + bx*Math.pow(t, 2) + cx*t + dx,
        ay*Math.pow(t, 3) + by*Math.pow(t, 2) + cy*t + dy
        );
    context.lineTo(
        ax*Math.pow(t+interval, 3) + bx*Math.pow(t+interval, 2) + cx*(t+interval) + dx,
        ay*Math.pow(t+interval, 3) + by*Math.pow(t+interval, 2) + cy*(t+interval) + dy
        );
  }
  context.stroke();
}

function catmullrom(context, points) { 
  context.beginPath();
  //  [ -1  3 -3  1 ] 
  //  [  2 -5  4 -1 ] 
  //  [ -1  0  1  0 ] 
  //  [  0  2  0  0 ]   
  

//   var ax = ( (0 * points[0].x) + (2 * points[1].x) + (0 * points[2].x) + (0 * points[3].x) );
//   var ay = ( (0 * points[0].y) + (2 * points[1].y) + (0 * points[2].y) + (0 * points[3].y) );
// 
//   var bx = ( (-1 * points[0].x) + (0 * points[1].x) + (1 * points[2].x) + (0 * points[3].x) );
//   var by = ( (-1 * points[0].y) + (0 * points[1].y) + (1 * points[2].y) + (0 * points[3].y) );
// 
//   var cx = ( (2 * points[0].x) + (-5 * points[1].x) + (4 * points[2].x) + (-1 * points[3].x) );
//   var cy = ( (2 * points[0].y) + (-5 * points[1].y) + (4 * points[2].y) + (-1 * points[3].y) );
// 
//   var dy = ( (-1 * points[0].y) + (3 * points[1].y) + (-3 * points[2].y) + (-1 * points[3].y) );
//   var dx = ( (-1 * points[0].x) + (3 * points[1].x) + (-3 * points[2].x) + (-1 * points[3].x) );
//
  interval = 0.05

  var ax = (-points[0].x + (3 * points[1].x) + (-3*points[2].x) + points[3].x);
  var ay = (-points[0].y + (3 * points[1].y) - 3*points[2].y + points[3].y);

  var bx = (2*points[0].x + (-5 * points[1].x) + (4 * points[2].x) + (-1 * points[3].x));
  var by = (2*points[0].y + (-5 * points[1].y) + (4 * points[2].y) + (-1 *  points[3].y));

  var cx = (-points[0].x + points[2].x );
  var cy = (-points[0].y + points[2].y );

  var dx = (2*points[1].x);
  var dy = (2*points[1].y);

  for (var t = -1; t < 2.0; t += interval) {
    context.moveTo(
        (ax*Math.pow(t, 3) + bx*Math.pow(t, 2) + cx*t + dx) * 0.5,
        (ay*Math.pow(t, 3) + by*Math.pow(t, 2) + cy*t + dy) * 0.5 );
    context.lineTo(
        (ax*Math.pow(t+interval, 3) + bx*Math.pow(t+interval, 2) + cx*(t+interval) + dx) * 0.5,
        (ay*Math.pow(t+interval, 3) + by*Math.pow(t+interval, 2) + cy*(t+interval) + dy) * 0.5);
  }
  context.stroke();
}

function updateDottedLines(layer) {

  var dashedLine = layer.get('#dashedLine')[0];

  var bs = layer.bspline;

  dashedLine.setPoints([
      control1.attrs.x, control1.attrs.y, 
      bs.control1.attrs.x, bs.control1.attrs.y, 
      bs.control2.attrs.x, bs.control2.attrs.y, 
      control4.attrs.x, control4.attrs.y
      ]);
}

function buildAnchor(layer, x, y, stroke, fill) {

  var anchor = new Kinetic.Circle({
    x: x,
    y: y,
    radius: 8,
    stroke: stroke,
    fill: fill,
    strokeWidth: 2,
    draggable: true
  });

  // add hover styling
  anchor.on("mouseover", function() {
    document.body.style.cursor = "pointer";
    this.setStrokeWidth(4);
    layer.draw();
  });

  anchor.on("mouseout", function() {
    document.body.style.cursor = "default";
    this.setStrokeWidth(2);
    layer.draw();
  });

  layer.add(anchor);
  return anchor;

}

function drawCurves() {

  var context = this.getContext();
  var layer = this.getLayer();

  var bs = layer.bspline;
  var catmullrom = layer.catmullrom;
  var bezier = layer.bezier;

  // draw bezier
  context.beginPath();
  context.moveTo(bezier.start.attrs.x, bezier.start.attrs.y);
  context.bezierCurveTo(bezier.control1.attrs.x, bezier.control1.attrs.y, bezier.control2.attrs.x, bezier.control2.attrs.y, bezier.end.attrs.x, bezier.end.attrs.y);
  context.strokeStyle = "blue";
  context.lineWidth = 4;
  context.stroke();
}

function createKeyText(text, x, y ){
  return new Kinetic.Text({
    x: x,
    y: y,
    text: text,
    fontSize: 12,
    fontFamily: "Arial",
    fontStyle: "bold",
    textFill: "black",
  });
}

function createKeyBg(x, y, w, h, color){
  return new Kinetic.Rect({
    x: x,
    y: y,
    width: w,
    height: h,
    stroke: color,
    fill: color,
    strokeWidth: 10,
  });
}

function createLine(color, id){
  return  new Kinetic.Line({
    dashArray: [10, 10, 0, 10],
      strokeWidth: 3,
      stroke: color,
      lineCap: "round",
      id: id,
      alpha: 0.3
  });
}

window.onload = function() {

  keys = 0;

  var stage = new Kinetic.Stage({
    container: "container",
    width: 600,
    height: 600
  });

  var layer = new Kinetic.Layer({
    drawFunc: drawCurves
  });

  var key = new Kinetic.Layer();
  var titleKey = createKeyText("Curve Key: ", 10, 365);

  var bsplineKeyBg = createKeyBg(160, 400, 65, 12, "green");
  var bsplineKey = createKeyText("B-Spline", 10, 400); 
  key.add(bsplineKeyBg);
  key.add(bsplineKey);
  keys = keys + 1;

  var catmullromKeyBg = createKeyBg(160, 440, 65, 12, "red");
  var catmullromKey = createKeyText("Catmull-rom Spline", 10, 440); 
  key.add(catmullromKeyBg);
  key.add(catmullromKey);
  keys = keys + 1;

  var bezierKeyBg= createKeyBg(160, 420, 65, 12, "blue");
  var bezierKey = createKeyText("Bezier", 10, 420);
  key.add(bezierKeyBg);
  key.add(bezierKey);
  keys = keys + 1; 
  
  var keyBox = new Kinetic.Rect({ 
    x: 5,
    y: 388,
    width: 230,
    height: 15 + ( keys * 20),
    stroke: "black",
    strokeWidth: 2,
  });

  var dashedLine = createLine("grey", "dashedLine");

  var bsplineLine = new Kinetic.Shape({
    drawFunc: function() {
                var context = this.getContext();
                bspline(context, [{x:control1.attrs.x, y:control1.attrs.y},
                                  {x:layer.bspline.control1.attrs.x, y:layer.bspline.control1.attrs.y},
                                  {x:layer.bspline.control2.attrs.x, y:layer.bspline.control2.attrs.y}, 
                                  {x:control4.attrs.x, y:control4.attrs.y}]);
                this.stroke();
                this.fill();
              },
      stroke: "green",
      fill: "red",
      strokeWidth: 3
  });

  var catmullromLine = new Kinetic.Shape({
    drawFunc: function() {
                var context = this.getContext();
                catmullrom(context, [{x:control1.attrs.x, y:control1.attrs.y},
                                     {x:layer.catmullromline.control1.attrs.x, y:layer.catmullromline.control1.attrs.y},
                                     {x:layer.catmullromline.control2.attrs.x, y:layer.catmullromline.control2.attrs.y}, 
                                     {x:control4.attrs.x, y:control4.attrs.y}]);
                this.stroke();
                this.fill();
              },
      stroke: "red",
      fill: "red",
      strokeWidth: 3
  });

  key.add(titleKey);
  key.add(keyBox);

  layer.add(bsplineLine);
  layer.add(catmullromLine);
  layer.add(dashedLine);

  control1 = buildAnchor(layer, 75,  200, "#666", "darkgrey");
  control2 = buildAnchor(layer, 150, 75, "#666", "darkgrey"),
  control3 = buildAnchor(layer, 375, 300, "#666", "darkgrey"),
  control4 = buildAnchor(layer, 450, 200, "#666", "darkgrey");

  layer.beforeDraw(function() {
    updateDottedLines(layer);
  });

  layer.bspline = {
    start:control1,
    control1: control2,
    control2: control3,
    end: control4,
  };

  layer.catmullromline = {
    start:control1,
    control1: control2,
    control2: control3,
    end: control4,
  };

  layer.bezier = {
    start: control1,
    control1: control2,
    control2: control3,
    end: control4,
  };

  stage.on("mouseout", function() {
    layer.draw();
  });

  stage.add(layer);
  stage.add(key);
};
