var
  container = document.getElementById('container'),
  data, graph,t, years, rate, timesPerYear, all,
  options = {
              yaxis: {
                max: 3000
              },
              mouse: {
                track: true,
                relative: true
              },
              title: "Exponential Growth"
  };


function init(){
  all = false;
  rate = 0.05;
  timesPerYear = 1;
  draw();   
}
  
function draw () {
  if(all){
   displayAll(); 
  } else {
   displaySeries(); 
  }
}

function displaySeries(){
  //var data = [];
  years = 10;

  // Sample the exponential function
  var data = calcSeries(years, rate, timesPerYear);
  
  options["xaxis"] = {
    title: "Growth after 10 years is $" + Math.round(interest(timesPerYear, 10, rate)*100)/100
  }
  // Draw Graph
  graph = Flotr.draw(container, [data], options);
}

function displayAll(){
  all = true;
  
  options["xaxis"] = Flotr.defaultOptions["xaxis"];
  
  yearly = calcSeries(20, rate, 1);
  
  monthly = calcSeries(20, rate, 12);
  
  daily = calcSeries(20, rate, 365);
  
  cont = calcSeries(20, rate, 0);
  
  graph = Flotr.draw(container, [
  {
    data: yearly,
    label: "Yearly"
  },
  {
    data: monthly,
    label: "Monthly"
  },
  {
    data: daily,
    label: "Daily"
  },
  {
    data: cont,
    label: "Continuous"
  }],
  options);
}  

function changeTimesPerYear(n){
  all = false;
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


function calcSeries(years, rate, compound){
  var series = [];
  for (t = 0; t < years; t += 0.01) {
    series.push([t, interest(compound, t, rate)]);
  }
  return series;
}

function interest(n, i, rate){
  if(n==0){
    return 1000*Math.pow(Math.E, rate*i);
  }
  return 1000*Math.pow(1+(rate/n), n*i);
}

Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (var i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};

init();
