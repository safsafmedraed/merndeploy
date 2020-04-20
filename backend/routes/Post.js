const router = require('express').Router();
let User = require('../models/user.model');
let Post = require('../models/Post')
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator')
const Profile = require('../models/profile')
//add post 
router.route('/').post([auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            title: req.body.title,
            text: req.body.text,
            name: user.username,
            avatar: user.avatar,
            user: req.user.id
        })
        const post = await newPost.save();
        res.json(post);


    } catch (error) {
        Console.error(error)
        res.status(500).send('server Error')
    }

})

//get all posts 
router.route('/').get(

    auth,
    async (req, res) => {
        try {
            const post = await Post.find().sort({ date: -1 });
            res.json(post);
        } catch (error) {
            Console.error(error)
            res.status(500).send('server Error')
        }
    })

//get by id
router.route('/:id').get(

    auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' })
            }
            post.views = post.views + 1;
            console.log("views  incremented to " + post.views)
            post.save();

            res.json(post);
        } catch (error) {
            Console.error(error)
            if (error.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Post not found' })
            }
            res.status(500).send('server Error')
        }
    });
//delete post 
router.route('/:id').delete(auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }
        //check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized to delete post ' })
        }
        await post.remove();

        res.json({ msg: 'post removed ' });
    } catch (error) {
        Console.error(error)
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('server Error')
    }



})

// like post
router.route('/like/:id').put(auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //check if the post has already been liked from the user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (error) {
        Console.error(error)
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('server Error')
    }

})
//unlike post 
router.route('/unlike/:id').put(auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        //check if the post has already been liked from the user
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' });
        }
        //get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1)

        await post.save();
        res.json(post.likes);
    } catch (error) {
        Console.error(error)
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('server Error')
    }

})

//add comments

router.route('/comment/:id').post([auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.username,
            avatar: user.avatar,
            user: req.user.id
        }
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);


    } catch (error) {
        Console.error(error)
        res.status(500).send('server Error')
    }

})



//delete comment
router.route('/comment/:id/:comment_id').delete(auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const comment = post.comments.find(comment => comment.id == req.params.comment_id)
        if (!comment) {
            return res.status(404).json({ msg: 'Comment not found ' })
        }
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }
        const removeIndex = post.comments.
            map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1)

        await post.save();
        res.json(post.comments);
    } catch (error) {
        Console.error(error)
        res.status(500).send('server Error')
    }





})

// rating 
router.route('/rate/:id').post(auth, async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.user.id).select('-password');
        if (post.rate.filter(rate => rate.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already rated' });
        }
        // post.rate.unshift({ user: req.user.id });

        const newrate = {
            rating: req.body.rating,
            user: req.user.id
        }
        post.rate.unshift(newrate);
        console.log(post)
        // await post.save();
        let sum = 0;
        post.rate.forEach(r => {
            sum = sum + r.rating

        });
        post.avg = sum / post.rate.length;

        console.log(post.avg);
        await post.save();
        res.json(post.rate)
    } catch (error) {

        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        res.status(500).send('server Error')
    }
})













module.exports = router;