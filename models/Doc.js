var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * Docs Model
 * ===========
 */

var Doc = new keystone.List('Doc', {
	track: true,
	label: 'Document',
	map: { name: 'documentName' }
});


Doc.add({
	documentName: { type: String, required: true, label: 'Document Name', initial: true },
	uploadedOn: { type: Date, default: Date.now },
	category: { type: Types.Select, options: [
    									{ value: 'L3', label: 'L3 MIAGE' },
    									{ value: 'M1', label: 'M1 MIAGE' },
    									{ value: 'M2', label: 'M2 MIAGE' }
									], label: 'Category', required: true, initial: true },
	teacher: { type: String, required: true, label: 'Teacher', initial: true },
	upload: {
		type: Types.LocalFile,
		label: 'Upload File',
		dest: '../upload/',
		prefix: '',
		filename: function(item, file){
			return item.id + '_' + file.originalname;
		}
	},
	download: {
		type: Types.Url,
		label: 'Download Link',
		noedit: true,
		watch: true,
		value: function() {
			if (typeof(this.upload.path) != 'undefined')
				return this.upload.path + this.upload.filename;
		}
	}
});



Doc.defaultColumns = 'documentName, teacher, category, uploadedOn';
Doc.register();

