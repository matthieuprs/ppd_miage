var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Post = new keystone.List('Competence', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt',
});

Post.add({
    title: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

Post.defaultColumns = 'title'
Post.register();
