const express = require('express');
const { validationResult } = require('express-validator');

//profile.user === auth.user => render a delete button
const auth = require('../helpers/middlewares/auth');
const Post = require('../../models/Post');
const User = require('../../models/Users');
const Profile = require('../../models/Profile');
const { requireText } = require('../helpers/validators');
const router = express.Router();

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get('/', auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @router      POST apis/posts
// @desc        adding new POSTS
// @access      PRIVATE
router.post('/', [ auth, [ requireText ] ], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		//find the user who posted the comment
		const user = await User.findById(req.user.id).select('-password');

		// to register a post => the req.body will only have text the rest we have to take from user model
		const newPost = new Post({
			text: req.body.text,
			name: user.name,
			avatar: user.avatar,
			user: req.user.id
		}); // this was the right thing to do

		// userid linked to post => username => avatar => text
		const post = await newPost.save();
		res.json(post);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get('/:postId', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);

		// Check for ObjectId format and post
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		res.json(post);
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// Check for ObjectId format and post
		if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
			return res.status(404).json({ msg: 'Post not found' });
		}

		// Check user
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		await post.remove();

		res.json({ msg: 'Post removed' });
	} catch (err) {
		console.error(err.message);

		res.status(500).send('Server Error');
	}
});

// when we like a post, we make a req to update the likes of the post... in postId...
// req.user.id => user liking the post
// in likes arr => store user with id req.user.id inside the array
// get user => store gravatar, name, time of the like

// @router      PUT apis/posts/like/:postId
// @desc        like a post
// @access      PRIVATE
router.put('/like/:postId', auth, async (req, res) => {
	try {
		// get the post with the id
		const post = await Post.findById(req.params.postId);

		// store user's name, avatar, userId inside the likes post
		// make sure a user cannot like the post twice
		const found = post.likes.find((like) => like.user.toString() === req.user.id);
		if (found) {
			// cannot like the post
			return res.status(400).json({ msg: 'Post liked already' });
		}

		//if post is not found... we can like the post

		const userData = {
			user: req.user.id
		};

		// push the userData to the post
		post.likes.unshift(userData);

		await post.save();

		res.json(post);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @router      PUT apis/posts/unlike/:postId
// @desc        unlike a post
// @access      PRIVATE
router.put('/unlike/:postId', auth, async (req, res) => {
	try {
		// get the post with the id
		const post = await Post.findById(req.params.postId);

		// find if the post has been liked already
		const found = post.likes.find((like) => like.user.toString() === req.user.id);

		// if no ... it can't be disliked
		if (!found) {
			// cannot like the post
			return res.status(400).json({ msg: 'you have to like the post first' });
		}

		// post.likes = post.likes.filter(like => like.user.toString() === req.user.id )
		post.likes = post.likes.filter((like) => like !== found);
		console.log(post.likes);

		//if post is not found... we can like the post

		await post.save();

		res.json(post);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// unlike a post => unlike button on the post

// @router      PUT apis/posts/comment/:postId
// @desc        leave a comment on the post
// @access      PRIVATE
router.put('/comment/:postId', [ auth, [ requireText ] ], async (req, res) => {
	console.log(req.params.postId);
	try {
		// get the post with the id
		const post = await Post.findById(req.params.postId);
		console.log(post);

		// get the body of the text from req.body
		const { text } = req.body;

		//find the user who made a comment
		const user = await User.findById(req.user.id);

		const userData = {
			user: req.user.id,
			name: user.name,
			avatar: user.avatar,
			text
		};

		// push the userData into the comments section
		post.comments.unshift(userData);

		await post.save();

		res.json(post);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// last route related to posts

// delete a comment route
// /comment/:postId/:commentId => we need postId to see what col is being
// find post
// find comment with commentId
// filter out the comment

// save changes to mongodb
// @router      DELETE apis/posts/comment/:postId/:commentId
// @desc        delete a comment from a post
// @access      PRIVATE
router.put('/comment/:postId/:commentId', auth, async (req, res) => {
	try {
		// get the post with the id
		const post = await Post.findById(req.params.postId);

		const comment = post.comments.find((comment) => comment.id === req.params.comment_id);
		// Make sure comment exists
		if (!comment) {
			return res.status(404).json({ msg: 'Comment does not exist' });
		}
		// Check user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		post.comments = post.comments.filter(({ id }) => id !== req.params.comment_id);

		await post.save();

		return res.json(post.comments);
		//make sure the user deleting the comment is the user who posted the comment

		await post.save();

		res.json(post);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;

// post('/', async(req, res) => message = { req.body }) => user=> req.user.id => avatar=> .populate('user', ['name', 'avatar'])
