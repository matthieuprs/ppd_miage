var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Post Comments Model
 * ===================
 */

var DocComment = new keystone.List('DocComment', {
	nocreate: false
});

DocComment.add({
	doc: { type: Types.Relationship, ref: 'Doc', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	date: { type: Types.Date, default: Date.now, index: true },
	content: { type: Types.Markdown }
});


/**
 * Registration
 * ============
 */

DocComment.defaultColumns = 'doc, author, date|20%';
DocComment.register();
