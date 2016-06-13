var keystone = require('keystone'),
	async = require('async');

var Doc = keystone.list('Doc');
	DocComment = keystone.list('DocComment');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;
		id = req.body.docId;

	locals.section = 'docs';
	locals.page.title = 'Docs';

    locals.data = {
        docs : [],
        coms : []
    };

    if (!locals.user) return res.notfound("Oops ! Vous n'êtes pas authentifié, il serait peut-être temps !");

	// Chargement documents
	view.on('init', function(next) {
		Doc.model.find({})
		.where('category').equals(locals.user.formation)
		.sort('createdAt')
		.populate('teacher students createdBy')
        .exec(function(err, docs){
            locals.data.docs = docs;

            next();
        });
	});

	//Chargement commentaires
	view.on('init', function(next) {
		DocComment.model.find({})
        .exec(function(err, coms){
            locals.data.coms = coms;

            next();
        });
	});


	view.on('post', { action: 'create-comment-doc' }, function(next) {
		
		console.log(locals.user.formation);
		var newDocComment = new DocComment.model({
				doc: id,
				author: locals.user.id
			}),

			updater = newDocComment.getUpdateHandler(req, res, {
				errorMessage: 'There was an error creating your new post:'
			});

		updater.process(req.body, {
			flashErrors: true,
			logErrors: true,
			fields: 'content'
		}, function(err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {				
				req.flash('success', 'Votre commentaire à été ajouté');
				return res.redirect('/docs/');
			}
			next();
		});
	});



	// Render the view
	view.render('site/doc');

}
