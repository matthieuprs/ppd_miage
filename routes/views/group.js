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
		//Rechercher les groupes de la personne connectée.
    keystone.list('Organisation').model.find().where('author',res.locals.user.id).populate('author').exec(function(err, orgas) {
			// la liste des groupes de la personne dont elle est créatrice, donc admin
      locals.orgas = orgas;
      next();
    });

		//récupère la liste de mes groupes suivis
		keystone.list('User').model.findById(res.locals.user.id).populate('groupes').exec(function(err,user){
			locals.test = user.groupes;
			console.log(locals.test);
		});

		//récupère la liste des membres du groupes selectionnés

    keystone.list('Organisation').model.findOne().populate('author').exec(function(err, post) {
    //récupère la liste des autheurs des groupes
    });
		//récupère la liste des posts d'un groupe
		//keystone.liste('Post').model.find().where('groupe').in([])



  });

  // Render the view
	view.render('site/group');
}
