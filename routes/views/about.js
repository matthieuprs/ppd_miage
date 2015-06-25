var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'about';
	locals.page.title = 'A propos';

	locals.organisers = [
		{ name: 'Aurélien Chassereau', image: '/images/organiser-craig_sharkie.jpg', twitter: 'Aurelien_Ch',       title: 'Milieu de terrain' },
		// { name: 'Thinkmill', image: '/images/organiser-thinkmill.jpg',     twitter: 'thethinkmill', title: 'Site coordinator' },
		{ name: 'Matthieu Peyres',     image: '/images/organiser-gil_davidson.jpg',     twitter: 'SuperDragz',   title: 'Gardien de but' },
		{ name: 'Adrien Valin',    image: '/images/organiser-adam_ahmed.jpg',    twitter: 'AdrienValin',   title: 'Pistolero' },
		{ name: 'Jordan Vo Ngoc', image: '/images/organiser-lachlan_hardy.jpg', facebook: 'jordanquang.vongoc', title: 'Numéro 10 - Organisateur' }
	]

	view.render('site/about');

}
