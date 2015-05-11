var keystone = require('keystone'),
	async = require('async');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
		locals = res.locals;
		
	locals.data = {
		groups: [],
		posts: []
	};

  view.on('init', function(next) {

    keystone.list('Organisation').model.find().where('author',res.locals.user.id).populate('author').exec(function(err, orgas) {

      console.log(res.locals.user.id);

      if (err) {
        return next(err);
      }

      locals.orgas = orgas;
      console.log(locals.orgas.author);

      console.log(locals.orgas);
      next();
    });

    keystone.list('Organisation').model.findOne().populate('author').exec(function(err, post) {
      console.log(post.author.name);
    });

  });

  // Render the view
	view.render('site/group');
}
