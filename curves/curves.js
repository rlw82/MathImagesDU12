bsplineArray = [{x:10, y:10}, {x:110, y:220}, {x:270, y:220}, {x:370, y:10}];

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
  for (var t = -1; t < 2.0; t += 0.05) {
    context.moveTo(
        ax*Math.pow(t, 3) + bx*Math.pow(t, 2) + cx*t + dx,
        ay*Math.pow(t, 3) + by*Math.pow(t, 2) + cy*t + dy
        );
    context.lineTo(
        ax*Math.pow(t+0.1, 3) + bx*Math.pow(t+0.1, 2) + cx*(t+0.1) + dx,
        ay*Math.pow(t+0.1, 3) + by*Math.pow(t+0.1, 2) + cy*(t+0.1) + dy
        );
  }
  context.stroke();
}

function updateDottedLines(layer) {

  var b = layer.bezier;
  var bs = layer.bspline;

  var dashedLine = layer.get('#dashedLine')[0];

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

  var quad = layer.quad;
  var bs = layer.bspline;
  var bezier = layer.bezier;

  bsplineArray = [
        {x:control1.attrs.x, y:control1.attrs.y},
        {x:bs.control1.attrs.x, y:bs.control1.attrs.y},
        {x:bs.control2.attrs.x, y:bs.control2.attrs.y}, 
        {x:control4.attrs.x, y:control4.attrs.y}
  ];

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

  var stage = new Kinetic.Stage({
    container: "container",
    width: 600,
    height: 600
  });

  var layer = new Kinetic.Layer({
    drawFunc: drawCurves
  });

  var key = new Kinetic.Layer();

  var keyBox = new Kinetic.Rect({ 
    x: 5,
    y: 388,
    width: 230,
    height: 55,
    stroke: "black",
    strokeWidth: 2,
  });
  
  var titleKey = createKeyText("Key: ", 10, 365);

  var bsplineKeyBg = createKeyBg(150, 400, 75, 12, "green");
  var bsplineKey = createKeyText("B-Spline Curve", 10, 400); 

  var bezierKeyBg= createKeyBg(150, 420, 75, 12, "red");
  var bezierKey = createKeyText("Bezier Curve", 10, 420);

  var dashedLine = createLine("grey", "dashedLine");

  var bsplineLine = new Kinetic.Shape({
    drawFunc: function() {
                var context = this.getContext();
                bspline(context, bsplineArray);
                this.stroke();
                this.fill();
              },
      stroke: "green",
      fill: "red",
      strokeWidth: 3
  });

  key.add(titleKey);
  key.add(keyBox);
  key.add(bezierKeyBg);
  key.add(bsplineKeyBg);

  key.add(bezierKey);
  key.add(bsplineKey);

  layer.add(bsplineLine);
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
