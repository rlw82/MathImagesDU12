var board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [0, 5000, 10, 0], axis: true});      

JXG.Options.showCopyright = false;

interest = board.create('slider', [[1, 500], [4, 500], [0.05, 0.1, 1]], {name:'Interest Rate'});
interval = board.create('slider', [[1, 100], [4, 100], [1, 12, 365]], {name:"Compound Interval"});

curve = board.create('functiongraph', [function(x) {
                                        return 1000 * Math.pow((1 + (interest.Value()/interval.Value())), interval.Value()*x); 
                                      }]);



