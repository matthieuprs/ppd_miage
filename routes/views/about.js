var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'about';
	locals.page.title = 'About SydJS';

	locals.organisers = [
		{ name: 'Aurélien Chassereau', image: '/images/organiser-craig_sharkie.jpg', twitter: 'twalve',       title: 'Milieu de terrain' },
		// { name: 'Thinkmill', image: '/images/organiser-thinkmill.jpg',     twitter: 'thethinkmill', title: 'Site coordinator' },
		{ name: 'Matthieu Peyres',     image: '/images/organiser-gil_davidson.jpg',     twitter: 'iamnotyourbroom',   title: 'Gardien de but' },
		{ name: 'Adrien Valin',    image: '/images/organiser-adam_ahmed.jpg',    twitter: 'hitsthings',   title: 'Pistolero' },
		{ name: 'Jordan Vo Ngoc', image: '/images/organiser-lachlan_hardy.jpg', twitter: 'lachlanhardy', title: 'Numéro 10 - Organisateur' }
	]

	view.render('site/about');

}
