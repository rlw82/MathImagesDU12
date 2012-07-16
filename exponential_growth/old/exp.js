var
  container = document.getElementById('container'),
  data, graph,t, years, rate, compoundRate, all,
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
  compoundRate = 1;
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
  var data = calcSeries(years, rate, compoundRate);
  
  options["xaxis"] = {
    title: "Growth after 10 years is $" + Math.round(interest(compoundRate, 10, rate)*100)/100
  }
  // Draw Graph
  graph = Flotr.draw(container, [data], options);
}

function displayAll(){
  
  all = true;
  
  //we don't want to display 10 year growth because there is more than one
  options["xaxis"] = Flotr.defaultOptions["xaxis"];
  
  //calculate series for all 4 intervals
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

function setCompoundRate(n){
  all = false;
  if(n >= 0){
    compoundRate = n;
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

init();
