$(document).ready(function() { 

  river_color = "lightblue";
  island_color = "brown";
  bridge_color = "black";
  layer = null;
  islands = [];
  bridges = [];
  stage = null;
  started = false;  
  line = null;

  init();

  function init(){
    stage = new Kinetic.Stage({
      container: "bridges",
      height: 400,
      width: 600
    });

    layer = new Kinetic.Layer();

    var river = new Kinetic.Rect({
      height:stage.attrs.height,
      width:stage.attrs.width,
      fill: river_color,
    });

    layer.add(river);
    add_islands(layer);
    add_bridges(layer, islands);

    stage.add(layer);

    add_events(layer);

  }

  function add_events(layer){
   
    //draw events
    $('#bridges').on("mousedown", function(){
      console.log("Mouse Down");
      started = true;
      if(line == null || line.atrr.points.length == 1){
        var position = stage.getMousePosition();
        line = new Kinetic.Line({
          points: [position.x, position.y],
          stroke: 10
        });
        layer.add(line);
      }
    });

    $('#bridges').on('mouseup', function(){
      console.log("Mouse Up");
      started = false;
    });

    $('#bridges').on('mousemove', function(){
      if(started == true)  {
        var position = stage.getMousePosition();
        var X = position.x;
        var Y = position.y;
        line.attrs.points.push({x:X, y:Y});
        console.log("Mouse Move");
        stage.draw();
      } 
    });

    //bridge crossing events
    bridges[0].rect.on('mouseover', function(){
      check_bridge(bridges[0]);
    });
    bridges[1].rect.on('mouseover', function(){
      check_bridge(bridges[1]);
    });
    bridges[2].rect.on('mouseover', function(){
      check_bridge(bridges[2]);
    });
    bridges[3].rect.on('mouseover', function(){
      check_bridge(bridges[3]);
    });
    bridges[4].rect.on('mouseover', function(){
      check_bridge(bridges[4]);
    });
    bridges[5].rect.on('mouseover', function(){
      check_bridge(bridges[5]);
    });
    bridges[6].rect.on('mouseover', function(){
      check_bridge(bridges[6]);
    });
  }

  function reset_bridges(){
    for(i = 0; i < bridges.length; i++){
      bridges[i].crossed = false;
      bridges[i].rect.setFill("black");
    }
  }

  function check_bridge(bridge){
    if(started == true){
      if(bridge.crossed == true){
        alert("This bridge has been crossed. Please start over");
        reset_bridges();
        layer.remove(line);
        line = null;
        stage.draw();
      } else {
        bridge.crossed = true;
        bridge.rect.setFill('red');
        stage.draw();
      }
    }
  }

  function add_islands(layer){

    islands[0] = new Kinetic.Rect({
      height: stage.attrs.height/3 - 20,
      width: 2*stage.attrs.width/3 - 10,
      fill: island_color,
    });


    islands[1] = new Kinetic.Rect({
      height: stage.attrs.height/3 - 10,
      width: 2*stage.attrs.width/3 - 10,
      y: stage.attrs.height/3,
      fill: island_color,
    });


    islands[2] = new Kinetic.Rect({
      height: stage.attrs.height/3 -10,
      width: 2*stage.attrs.width/3 - 10,
      y:stage.attrs.height/3*2+10,
      fill: island_color,
    });


    islands[3] = new Kinetic.Rect({
      height: stage.attrs.height,
      width: stage.attrs.width/3 - 10,
      fill: island_color,
      x: stage.attrs.width/3*2 + 10
    });

    layer.add(islands[0]);
    layer.add(islands[1]);
    layer.add(islands[2]);
    layer.add(islands[3]);

  } 

  function Bridge(rect, crossed){
    this.rect = rect;
    this.crossed  = crossed;
  }

  function add_bridges(layer, islands){

    bridges[0] = new Bridge(new Kinetic.Rect({
      height: 75,
      width: 20,
      x: 100,
      y: 233,
      fill: bridge_color
    }), false);
    layer.add(bridges[0].rect);
  

    bridges[1] = new Bridge(new Kinetic.Rect({
      height: 75,
      width: 20,
      x: 233,
      y: 233,
      fill: bridge_color
    }), false);
    layer.add(bridges[1].rect);


    bridges[2] = new Bridge(new Kinetic.Rect({
      height: 75,
      width: 20,
      x: 100,
      y: 83,
      fill: bridge_color
    }), false);
    layer.add(bridges[2].rect);

    bridges[3] = new Bridge(new Kinetic.Rect({
      height:75,
      width: 20,
      x: 233,
      y: 83,
      fill: bridge_color
    }), false);
    layer.add(bridges[3].rect);
    
    bridges[4] = new Bridge(new Kinetic.Rect({
      height:20,
      width: 75,
      x: 363,
      y: 45,
      fill: bridge_color
    }), false);
    layer.add(bridges[4].rect);

    bridges[5] = new Bridge(new Kinetic.Rect({
      height:20,
      width: 75,
      x: 363,
      y: 183,
      fill: bridge_color
    }), false);
    layer.add(bridges[5].rect);
  
    bridges[6] = new Bridge( new Kinetic.Rect({
      height:20,
      width: 75,
      x: 363,
      y: 333,
      fill: bridge_color
    }), false);
    layer.add(bridges[6].rect);
 }

 
  
});
