var board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [0, 2000, 5, 1000], axis: true});      

interest = board.create('slider', [[1, 1875], [4, 1875], [0.05, 0.05, 1]], {name:'Interest Rate'});
interval = board.create('slider', [[1, 1625], [4, 1625], [1, 1, 365]], {name:"Compound Interval"});

curve = board.create('functiongraph', [function(x) {
                                        return Math.pow(1000 * (1 + (interest.X()/interval.X())), interval.X()*x); 
                                      }]);



