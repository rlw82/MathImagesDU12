$(document).ready(function() { 

  river_color = "lightblue";
  island_color = "brown";
  bridge_color = "black";
  islands = [];
  bridges = [];
  player = null;

  var stage = new Kinetic.Stage({
    container: "bridges",
    height: 400,
    width: 600
  });

  var background = new Kinetic.Layer();

  var river = new Kinetic.Rect({
    height:stage.attrs.height,
    width:stage.attrs.width,
    fill: river_color,
  });

  background.add(river);
  add_islands(background);
  add_bridges(background, islands);

  player = islands[2];

  stage.add(background);

  for(i = 0; i < 7; i++){
    bridges[i].rect.on('click', function(){
      if(bridges[i].crossed){
        Console.log("This bridge has been crossed!");
      }
      this.setFill("red");
      bridges[i].crossed = true;
      background.draw();
    });
  };

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

  function Bridge(end_point1, end_point2, rect, crossed){
    this.rect = rect;
    this.end_point1 = end_point1;
    this.end_point2 = end_point2;
    this.crossed  = crossed;
  }

  function add_bridges(layer, islands){
    bridges[0] = new Bridge(islands[1], islands[2], new Kinetic.Rect({
      height: 75,
      width: 20,
      x: 100,
      y: 233,
      fill: bridge_color
    }), false);
    layer.add(bridges[0].rect);
  

  bridges[1] = new Bridge(islands[1], islands[2], new Kinetic.Rect({
    height: 75,
    width: 20,
    x: 233,
    y: 233,
    fill: bridge_color
  }), false);
  layer.add(bridges[1].rect);


  bridges[2] = new Bridge(islands[0], islands[1], new Kinetic.Rect({
    height: 75,
    width: 20,
    x: 100,
    y: 83,
    fill: bridge_color
  }), false);
  layer.add(bridges[2].rect);

  bridges[3] = new Bridge(islands[0], islands[1], new Kinetic.Rect({
    height:75,
    width: 20,
    x: 233,
    y: 83,
    fill: bridge_color
  }), false);
  layer.add(bridges[3].rect);
    
  bridges[4] = new Bridge(islands[0], islands[3], new Kinetic.Rect({
    height:20,
    width: 75,
    x: 363,
    y: 45,
    fill: bridge_color
  }), false);
  layer.add(bridges[4].rect);

  bridges[5] = new Bridge(islands[1], islands[3], new Kinetic.Rect({
    height:20,
    width: 75,
    x: 363,
    y: 183,
    fill: bridge_color
  }), false);
  layer.add(bridges[5].rect);
  
  bridges[6] = new Bridge(islands[2], islands[3], new Kinetic.Rect({
    height:20,
    width: 75,
    x: 363,
    y: 333,
    fill: bridge_color
  }), false);
  layer.add(bridges[6].rect);
 }

  
});
