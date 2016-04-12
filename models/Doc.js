var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Docs Model
 * ===========
 */

var Doc = new keystone.List('Doc', {
	track: true,
	label: 'Document',
	defaultSort: '-createdAt',
	map: { name: 'documentName' }
});


Doc.add({
	documentName: { 
		type: String, 
		required: true, 
		label: 'Nom du Document', 
		initial: true 
	},
	uploadedOn: { 
		type: Date, 
		default: Date.now, 
		format: 'MMMM Do YYYY',
		label: 'Crée le' 
	},
	category: { 
		type: Types.Select, 
		options: [
    		{ value: 'L3', label: 'L3 MIAGE' },
    		{ value: 'M1', label: 'M1 MIAGE' },
    		{ value: 'M2', label: 'M2 MIAGE' }
		], 
		label: 'Année', 
		required: true, 
		initial: true 
	},
	teacher: { 
		type: Types.Relationship, 
		ref: 'User', 
		filters : { type: 'Professeur' },
		label: 'Professeur Encadrant' 
	},
	desc: { 
		type: Types.Html, 
		wysiwyg: true, 
		height: 100, 
		label: 'Description du Projet' 
	},
	students: { 
		type: Types.Relationship, 
		ref: 'User', 
		many: true, 
		label: 'Etudiants',
		filters: { type: 'Etudiant'} 
	},
	upload: {
		type: Types.LocalFile,
		label: 'Uploader un Sujet',
		dest: './public/upload/',
		filename: function(item, file){
			return item.id + '_' + file.originalname;
		}
	},
	download: {
		type: Types.Url,
		hidden: true,
		label: 'Download Link',
		noedit: true,
		watch: true,
		value: function() {
			if (typeof(this.upload.path) != 'undefined')
				return '/upload/' + this.upload.filename;
		}
	},
	discussion: {
		type: String,
		label: 'Comments',
		hidden: true
	}
});

//Doc.relationship({ ref: 'DocComment', refPath: 'doc', path: '' });

Doc.defaultColumns = 'documentName, teacher, category, uploadedOn';
Doc.register();

