var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Organisations Model
 * ===================
 */

var Organisation = new keystone.List('Organisation', {
	track: true,
	autokey: { path: 'key', from: 'name', unique: true }
});

Organisation.add({
	name: { type: String, index: true },
	logo: { type: Types.CloudinaryImage },
	author: { type: Types.Relationship, ref: 'User',label : 'Creator', index: true },
	website: Types.Url,
	description: { type: Types.Markdown },
	location: Types.Location
});


/**
 * Relationships
 * =============
 */

Organisation.relationship({ ref: 'User', refPath: 'organisation', path: 'members' });


/**
 * Registration
 * ============
 */

Organisation.defaultColumns = 'name, website, isHiring';
Organisation.register();
