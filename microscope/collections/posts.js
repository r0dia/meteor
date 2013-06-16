Posts = new Meteor.Collection('posts');

Posts.allow({
	update: ownsDocument,
	remove: ownsDocument
});

Posts.deny({
	update: function(userId, post, fieldNames){
		return (_.without(fieldNames, 'url', 'title').length>0);
	}
});

Meteor.methods({
	post: function(postAttributes){
		var user = Meteor.user(),
		postWithSameLink = Posts.findOne({url: postAttributes.url});

		//ensure the user is logged in
		if (!user)
			throw new Meteor.Error(401, "You need to login to post new stories");

		//ensure the post has a title
		if(!postAttributes.title)
			throw new Meteor.Error(422, "You need to insert a title");

		//check that there are no previous post with the same link
		if(postAttributes.url && postWithSameLink){
			throw new Meteor.Error(302, "This link has already been posted",
				postWithSameLink._id);
		}

		// pick out the whitelisted keys
		var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
			userId : user._id,
			author: user.username,
			submitted: new Date().getTime()
		});

		var postId = Posts.insert(post);

		return postId;
	}
});
/*
Posts.allow({
	insert: function(userId, doc){
		return !! userId;
	}
})
*/