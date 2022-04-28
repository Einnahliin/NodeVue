const { Router } = require('express');
const express = require('express');
const mongodb = require('mongodb');
const { MongoClient } = require('mongodb');

const router = express.Router();



//Get Posts
router.get('/', async function(req,res) {
    const post = await loadPostCollection();
    res.send(await post.find({}).toArray());
});

//Add Post
router.post('/', async (req,res) => {
    const post = await loadPostCollection();
    await post.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Delete Post
router.delete('/:id', async (req,res) =>{
    const post = await loadPostCollection();
    await post.deleteOne({_id: new mongodb.ObjectId( req.params.id)});
    res.status(200).send();
});


async function loadPostCollection() {
    const client = await mongodb.MongoClient.connect(
    "mongodb+srv://TestUser:UserPassword@vueexpress.ooett.mongodb.net/VueExpress?retryWrites=true&w=majority",);
    


    return client.db('VueExpress').collection('posts');
};






module.exports = router;