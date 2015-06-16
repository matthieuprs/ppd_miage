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
      .exec(function(err, user) {
        if (err) return res.err(err);
        if (!user) return res.notfound('Oops ! we did not successfully find your groups.');
        locals.myGroups = user.groupes;
        next();
    });
	});

	view.render('site/myGroups');

}
