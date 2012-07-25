bsplineArray = Array({x:10, y:10}, {x:110, y:220}, {x:270, y:220}, {x:370, y:10} );

function bspline(context, points) {
  context.beginPath();
  for (var t = 0; t < 1; t += 0.05) {
    var ax = (-points[0].x + 3*points[1].x - 3*points[2].x + points[3].x) / 6;
    var ay = (-points[0].y + 3*points[1].y - 3*points[2].y + points[3].y) / 6;
    var bx = (points[0].x - 2*points[1].x + points[2].x) / 2;
    var by = (points[0].y - 2*points[1].y + points[2].y) / 2;
    var cx = (-points[0].x +points[2].x) / 2;
    var cy = (-points[0].y +points[2].y) / 2;
    var dx = (points[0].x + 4*points[1].x + points[2].x) / 6;
    var dy = (points[0].y + 4*points[1].y + points[2].y) / 6;
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

  var q = layer.quad;
  var b = layer.bezier;
  var bs = layer.bspline;

  var quadLine = layer.get('#quadLine')[0];
  var bezierLine = layer.get('#bezierLine')[0];
  var bsDashLine = layer.get('#bsDashLine')[0];

  quadLine.setPoints([
      q.start.attrs.x, q.start.attrs.y, 
      q.control.attrs.x, q.control.attrs.y, 
      q.end.attrs.x, q.end.attrs.y
      ]);

  bsDashLine.setPoints([
      anchor1.attrs.x, anchor1.attrs.y, 
      bs.control1.attrs.x, bs.control1.attrs.y, 
      bs.control2.attrs.x, bs.control2.attrs.y, 
      anchor2.attrs.x, anchor2.attrs.y
      ]);

  bezierLine.setPoints([
      b.start.attrs.x, b.start.attrs.y, 
      b.control1.attrs.x, b.control1.attrs.y, 
      b.control2.attrs.x, b.control2.attrs.y, 
      b.end.attrs.x, b.end.attrs.y
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

  bsplineArray =
    Array({x:anchor1.attrs.x, y:anchor1.attrs.y},
        {x:bs.control1.attrs.x, y:bs.control1.attrs.y},
        {x:bs.control2.attrs.x, y:bs.control2.attrs.y}, 
        {x:anchor2.attrs.x, y:anchor2.attrs.y});

  // draw quad
  context.beginPath();
  context.moveTo(quad.start.attrs.x, quad.start.attrs.y);
  context.quadraticCurveTo(quad.control.attrs.x, quad.control.attrs.y, quad.end.attrs.x, quad.end.attrs.y);
  context.strokeStyle = "red";
  context.lineWidth = 4;
  context.stroke();

  // draw bezier
  context.beginPath();
  context.moveTo(bezier.start.attrs.x, bezier.start.attrs.y);
  context.bezierCurveTo(bezier.control1.attrs.x, bezier.control1.attrs.y, bezier.control2.attrs.x, bezier.control2.attrs.y, bezier.end.attrs.x, bezier.end.attrs.y);
  context.strokeStyle = "blue";
  context.lineWidth = 4;
  context.stroke();

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
    height: 75,
    stroke: "black",
    strokeWidth: 2,
    });

  var bsplineKeyBg = new Kinetic.Rect({
    x: 150,
    y: 400,
    width: 75,
    height: 12,
    stroke: "green",
    fill: "green",
    strokeWidth: 10,
  });

  var bezierKeyBg = new Kinetic.Rect({
    x: 150,
    y: 420,
    width: 75,
    height: 12,
    stroke: "blue",
    fill: "blue",
    strokeWidth: 10,
  });

  var quadKeyBg = new Kinetic.Rect({
    x: 150,
    y: 440,
    width: 75,
    height: 12,
    stroke: "red",
    fill: "red",
    strokeWidth: 10,
  });

  var bezierKey = new Kinetic.Text({
    x: 10,
    y: 440,
    stroke: "white",
    fill: "white",
    text: "Bezier Curve",
    fontSize: 12,
    fontFamily: "Arial",
    fontStyle: "bold",
    textFill: "black",
    });

  var titleKey = new Kinetic.Text({
    x: 10,
    y: 365,
    stroke: "white",
    fill: "white",
    text: "Key:",
    fontSize: 14,
    fontFamily: "Arial",
    fontStyle: "bold",
    textFill: "black",
    });

  var bsplineKey = new Kinetic.Text({
    x: 10,
    y: 420,
    stroke: "white",
    fill: "white",
    text: "B-Spline Curve",
    fontSize: 12,
    fontFamily: "Arial",
    fontStyle: "bold",
    textFill: "black",
    });

  var quadKey = new Kinetic.Text({
    x: 10,
    y: 400,
    stroke: "white",
    fill: "white",
    text: "Quadratic Curve",
    fontSize: 12,
    fontFamily: "Arial",
    fontStyle: "bold",
    textFill: "black",
    });

  var quadLine = new Kinetic.Line({
    dashArray: [10, 10, 0, 10],
      strokeWidth: 3,
      stroke: "red",
      lineCap: "round",
      id: "quadLine",
      alpha: 0.3
  });

  var bezierLine = new Kinetic.Line({

    dashArray: [10, 10, 0, 10],
      strokeWidth: 3,
      stroke: "blue",
      lineCap: "round",
      id: "bezierLine",
      alpha: 0.3
  });

  var bsDashLine = new Kinetic.Line({

    dashArray: [10, 10, 0, 10],
      strokeWidth: 3,
      stroke: "green",
      lineCap: "round",
      id: "bsDashLine",
      alpha: 0.3
  });


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
  key.add(quadKeyBg);
  key.add(bezierKeyBg);
  key.add(bsplineKeyBg);

  key.add(quadKey);
  key.add(bezierKey);
  key.add(bsplineKey);
 
  layer.add(bsplineLine);
  layer.add(bsDashLine);
  layer.add(quadLine);
  layer.add(bezierLine);

  anchor1 = buildAnchor(layer, 50, 300, "#666", "darkgrey");
  anchor2 = buildAnchor(layer, 450, 300, "#666", "darkgrey");

  layer.beforeDraw(function() {
    updateDottedLines(layer);
  });

  layer.quad = {
    start: anchor1,
    control: buildAnchor(layer, 250, 90, "darkred", "crimson"),
    end: anchor2,
  };

  layer.bspline = {
    start:anchor1,
    control1: buildAnchor(layer, 90, 60, "darkgreen", "forestgreen"),
    control2: buildAnchor(layer, 420, 60, "darkgreen", "forestgreen"),
    end: anchor2,
  };

  layer.bezier = {
    start: anchor1,
    control1: buildAnchor(layer, 50, 40, "darkblue", "dodgerblue"),
    control2: buildAnchor(layer, 450, 40, "darkblue", "dodgerblue"),
    end: anchor2,
  };

  stage.on("mouseout", function() {
    layer.draw();
  });

  stage.add(layer);
  stage.add(key);
};
