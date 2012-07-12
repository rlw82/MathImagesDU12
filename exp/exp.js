var board = JXG.JSXGraph.initBoard('exponential', {boundingbox: [0, 5000, 10, 0], axis: true, showCopyright:false});      

//create('slider', [[startX, startY], [endX, endY], [min, start, max]], {options})
interest = board.create('slider', [[1, 500], [4, 500], [0.05, 0.1, 1]], {name:'Interest Rate'});
interval = board.create('slider', [[1, 150], [4, 150], [1, 12, 365]], {name:"Compound Interval",  spanWidth: 1});
cont = board.create('slider', [[7, 650], [7, 150], [0, 0, 1]]);

curve = board.create('functiongraph', [function(x) {
                                        if(cont.Value() === 1){
                                          return 1000 * Math.pow(Math.E, interest.Value() * x);
                                        }
                                        return 1000 * Math.pow((1 + (interest.Value()/interval.Value())), interval.Value()*x); 
                                      }]);

glide = board.create('glider', [5, 0, curve], {withLabel:false, showInfobox:true});

