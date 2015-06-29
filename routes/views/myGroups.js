var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
		locals = res.locals;

	// Init locals
	locals.section = 'blog';

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

	view.render('site/myGroups');

}
