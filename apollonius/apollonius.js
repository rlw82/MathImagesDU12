//Ball moving script taken from http://jsfiddle.net/eGjak/503/
//Edited to be able to resize and took out a few features

//Declarations
$(document).ready(function (){
    var ctx = $('#cv').get(0).getContext('2d');
    var isControl = new Boolean(0);
    var circles = [
      { x: 202, y: 120, r: 101.5332457867 },
      { x: 440, y: 230, r: 85.91274643497 },
      { x: 134, y: 414, r: 51.02920062069 }
    ];

    var solutions = [
      { x: 0, y: 0, r: 0, color: "#00FFFF"},
      { x: 0, y: 0, r: 0, color: "#336666"},
      { x: 0, y: 0, r: 0, color: "#008000"},
      { x: 0, y: 0, r: 0, color: "#FFD700"},
      { x: 0, y: 0, r: 0, color: "#800080"},
      { x: 0, y: 0, r: 0, color: "#4682B4"},
      { x: 0, y: 0, r: 0, color: "#800000"},
      { x: 0, y: 0, r: 0, color: "#CD853F"}
    ];

    var controls = [
      { x: 202, y: 120-circles[0].r, r: 5 },
      { x: 440, y: 230-circles[1].r, r: 5 },
      { x: 134, y: 414-circles[2].r, r: 5 }
    ];

    function drawCircle(data) {
      ctx.beginPath();
      ctx.arc(data.x, data.y, data.r, 0, Math.PI * 2);
      ctx.strokeStyle = 'black';
      ctx.stroke();
    }

    var focused_circle, lastX, lastY ; 


    //functions
    function drawSolution(data) {
      ctx.beginPath();
      if(data.r < 0)
      {
        ctx.arc(data.x,data.y,Math.abs(data.r),Math.PI * 2,0);
      }
      else
      {
        ctx.arc(data.x,data.y,data.r,0,Math.PI * 2);
      }
      ctx.strokeStyle = data.color;
      ctx.stroke();
    }

    function drawcontrols(data) {
      ctx.fillStyle = 'red';
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.arc(data.x, data.y, data.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }


    function drag_circle( e ){
      var newX = e.pageX - $('#cv').offset().left,
          newY = e.pageY - $('#cv').offset().top;
      circles[ focused_circle ].x += newX - lastX;
      circles[ focused_circle ].y += newY - lastY;
      controls[ focused_circle ].x += newX - lastX;
      controls[ focused_circle ].y += newY - lastY;

      lastX = newX, lastY = newY;

      getSolutions();

      ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

      $.each(circles, function() {
          drawCircle(this);
          });

      $.each(controls,function() {
          drawcontrols(this);
          });

      $.each(solutions, function() {
          drawSolution(this);
          });
    }



    //Solutions code gotten from http://rosettacode.org/wiki/Problem_of_Apollonius
    function getSolutions()
    {
      calculateSolutions(1,1,1,0);
      calculateSolutions(-1,1,1,1);
      calculateSolutions(1,-1,1,2);
      calculateSolutions(1,1,-1,3);
      calculateSolutions(-1,-1,1,4);
      calculateSolutions(1,-1,-1,5);
      calculateSolutions(-1,1,-1,6);
      calculateSolutions(-1,-1,-1,7);
    }

    function calculateSolutions(s1,s2,s3,index)
    {
      var x1 = circles[0].x,
          x2 = circles[1].x,
          x3 = circles[2].x,
          y1 = circles[0].y,
          y2 = circles[1].y,
          y3 = circles[2].y,
          r1 = circles[0].r,
          r2 = circles[1].r,
          r3 = circles[2].r;

      var v11 = 2*x2 - 2*x1;
      var v12 = 2*y2 - 2*y1;
      var v13 = x1*x1 - x2*x2 + y1*y1 - y2*y2 - r1*r1 + r2*r2;
      var v14 = 2*s2*r2 - 2*s1*r1;

      var v21 = 2*x3 - 2*x2;
      var v22 = 2*y3 - 2*y2;
      var v23 = x2*x2 - x3*x3 + y2*y2 - y3*y3 - r2*r2 + r3*r3;
      var v24 = 2*s3*r3 - 2*s2*r2;

      var w12 = v12/v11;
      var w13 = v13/v11;
      var w14 = v14/v11;

      var w22 = v22/v21-w12;
      var w23 = v23/v21-w13;
      var w24 = v24/v21-w14;

      var P = -w23/w22;
      var Q = w24/w22;
      var M = -w12*P-w13;
      var N = w14 - w12*Q;

      var a = N*N + Q*Q - 1;
      var b = 2*M*N - 2*N*x1 + 2*P*Q - 2*Q*y1 + 2*s1*r1;
      var c = x1*x1 + M*M - 2*M*x1 + P*P + y1*y1 - 2*P*y1 - r1*r1;

      var D = b*b-4*a*c;
      var rs = (-b-Math.sqrt(D))/(2*a);
      var xs = M + N * rs;
      var ys = P + Q * rs;

      solutions[index].x = xs;
      solutions[index].y = ys;
      solutions[index].r = rs;
    }

    function test_distanceCircle( n, test_circle ){
      if( focused_circle ){
        return false;
      }
      var dx = lastX - test_circle.x,
          dy = lastY - test_circle.y;


      if( dx * dx + dy * dy < test_circle.r * test_circle.r  ){
        focused_circle = n;
        $(document).bind( 'mousemove.move_circle' , drag_circle );
        $(document).bind( 'mouseup.move_circle' , clear_bindings);
        return false;
      }
    }

    function test_distanceControl( n, test_circle ) {
      if( focused_circle ){
        return false;
      }  
      var dx = lastX - test_circle.x,
          dy = lastY - test_circle.y;

      if( dx * dx + dy * dy < test_circle.r * test_circle.r ){
        focused_circle = n;
        isControl = true;
        $(document).bind( ' mousemove.move_circle' , resize_circle );
        $(document).bind( 'mouseup.move_circle' , clear_bindings);
        return false;
      }
    }

    function resize_circle( e ){
      var newX = e.pageX - $('#cv').offset().left,
          newY = e.pageY - $('#cv').offset().top;

      controls[ focused_circle ].x = controls[ focused_circle ].x + (newX - lastX);
      controls[ focused_circle ].y = controls[ focused_circle ].y + (newY - lastY);

      var tempx = controls[ focused_circle ].x - circles[ focused_circle ].x;
      var tempy = controls[ focused_circle ].y - circles[ focused_circle ].y;

      lastX = newX, lastY = newY;
      circles[ focused_circle ].r = Math.sqrt((tempx*tempx) + (tempy*tempy));

      ctx.clearRect( 0, 0, ctx.canvas.width, ctx.canvas.height );

      $.each(circles, function() {
          drawCircle(this);
          });

      $.each(controls,function() {
          drawcontrols(this);
          });

      getSolutions();

      $.each(solutions, function() {
          drawSolution(this);
          });
      isControl = false;
    }

    //events
    $('#cv').mousedown( function( e ){
        lastX = e.pageX - $(this).offset().left;
        lastY = e.pageY - $(this).offset().top;

        $.each( controls, test_distanceControl );
        if(isControl == true){
        return false;
        } else {
        $.each( circles, test_distanceCircle );
        }
        });

    function clear_bindings( e ){ 
      $(document).unbind( 'mousemove.move_circle mouseup.move_circle' );
      focused_circle=undefined;
    }


    //init logic
    getSolutions();

    $.each(solutions, function() {
        drawSolution(this);
        });

    $.each(circles, function() {
        drawCircle(this);
        });

    $.each(controls,function() {
        drawcontrols(this);
        });
});


