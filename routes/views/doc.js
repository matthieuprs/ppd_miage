var keystone = require('keystone'),
	async = require('async');
	
var Doc = keystone.list('Doc');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'docs'
    locals.data = {
        docs : []
    }
	
	// Load all categories
	view.on('init', function(next) {
		Doc.model.find({})
        .exec(function(err, docs){
            locals.data.docs = docs;
            
            next();
        });
	});

	// Render the view
	view.render('site/doc');
	
}
