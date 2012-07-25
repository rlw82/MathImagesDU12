$(document).ready(function() { 

  river_color = "lightblue";
  island_color = "brown";
  bridge_color = "black";
  islands = [];
  bridges = [];
  stage = null;
  line = null;
  river = null;
  layer = null;
  started = false;  

  init();

  function init(){
    stage = new Kinetic.Stage({
      container: "bridges",
      height: 400,
      width: 600
    });

    layer = new Kinetic.Layer();

    river = new Kinetic.Rect({
      height:stage.attrs.height,
      width:stage.attrs.width,
      fill: river_color,
    });

    layer.add(river);
    add_islands();
    add_bridges();

    stage.add(layer);

    add_events();
  }

  function add_events(){
   
    //draw events
    $('#bridges').on('mousedown', function(){
      console.log("Mouse Down");
      started = true;
      if(line == null || line.atrrs.points.length == 1){
        line = null;
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
      var position = stage.getMousePosition();
      if(started == true && position.x != undefined && position.y != undefined)  {
        var X = position.x;
        var Y = position.y;
        line.attrs.points.push({x:X, y:Y});
        console.log("Mouse Move");
        stage.draw();
      } 
    });

    $('#bridge').on('mouseleave', function(){
      started = false;
    });

    //bridge crossing events
    bridges[0].rect.on('mouseover', function(){ check_bridge(bridges[0]); });
    bridges[1].rect.on('mouseover', function(){ check_bridge(bridges[1]); });
    bridges[2].rect.on('mouseover', function(){ check_bridge(bridges[2]); });
    bridges[3].rect.on('mouseover', function(){ check_bridge(bridges[3]); });
    bridges[4].rect.on('mouseover', function(){ check_bridge(bridges[4]); });
    bridges[5].rect.on('mouseover', function(){ check_bridge(bridges[5]); });
    bridges[6].rect.on('mouseover', function(){ check_bridge(bridges[6]); });
    
    river.on('mouseover', function() {
      if(line != null){
        alert("You can't swim! Start over!");
        reset_game();
      }
    });

  }

  function reset_bridges(){
    for(i = 0; i < bridges.length; i++){
      bridges[i].crossed = false;
      bridges[i].rect.setFill("black");
    }
  }

  function reset_game(){
    reset_bridges();
    layer.remove(line);
    line = null;
    started = false;
  }

  function check_bridge(bridge){
    if(started == true){
      if(bridge.crossed == true){
        alert("This bridge has been crossed. Please start over");
        reset_bridges();
        layer.remove(line);
        line = null;
      } else {
        bridge.crossed = true;
        bridge.rect.setFill('red');
      }
      stage.draw();
    }
  }

  function add_islands(){
    islands[0] = draw_island(126, 390, 0, 0);
    islands[1] = draw_island(126, 390, 0, 143);
    islands[2] = draw_island(126, 390, 0, 286); 
    islands[3] = draw_island(400, 190, 410, 0);
  } 

  function Bridge(rect, crossed){
    this.rect = rect;
    this.crossed  = crossed;
  }

  function add_bridges(){
    bridges[0] = draw_bridge(75, 20, 100, 243);
    bridges[1] = draw_bridge(75, 20, 233, 243);
    bridges[2] = draw_bridge(75, 20, 100, 97);
    bridges[3] = draw_bridge(75, 20, 233, 83);
    bridges[4] = draw_bridge(20, 75, 363, 45);
    bridges[5] = draw_bridge(20, 75, 363, 183);
    bridges[6] = draw_bridge(20, 75, 363, 333);
  }

  function draw_island(h, w, X, Y){
    var temp = new Kinetic.Rect({
      height: h, 
      width: w,
      x: X,
      y: Y,
      fill: island_color
    });
    layer.add(temp);
    return temp;
  }

  function draw_bridge(h, w, X, Y){
    temp =  new Bridge( new Kinetic.Rect({
      height: h,
      width: w,
      x: X,
      y: Y,
      fill: bridge_color
    }), false);
    layer.add(temp.rect);
    return temp;
  }
});
