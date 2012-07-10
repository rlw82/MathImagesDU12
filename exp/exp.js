var
  container = document.getElementById('container'),
  data, graph,t, years, rate, timesPerYear;


function draw () {

  data = [];
  years = 10;

  // Sample the exponential function
  for (t = 0; t < years; t += 0.01) {
    data.push([t, interest(timesPerYear, t, rate)]);
  }

  // Draw Graph
  graph = Flotr.draw(container, [ data ], {
    yaxis: {
      max: 1600
    },
    xaxis: {
      title: "Growth after 10 years: $" + Math.round(interest(timesPerYear, 10, rate)*100)/100
    },
    mouse: {
      track: true,
      relative: true
    },
    title: "Exponential Growth"
  });

}

function changeTimesPerYear(n){
  if(n >= 0){
    timesPerYear = n;
  }
  draw();
}

function changeRate(newRate) {
  if(newRate <= 0){
    rate = 0.001;
  } else if(newRate > 1){
    rate = 1
  }else {
     rate = newRate;
  }
  display = (rate*100).toFixed(2);
  document.getElementById("rate").innerHTML=display+ "%";
  draw();            
}

function interest(n, i, rate){
  if(n==0){
    return 1000*Math.pow(Math.E, rate*i);
  }
  return 1000*Math.pow(1+(rate/n), n*i);
}

rate = 0.05;
timesPerYear = 1;
draw();
