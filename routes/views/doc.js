var keystone = require('keystone'),
	async = require('async');
	
var Doc = keystone.list('Doc');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = 'docs';
	locals.current = {
		sort: (req.query.sort == 'documentName') ? 'documentName' : 'category'
	};
	locals.filters = {
		tag: req.params.tag
	};
	locals.data = {
		docs: [],
		tags: []
	};
	
	// Load all categories
	view.on('init', function(next) {
		
		keystone.list('Doc').model.find().sort('documentName').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.tags = results;
			
			// Load the counts for each category
			async.each(locals.data.tags, function(tag, next) {
				
				/*keystone.list('Link').model.count().where('tag').in([tag.id]).exec(function(err, count) {
					tag.linkCount = count;
					next(err);
				});*/
				
			}, function(err) {
				next(err);
			});
			
		});
		
	});
	/*
	// Load the current category filter
	view.on('init', function(next) {
		
		if (req.params.tag) {
			keystone.list('LinkTag').model.findOne({ key: locals.filters.tag }).exec(function(err, result) {
				locals.data.tag = result;
				next(err);
			});
		} else {
			next();
		}
		
	});
	
	view.on('render', function(next) {
		
		var q = keystone.list('Link').model.find().where('state', 'published').sort('-publishedDate').populate('author tags');
		
		if (locals.data.tag) {
			q.where('tags').in([locals.data.tag]);
		}
		
		q.sort(locals.current.sort == 'name' ? 'name.last' : '-changedOn');
		
		q.exec(function(err, results) {
			if (err) return res.err(err);
			locals.data.links = results;
			next();
		});
		
	});
	*/	
	// Render the view
	view.render('site/docs');
	
}
