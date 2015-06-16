var keystone = require('keystone'),
	async = require('async'),
	Group = keystone.list('Organisation');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
		locals = res.locals;

	// Init locals
	locals.section = 'blog';
	locals.filters = {
		group: req.params.group
	};

  view.on('init', function(next) {
		Group.model.findOne()
			.where('name', locals.filters.group)
			.populate('author')
			.exec(function(err, group) {
				if (err) return res.err(err);
				if (!group) return res.notfound('Group not found');
				locals.group = group;
				locals.group.populateRelated('posts members',next);

			});
	});
	view.render('site/group');

}
