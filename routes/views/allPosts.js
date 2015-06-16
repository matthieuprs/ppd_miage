var keystone = require('keystone');

var Post = keystone.list('Post');
	PostComment = keystone.list('PostComment');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// Init locals
	locals.section = 'All Posts';
	locals.filters = {
		post: req.params.post
	};

	console.log(Post);


	// Render the view
	view.render('site/post');

}
