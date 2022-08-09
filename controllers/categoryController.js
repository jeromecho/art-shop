const Category = require('../models/category');
const ArtPiece = require('../models/artpiece');
const async = require('async');
const fetch = require('node-fetch');
const { createApi } = require('unsplash-js');
require('dotenv').config();

const unsplash = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY,
    fetch: fetch,
});

async function getRandomUnsplashPhoto() {
    return unsplash.photos.getRandom({}).then(result => {
        if (result.errors) { 
            console.log('Error occured: ', result.errors[0])
        } else { 
            const photo = result.response; 
            return photo.urls.full;
        }
    }).catch(err => {
        console.log('Error: ', err);
    });
}

// TODO - delete after integration w unsplash

            const images = [
                `https://previews.123rf.com/images/mrtwister/mrtwister1803/mrtwister180300026/96702248-artists-oil-painted-canvas-closeup-abstract-background.jpg`,
                `https://previews.123rf.com/images/dogfella/dogfella1412/dogfella141200182/34751039-abstract-background-of-white-painting-on-canvas-texture.jpg`,
                `https://thumbs.dreamstime.com/b/hand-drawn-oil-painting-abstract-art-background-colorful-texture-canvas-hand-drawn-oil-painting-abstract-art-background-colorful-157504128.jpg`, 
                `https://wallpaperaccess.com/full/5670274.jpg`,
                `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7EktvMz-Wppvpue8NbwP2EapovLQJ2dMEYLnqUVyyyBKY9TVKLxmcotU7plGGzOFBl-8&usqp=CAU`,
                `https://previews.123rf.com/images/yavdat1/yavdat11709/yavdat1170900198/85322667-abstract-hand-painted-blue-paint-canvas-background-blue-abstract-watercolor-background-art-hand-pain.jpg`,
            ];


exports.categories_list = (req, res, next) => { 
    async.waterfall([
        function (callback) {
            Category.find().exec(callback);
        },
        function (categories, callback) {
            // TODO - integrate with unsplash api 
            /*
            // Array confirmed 
            const arr = categories.map(category => getRandomUnsplashPhoto());

            Promise.all(arr).then(images => {
                console.log('Successful retriveal of images');
                callback(null, { categories, images });
            }).catch(err => next(err));
            */

            callback(null, { categories, images });
        }
    ], (err, results) => {
        if (err) { return next(err) }
        res.render('category_list', {
            title: 'Categories', 
            categories: results.categories,
            imgs: results.images, 
        });
    });
};

exports.category_detail = (req, res) => { 
    async.parallel({
        category(callback) {
            Category.findById(req.params.id).exec(callback);
        }, 
        category_paintings(callback) {
            ArtPiece.find({ category: req.params.id }).exec(callback);
        }
    }, (err, results) => {
        if (err) { return next(err) }
        res.render('category_detail', {
            category: results.category,
            paintings: results.category_paintings, 
            // TODO - integrate w unsplash
            img: images[0], 
        });
    });
};

exports.update_category_get = (req, res) => { 
	res.send('Not yet implemented');
};

exports.update_category_post = (req, res) => { 
	res.send('Not yet implemented');
};

exports.delete_category_get = (req, res) => { 
	res.send('Not yet implemented');
};

exports.delete_category_post = (req, res) => { 
	res.send('Not yet implemented');
};

exports.create_category_get = (req, res) => { 
	res.send('Not yet implemented');
};

exports.create_category_post = (req, res) => { 
	res.send('Not yet implemented');
};

