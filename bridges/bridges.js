$(document).ready(function() { 

  //options
  river_color = "blue";
  island_color = "brown";
  bridge_color = "black";

  //globals
  bridge_width = 50;
  islands = [];
  island_layer = null;
  bridge_layer = null;
  bridges = [];
  stage = null;
  line = null;
  river = null;
  river_layer = null;
  layer = null;
  started = false;  
  grass = null;

  init();

  function init(){
    stage = new Kinetic.Stage({
      container: "bridges",
      height: 400,
      width: 600
    });

    river_layer = new Kinetic.Layer();
    bridge_layer = new Kinetic.Layer();
    island_layer = new Kinetic.Layer();

    river = new Kinetic.Rect({
      height:stage.attrs.height,
      width:stage.attrs.width,
      fill: {
        start: {
          x: 0,
          y: 0,
        },
        end: {
          x: 600,
          y: 400  
        },
        colorStops: [0, '#0080AA', 1, 'blue']
      }
    });

    river_layer.add(river);
    grass = new Image();

    grass.onload = function(){
      add_islands();
      add_bridges();
      stage.add(river_layer);
      stage.add(island_layer);
      stage.add(bridge_layer);

      add_events();
    }
    grass.src = "grass.jpeg";
  }

  function add_events(){
   
    //draw events
    $('#bridges').on('mousedown', function(){
      started = true;
      if(null == line){
        line = null;
        var position = stage.getMousePosition();
        line = new Kinetic.Line({
          points: [position.x, position.y],
          strokeWidth: 5,
        });
        bridge_layer.add(line);
      }
    });

    $('#bridges').on('mouseup', function(){
      reset_game();
      started = false;
    });

    $('#bridges').on('mousemove', function(){
      var position = stage.getMousePosition();
      if(undefined == position){
        started = false;
        return;
      }
//      console.log(position.x + " , " + position.y); 
      if(started == true)  {
        var X = position.x;
        var Y = position.y;
        line.attrs.points.push({x:X, y:Y});
        stage.draw();
      } 
    });

    $('#bridges').on('mouseleave', function(){
      reset_game();
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
      if(null != line && true == started){
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
    bridge_layer.remove(line);
    line = null;
    started = false;
  }

  function check_bridge(bridge){
    if(true == started){
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
    bridges[0] = draw_bridge(75, bridge_width, 100, 243);
    bridges[1] = draw_bridge(75, bridge_width, 233, 243);
    bridges[2] = draw_bridge(75, bridge_width, 100, 97);
    bridges[3] = draw_bridge(75, bridge_width, 233, 83);
    bridges[4] = draw_bridge(bridge_width, 75, 363, 45);
    bridges[5] = draw_bridge(bridge_width, 75, 363, 183);
    bridges[6] = draw_bridge(bridge_width, 75, 363, 333);
  }

  function draw_island(h, w, X, Y){
    var temp = new Kinetic.Rect({
      height: h, 
      width: w,
      x: X,
      y: Y,
      fill: {
        image: grass,
        offset: [-50, 100]
      }
    });
    island_layer.add(temp);
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
    bridge_layer.add(temp.rect);
    return temp;
  }
});
