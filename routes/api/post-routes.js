const router = require('express').Router();
const { Post, User } = require('../../models');
//get all users

router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })

        .then(dbPostData => res.json(dbPostData))
        .catch(
            err => {
                console.log(err);
                res.status(500).json(err);
            }
        );
});

router.get(':/id', (req, res) => {
    const { id } = req.params;
    const postOne = Post.findOne({
        where: { id },
        attributes: ['id', 'post_url', 'title', 'created_at'],
        include: [{
            model: User,
            attributes: ['username']
        }]
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No Post found with this id' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
    });
});

module.exports = router;