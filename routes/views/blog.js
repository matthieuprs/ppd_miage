var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// Init locals
	locals.section = 'blog';
	locals.page.title = 'Fil d\'actualité	';
	locals.filters = {
		category: req.params.category
	};
	locals.data = {
		posts: [],
		categories: []
	};
		//Ajout commentaire pour commit
		// Load the posts

		if (!locals.user) return res.notfound("Oops ! vous n'êtes pas authentifié, il serait peut-être temps !");

		view.on('init', function(next) {
		  User.model.findById(locals.user.id)
		  .populate('groupes')
		    .exec(function(err, res) {
		      if (err) return res.err(err);
		      if (!res) return res.notfound("Oops ! vous n'êtes pas authentifié, il serait peut-être temps !");
		      locals.myGroups = res.groupes;
		      next();
		  });
		});

		view.on('init', function(next) {

			var q = keystone.list('Post').model.find().where('state', 'published').sort('-publishedDate').populate('author categories groupes');

			q.exec(function(err, results) {
				locals.data.posts = results;
				next(err);
			});
		});

	// Render the view
	view.render('site/blog');

}
