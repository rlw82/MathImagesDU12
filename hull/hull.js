$(document).ready(function() {

    stage = null;
    layer = null;

    function getRandomPoints(numPoint, xMax, yMax) {
      var points = new Array();
      var phase = Math.random() * Math.PI * 2;
      for (var i = 0; i < numPoint/2; i++) {
      var r =  Math.random()*xMax/4;
      var theta = Math.random() * 1.5 * Math.PI + phase;
      points.push( [ xMax /4 + r * Math.cos(theta), yMax/2 + 2 * r * Math.sin(theta) ] )
      }
      var phase = Math.random() * Math.PI * 2;
      for (var i = 0; i < numPoint/2; i++) {
        var r =  Math.random()*xMax/4;
        var theta = Math.random() * 1.5 * Math.PI + phase;
        points.push( [ xMax /4 * 3 +  r * Math.cos(theta), yMax/2 +  r * Math.sin(theta) ] )
      }
      return points
    }

    function getDistant(cpt, bl) {
      Vy = bl[1][0] - bl[0][0];
      Vx = bl[0][1] - bl[1][1];
      return (Vx * (cpt[0] - bl[0][0]) + Vy * (cpt[1] -bl[0][1]))
    }

    function findMostDistantPointFromBaseLine(baseLine, points) {
      var maxD = 0;
      var maxPt = new Array();
      var newPoints = new Array();
      for (var idx in points) {
        var pt = points[idx];
        var d = getDistant(pt, baseLine);

        if ( d > 0) {
          newPoints.push(pt);
        } else {
          continue;
        }

        if ( d > maxD ) {
          maxD = d;
          maxPt = pt;
        }

      }
      return {'maxPoint':maxPt, 'newPoints':newPoints}
  }

    var allBaseLines = new Array();
    function buildConvexHull(baseLine, points) {

      allBaseLines.push(baseLine)
        var convexHullBaseLines = new Array();
      var t = findMostDistantPointFromBaseLine(baseLine, points);
      if (t.maxPoint.length) {
        convexHullBaseLines = convexHullBaseLines.concat( buildConvexHull( [baseLine[0],t.maxPoint], t.newPoints) );
        convexHullBaseLines = convexHullBaseLines.concat( buildConvexHull( [t.maxPoint,baseLine[1]], t.newPoints) );
        return convexHullBaseLines;
      } else {
        return [baseLine];
      }
    }


    function getConvexHull(points) {
      var maxX, minX;
      var maxPt, minPt;
      for (var idx in points) {
        var pt = points[idx];
        if (pt[0] > maxX || !maxX) {
          maxPt = pt;
          maxX = pt[0];
        }
        if (pt[0] < minX || !minX) {
          minPt = pt;
          minX = pt[0];
        }
      }
      var ch = [].concat(buildConvexHull([minPt, maxPt], points),
          buildConvexHull([maxPt, minPt], points))
        return ch;
    }


    function plotBaseLine(baseLine,color) {
      var pt1 = baseLine[0];
      var pt2 = baseLine[1];
      lineLayer.add(new Kinetic.Line({
        points: [pt1[0], pt1[1], pt2[0], pt2[1]],
        stroke: color,
        strokeWidth: 2
      }));
    stage.draw();
  }
  
  
  
  var pts;
  
  function qhPlotPoints() {
    pts = getRandomPoints(100,550,550);
    for (var idx in pts) {
      var pt = pts[idx];
      pointsLayer.add( new Kinetic.Circle({
      radius: 3,
      x: pt[0],
      y: pt[1],
      fill: 'black',
    }));
    }
    stage.draw();
  }
  
  function plotHull(){
    running = true;
//    unbindEvents();
    PlotConvexHull();
//    bindEvents();
    running = false;
  }
  
  function PlotConvexHull() {
    background.off('mousedown');
    var ch = getConvexHull(pts);
    var eBL = allBaseLines[0];
    function plotIntermediateBL() {
      var l = allBaseLines.shift();
      if (l) {
        plotBaseLine(l, 'rgb(180,180,180)');
        setTimeout(plotIntermediateBL, 150);
      } else {
        plotBaseLine(eBL,'rgb(0,255,0)');
        for (var idx in ch) {
          var baseLine = ch[idx];
          plotBaseLine(baseLine, 'rgb(255,0,0)');
        }
      }
    }
    plotIntermediateBL();
  }

  function init(){ 
    stage = new Kinetic.Stage({
      container: 'hull',
      height: 600,
      width: 600,
      listening: true
    });
    pointsLayer = new Kinetic.Layer();
    lineLayer = new Kinetic.Layer();  
  
    stage.add(pointsLayer);
    stage.add(lineLayer);
    
    background = new Kinetic.Rect({
      x: 0,
      y: 0,
      height: stage.attrs.height,
      width: stage.attrs.width,
      alpha: 0,
      listening: true
    });
    
    bg = new Kinetic.Layer();
    bg.add(background);
    stage.add(bg);
    bg.moveToTop(); 
    
    bindEvents();  
    drawNewPoints();
  
  }
  
  function clearBoard(){
    pointsLayer.removeChildren();
    pts = [];
    lineLayer.removeChildren();
    stage.draw();
  }
  function drawNewPoints(){
    qhPlotPoints();
    plotHull();
    //qhPlotConvexHull();
  }



  function bindEvents(){

    background.on('mousedown', function(e) {
      if(running == true){
        return;
      }
      console.log("MOUSEDOWN");
      var position = stage.getMousePosition();
      x = position.x
      y = position.y
      pointsLayer.add( new Kinetic.Circle({
        radius: 3,
        x: x,
        y: y,
        fill: 'black',
      }));
      pts.push([x, y]);
      lineLayer.removeChildren();
      lineLayer.draw();
      //qhPlotConvexHull();
      plotHull();
    });


    $('#randPts').click(function(){
      if(running == true){
        return;
      }
      clearBoard();
      drawNewPoints();
    }); 
  
    $('#clearPts').click(function(){
      if(running == true){
        return;
      }
      clearBoard();
    });
  }
  init();
});
