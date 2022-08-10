const Category = require('../models/category');
const ArtPiece = require('../models/artpiece');
const async = require('async');
const fetch = require('node-fetch');
const { createApi } = require('unsplash-js');
const { categoryBgImgs } = require('../assets/images.js');
const { body, validationResult } = require('express-validator');
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
    })/*.catch(err => {
        console.log('Error: ', err);
    }); */
}

exports.categories_list = (req, res, next) => { 
    async.waterfall([
        function (callback) {
            Category.find().exec(callback);
        },
        function (categories, callback) {
            const arr = categories.map(category => getRandomUnsplashPhoto());
            Promise.all(arr)
            .then(images =>  callback(null, { categories, images }))
            // IF API is down, use images files
            .catch (err => callback(null, { category, categoryBgImgs}));
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
            ArtPiece.find({ categories: req.params.id }).exec(callback);
        }
    }, (err, results) => {
        if (err) { return next(err) }
        Promise.resolve(getRandomUnsplashPhoto())
        .then(imgURL => {
            res.render('category_detail', {
                category: results.category,
                paintings: results.category_paintings, 
                img: imgURL,
            })
        })
        .catch(err => {
            res.render('category_detail', {
                category: results.category,
                paintings: results.category_paintings, 
                img: categoryBgImgs[0], 
            });
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
    res.render('category_form', {});
};

exports.create_category_post = [
    body('name', 'Name is required').trim().isLength({ min: 1 }).escape(), 
    body('description', 'Description is required').trim().isLength({ min: 1 }).escape(), 
    (req, res, next) => { 
        const errors = validationResult(req);

        const category = new Category({
            name: req.body.name,
            description: req.body.description,
        });


        if (!errors.isEmpty()) { 
            res.render('category_form', {
                category: category, 
            });
        } else {
            category.save(err => {
                if (err) { return next(err) }
                res.redirect(category.url);
            });
        }
    }
];

