var keystone = require('keystone');

var Post = keystone.list('Post');
	PostComment = keystone.list('PostComment');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	// Init locals
	locals.section = 'blog';
	locals.filters = {
		post: req.params.post
	};
	locals.data = {
		posts: []
	};
	
	view.on('init', function(next) {

		Post.model.findOne()
			.where('slug', locals.filters.post)
			.populate('author categories groupes')
			.exec(function(err, post) {

				if (err) return res.err(err);
				if (!post) return res.notfound('Post not found');

				// Allow admins or the author to see draft posts
				if (post.state == 'published' || (req.user && req.user.isAdmin) || (req.user && post.author && (req.user.id == post.author.id))) {
					locals.post = post;
					locals.post.populateRelated('comments[author]', next);
					locals.page.title = post.title + ' - Blog - Miage';					
				} else {
					return res.notfound('Post not found');
				}

			});

	});

	view.on('post', { action: 'edit-comment' }, function(next) {

		// handle form		
		Post.model.findOne()
			.where('_id', req.body.postId)
			.exec(function(err, post) {

				if (err) return res.err(err);
				if (!post) return res.notfound('Post not found');

				// Allow admins or the author to see draft posts
				post.updatedBy = req.user;
				post.updatedAt = new Date();
				post.content.extended = req.body.content;
				post.title = req.body.title;

				post.save(function(err) {
					if (err)
						console.log('Error updating post');
					else {
						req.flash('success', 'Votre Post a été modifié avec succès.');
						return res.redirect('/blog/post/' + locals.post.slug);
					}
				});				
			});
	});

	// Render the view
	view.render('site/edit');

}
