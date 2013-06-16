if(Posts.find().count() == 0){

	Posts.insert({
		title: 'Introducing Microscope',
		author: 'Ningures Chainho',
		url: 'http://blog.martinh0.com'
	});

	Posts.insert({
		title: 'Meteor',
    	author: 'Tom Coleman',
    	url: 'http://meteor.com'
	});

	Posts.insert({
		title: 'The Meteor Book',
    	author: 'Tom Coleman',
    	url: 'http://themeteorbook.com'
	});

}