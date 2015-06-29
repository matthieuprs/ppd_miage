var keystone = require('keystone'),
	async = require('async'),
	Group = keystone.list('Organisation'),
	_= require('underscore');

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

				console.log(_.findIndex(locals.user.groupes, req.params.group.id));
				if (_.findIndex(locals.user.groupes, req.params.group.id) == -1)
					locals.isFollowed = false;
				else {
					locals.isFollowed = true;
				}

				locals.group.populateRelated('posts[author groupes] members',next);

			});


	});

	/*view.on('post', { action: 'me.abonnement' }, function(next) {
		keystone.list('User').model.findById(locals.user.id)
		locals.filters.group
	});
	*/
	view.render('site/group');

}
