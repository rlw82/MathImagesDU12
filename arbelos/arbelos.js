function writeMessage(messageLayer, message, message2, xpos, ypos) {
				var context = messageLayer.getContext();
				messageLayer.clear();
				context.font = "18pt Calibri";
				context.fillStyle = "black";
				context.fillText(message, xpos, ypos);
				context.fillText(message2, xpos, ypos + 20);
}

var padding = 50;
var y = 0;
var right_x = 0;
var right_r = 0;
var left_x = 0;
var left_r = 0;
var rightPadding = 0;

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
height: 320
});

width = stage.getWidth();
y = 300;	
rightPadding = (stage.getWidth() - padding);

var backLayer = new Kinetic.Layer();
var messageLayer = new Kinetic.Layer();
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



dragCircle.on("dragmove", function() {
	drawArbelos(leftArc, rightArc, dragCircle.attrs.x, arcLayer);
	writeMessage(messageLayer, "left radius:" +  (Math.round(left_r)), "right radius:" + (Math.round(right_r)), 10, 25);

});

/*
 * since each line has the same point array, we can
 * adjust the position of each one using the
 * move() method
 */
backLayer.add(largeArc);
dragLayer.add(dragCircle);
arcLayer.add(rightArc);
arcLayer.add(leftArc);
stage.add(backLayer);
stage.add(arcLayer);
stage.add(dragLayer);
stage.add(messageLayer);
};

