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
		// la liste des groupes de la personne dont elle est créatrice, donc admin
    /*keystone.list('Organisation').model.find().where('author',res.locals.user.id).populate('author').exec(function(err, orgas) {

      console.log(res.locals.user.id);

      if (err) {
        return next(err);
      }

      locals.orgas = orgas;
      console.log(locals.orgas.author);

      console.log(locals.orgas);
*/
			//récupère la liste de mes groupes suivis
				keystone.list('User').model.findById(res.locals.user.id).populate('groupes').exec(function(err,tamere){
					locals.groupes = tamere.groupes;
					console.log("################ Les groupes");
					console.log(locals.groupes);
					next();
				});
    });
		view.render('site/group');
/*
			//récupère la liste des membres du groupes selectionné
    keystone.list('Organisation').model.findOne().populate('author').exec(function(err, post) {
      console.log(post.author.name);
    });

  });*/

  // Render the view
	//view.render('site/group');
}
