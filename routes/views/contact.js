var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;
 /*('document').ready(function() {
    var msg = $('#message');
    msg.autosize();
	});*/
  view.render('site/contact');
}
