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
	upload: {
		type: Types.LocalFile,
		label: 'Upload File',
		dest: 'C:/Users/GiL/Desktop',
		prefix: '',
		filename: function(item, file){
			return item.id + '_' + file.originalname;
		}
	}
});




//Doc.defaultColumns = 'meetup, who, createdAt';
//Doc.defaultSort = '-createdAt';
Doc.defaultColumns = 'documentName, category, uploadedOn';
Doc.register();

