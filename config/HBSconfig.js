

var hbsConfig = {};






hbsConfig.init= function(hbs){
	
	
	
	//Compares first value to the second one allowing entering IF clouse if true.
	//Otherwise entering ELSE clause if exist.
	hbs.registerHelper('ifEquals', function(a, b, options) {
	if (a === b) {
	 return options.fn(this);
	}

	return options.inverse(this);
	});


	
	







hbs.registerHelper('for', function(from, to, incr, block) {
    var accum = '';
    for(var i = from; i < to; i += incr)
        accum += block.fn(i);
    return accum;
});







hbs.registerHelper('times', function(a, b, c=0) {
    var num = 0;
   
    num = c + (a * b);
    return num;
});





}

module.exports = hbsConfig;



