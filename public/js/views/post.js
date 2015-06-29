/* Make sure to change all $() to jQuery() if you're using directly in WordPress */

$(document).ready(function() {
  var closeHeight = '5em'; /* Default "closed" height */
	var moreText 	= 'Afficher la suite'; /* Default "Read More" text */
	var lessText	= 'Réduire'; /* Default "Read Less" text */
	var duration	= '1000'; /* Animation duration */
  var easing = 'linear'; /* Animation easing option */

	// Limit height of .entry-content div
	$('.entry').each(function() {

		// Set data attribute to record original height
		var current = $(this).children('.entry-content');
    if (current.height() > 50) {
		  current.data('fullHeight', current.height()).css('height', closeHeight);

		    // Insert "Read More" link
		      current.after('<a href="javascript:void(0);" class="more-link closed">' + moreText + '</a>');
    }
	});

  // Link functinoality
	var openSlider = function() {
		link = $(this);
		var openHeight = link.prev('.entry-content').data('fullHeight') + 'px';
		link.prev('.entry-content').animate({'height': openHeight}, {duration: duration }, easing);
		link.text(lessText).addClass('open').removeClass('closed');
    	link.unbind('click', openSlider);
		link.bind('click', closeSlider);
	}

	var closeSlider = function() {
		link = $(this);
    	link.prev('.entry-content').animate({'height': closeHeight}, {duration: duration }, easing);
		link.text(moreText).addClass('closed').removeClass('open');
		link.unbind('click');
		link.bind('click', openSlider);
	}

  	// Attach link click functionality
	$('.more-link').bind('click', openSlider);

});
