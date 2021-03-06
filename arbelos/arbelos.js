var padding = 50;
var rightPadding = 0;

var y = 0;

var right_x, right_r, left_x, left_r = 0;
var right_tangent_x, right_tangent_y, left_tangent_x, left_tangent_y = 0;
var tangent_line_y1, tangent_line_x1, tangent_line_y2, tangent_line_x2 = 0;

var R = 0;
var D = 0;

var right_int_angle = 0;
var left_int_angle = 0;

var slope;
var intercept;

function calculate() { 

  D = left_x - right_x;
  R = left_r - right_r;

  right_int_angle =  Math.acos(R/D);
  left_int_angle =  Math.PI - right_int_angle;

  left_tangent_x = left_x + left_r * Math.cos(-left_int_angle);
  left_tangent_y = y + left_r * Math.sin(-left_int_angle);

  right_tangent_x = right_x + right_r * Math.cos(Math.PI + right_int_angle);
  right_tangent_y = y + right_r * Math.sin(Math.PI + right_int_angle);

  slope = (right_tangent_y - left_tangent_y) / (right_tangent_x - left_tangent_x);

  intercept = right_tangent_y - (slope * right_tangent_x);
  
  if(slope === 0) {
    tangent_line_x1 = 0;
    tangent_line_x2 = 5000;

    tangent_line_y1 = y - left_r;
    tangent_line_y2 = y - right_r;
  }
  else {
  tangent_line_y2 = intercept;
  tangent_line_x2 = (tangent_line_y2 - intercept) / slope;

  tangent_line_y1 = (slope * 600) + intercept;
  tangent_line_x1 = (tangent_line_y1 - intercept) / slope;
  }
}

function drawArbelos(leftArc, rightArc, xpos, arcLayer) {

				left_x = ((xpos - padding) / 2) + padding;
				left_r = (xpos - padding) / 2 ;
				right_r = (rightPadding - xpos) / 2 ;
				right_x = xpos + right_r;
				arcLayer.draw();

}

window.onload = function() {
				var stage = new Kinetic.Stage({
        container: "container",
        width: 600,
        height: 600
});

width = stage.getWidth();
y = 300;	
rightPadding = (stage.getWidth() - padding);

var backLayer = new Kinetic.Layer();
var arcLayer = new Kinetic.Layer();
var dragLayer = new Kinetic.Layer();

var largeArc = new Kinetic.Shape({
	drawFunc: function() {
		var context = this.getContext();
		context.beginPath();
		context.arc(300, y, (stage.getWidth() - (2 * padding)) / 2, Math.PI, 2 * Math.PI, false);
		this.fill();
		this.stroke();
		},
	fill: "#00D2FF",
	stroke: "black",
	strokeWidth: 3
});


var dragCircle = new Kinetic.Circle({
	x: 350,
	y: 300,
	radius:7,
	fill: "#00FF00",
	strokeWidth: 2,
	draggable: true,
	padding: 0,
	draggable: true,
	dragBounds: {
		top: 300,
		right:rightPadding,
		bottom: 300,
		left: padding
	}
}); 	

left_x = ((dragCircle.attrs.x - padding) / 2) + padding;
left_r = (dragCircle.attrs.x - padding) / 2;
right_r = (rightPadding - dragCircle.attrs.x) / 2 ;
right_x = dragCircle.attrs.x + right_r;


var leftArc = new Kinetic.Shape({
	drawFunc: function() {
		var context = this.getContext(); 
		context.beginPath();
		context.arc(left_x, y, left_r, Math.PI, 2 * Math.PI, false);
		this.fill();
		this.stroke();
		},	
	fill: "white",
	stroke: "black",
	strokeWidth: 3
});

var twinCircle = new Kinetic.Shape({
  drawFunc: function() {
    var context = this.getContext();
    context.beginPath();

    r = ((left_r * right_r) / (left_r + right_r));
    left_twin_ypos = Math.sqrt(Math.pow(left_r + r, 2) - Math.pow (Math.abs(left_r - r),2));
    right_twin_ypos = Math.sqrt(Math.pow(right_r + r, 2) - Math.pow (Math.abs(right_r - r),2));

    /* draw the right twin circle first */
    context.beginPath();
    context.arc(dragCircle.attrs.x + r, y -  right_twin_ypos, r, 0, 2 * Math.PI, false);
    this.fill();
    this.stroke();

    /* draw the left twin circle next  */
    context.beginPath();
    context.arc(dragCircle.attrs.x - r, y -  left_twin_ypos, r, 0, 2 * Math.PI, false);
    this.fill();
    this.stroke();

  },
  fill: "lime",
  stroke: "black",
  strokeWidth: 3
});

var verticalTangentLine = new Kinetic.Shape({
  drawFunc: function() {
    var context = this.getContext();
    context.beginPath();  
    context.moveTo(dragCircle.attrs.x, y);
    context.lineTo(dragCircle.attrs.x, y - Math.sqrt(Math.pow(300 - padding, 2) - Math.pow(300 - dragCircle.attrs.x, 2)));
    this.stroke();
    },
    stroke: "blue",
    strokeWidth: 3
});

var tangentLine = new Kinetic.Shape({
  drawFunc: function() {
    var context = this.getContext();
    context.beginPath();
    context.moveTo(tangent_line_x1, tangent_line_y1);
    context.lineTo(tangent_line_x2, tangent_line_y2);
    this.stroke();
   },
   stroke: "red",
   strokeWidth: 4 
});

var rightArc = new Kinetic.Shape({
	drawFunc: function() {
		var context = this.getContext(); 
		context.beginPath();
		context.arc(right_x, y, right_r, Math.PI, 2 * Math.PI, false);
		this.fill();
		this.stroke();
		},
	fill: "white",
	stroke: "black",
	strokeWidth: 3
});    		


calculate();  
arcLayer.draw();


dragCircle.on("dragmove", function() {
	drawArbelos(leftArc, rightArc, dragCircle.attrs.x, arcLayer);
  calculate();
});

backLayer.add(largeArc);
dragLayer.add(dragCircle);
arcLayer.add(rightArc);
arcLayer.add(leftArc);

arcLayer.add(twinCircle);
arcLayer.add(verticalTangentLine);
arcLayer.add(tangentLine);
stage.add(backLayer);
stage.add(arcLayer);
stage.add(dragLayer);
};

