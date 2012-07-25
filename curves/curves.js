function updateDottedLines(layer) {

  var q = layer.quad;
  var b = layer.bezier;

  var quadLine = layer.get('#quadLine')[0];
  var bezierLine = layer.get('#bezierLine')[0];

  quadLine.setPoints([
      q.start.attrs.x, q.start.attrs.y, 
      q.control.attrs.x, q.control.attrs.y, 
      q.end.attrs.x, q.end.attrs.y
      ]);



  bezierLine.setPoints([
      b.start.attrs.x, b.start.attrs.y, 
      b.control1.attrs.x, b.control1.attrs.y, 
      b.control2.attrs.x, b.control2.attrs.y, 
      b.end.attrs.x, b.end.attrs.y
      ]);

}

function buildAnchor(layer, x, y) {

  var anchor = new Kinetic.Circle({
    x: x,
      y: y,
      radius: 8,
      stroke: "#666",
      fill: "#ddd",
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
  var bezier = layer.bezier;

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
      width: 578,
      height: 200
  });

  var layer = new Kinetic.Layer({
    drawFunc: drawCurves
  });

  var quadLine = new Kinetic.Line({
    dashArray: [10, 10, 0, 10],
      strokeWidth: 3,
      stroke: "black",
      lineCap: "round",
      id: "quadLine",
      alpha: 0.3
  });

  var bezierLine = new Kinetic.Line({

    dashArray: [10, 10, 0, 10],
      strokeWidth: 3,
      stroke: "black",
      lineCap: "round",
      id: "bezierLine",
      alpha: 0.3
  });



  // add dotted line connectors

  layer.add(quadLine);
  layer.add(bezierLine);

  /*

   * update the dotted line points before

   * drawing the layer
   */

  layer.beforeDraw(function() {
    updateDottedLines(layer);
  });

  /*

   * add custom property curve objects to layer so that

   * they can be modified by reference

*/

  layer.quad = {
    start: buildAnchor(layer, 60, 30),
    control: buildAnchor(layer, 240, 110),
    end: buildAnchor(layer, 80, 160)
  };



  layer.bezier = {
    start: buildAnchor(layer, 280, 20),
    control1: buildAnchor(layer, 530, 40),
    control2: buildAnchor(layer, 480, 150),
    end: buildAnchor(layer, 300, 150)
  };

  stage.on("mouseout", function() {
    layer.draw();
  });

  stage.add(layer);
};
