var keystone = require('keystone'),
	async = require('async'),
	Group = keystone.list('Organisation'),
	_= require('underscore');

var PostComment = keystone.list('PostComment');
var User = keystone.list('User');

exports = module.exports = function(req, res) {
  var view = new keystone.View(req, res),
		locals = res.locals;

	// Init locals
	locals.section = 'blog';
	locals.filters = {
		group: req.params.group
	};

	locals.data = {
		coms: []
	};

	//Chargement commentaires
	view.on('init', function(next) {
		PostComment.model.find({})
        .exec(function(err, coms){
            locals.data.coms = coms;
            next();
        });
	});

  	view.on('init', function(next) {
		Group.model.findOne()
			.where('name', locals.filters.group)
			.populate('author')
			.exec(function(err, group) {
				if (err) return res.err(err);
				if (!group) return res.notfound('Oops !');
				locals.group = group;				

				for (var i=0; i<locals.user.groupes.length; i++) {
					if (locals.user.groupes[i] == group.id)
						locals.isFollowed = true;
					else
						locals.isFollowed = false;
				}

				//console.log(_.findIndex(locals.user.groupes, group.id));
				/*if (_.findIndex(locals.user.groupes, group.id) == -1)
					locals.isFollowed = false;
				else {
					locals.isFollowed = true;
				}*/

				locals.group.populateRelated('posts[author groupes] members',next);

			});


	});

	view.on('post', { action: 'me.abonnement' }, function(next) {
		//keystone.list('User').model.findById(locals.user.id)
		//locals.filters.group		
		
		User.model.findOne()
			.where('_id', req.user.id)
			.exec(function(err, user) {
				
				if (err) return res.err(err);
				if (!user) return res.notfound('User not found');
				
				user.updatedAt = new Date();
				user.groupes.push(req.body.id);				

				user.save(function(err) {
					if (err)
						console.log('Group ' + req.body.name + ': Error updating user');
					else {
						req.flash('success', 'Vous suivez maintenant le groupe ' + req.body.name + '.');
						return res.redirect('/group/' + req.body.name);
					}
				});
			});
	});

	view.on('post', { action: 'me.desabonnement' }, function(next) {		

		User.model.findOne()
			.where('_id', req.user.id)
			.exec(function(err, user) {
				
				if (err) return res.err(err);
				if (!user) return res.notfound('User not found');
				
				user.updatedAt = new Date();
				var tmpGroupe = user.groupes;

				var i = tmpGroupe.indexOf(req.body.id);
				if(i != -1)
					tmpGroupe.splice(i, 1);
								
				user.groupes = tmpGroupe;

				user.save(function(err) {
					if (err)
						console.log('Group ' + req.body.name + ': Error updating user');
					else {
						req.flash('success', 'Vous ne suivez plus le groupe ' + req.body.name + '.');
						return res.redirect('/organisations/');
					}
				});
			});
	});
	
	
	view.render('site/group');

}
