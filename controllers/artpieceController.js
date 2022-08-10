const fs = require('fs');
const ArtPiece = require('../models/artpiece');
const ArtPieceInstance = require('../models/artpieceinstance');
const Category = require('../models/category');
const Painter = require('../models/painter');
const async = require('async');
const { body, validationResult } = require('express-validator');

exports.index = (req, res) => {
    res.render('homepage', {
        title: 'Art Shop', 
    });
};

exports.pieces_list = (req, res) => { 
    ArtPiece.find().exec((err, art_pieces) => {
        if (err) { return next(err) }

        res.render('artpieces_list', {
            title: 'Art Shop', 
            artpieces: art_pieces,
        });
    })
};

exports.piece_detail = (req, res, next) => { 
    ArtPiece.findById(req.params.id)
    .populate('instances')
    .populate('categories')
    .populate('painter')
    .exec((err, piece) => {
        if (err) { return next (err) }

        res.render('artpiece_detail', {
            piece: piece,
        })
    });
};

exports.update_piece_get = (req, res) => { 
	res.send('Not yet implemented');
};

exports.update_piece_post = (req, res) => {j
	res.send('Not yet implemented');
};

exports.delete_piece_get = (req, res) => { 
	res.send('Not yet implemented');
};

exports.delete_piece_post = (req, res) => { 
	res.send('Not yet implemented');
};

exports.create_piece_get = (req, res) => { 
    async.parallel({
        all_categories (callback) {
            Category.find({}, callback);
        },
        all_painters (callback) { 
            Painter.find({}, callback);
        }
    }, (err, results) => {
        if (err) { return next(err) }
        res.render('artpiece_form', {
            painters: results.all_painters,
            categories: results.all_categories,
        })
    });
};

exports.create_piece_post = [
    (req, res, next) => {
        const categories = req.body.categories;
        if (!Array.isArray(req.body.categories)) { 
            req.body.categories = [ req.body.categories ];
        } 
        next();
    },
    body('name', 'Name is required').trim().isLength({ min: 1 }).escape(),  
    body('description', 'description is required').trim().isLength({ min: 1 }).escape(), 
    body('image', 'Image URL is required').trim().isLength({ min: 1 }), 
    body('painter', 'Painter is required').trim().isLength({ min: 1 }).escape(), 
    body('categories.*')
    .trim()
    .optional({ checkFalsy: true })
    .isLength({ min: 1 })
    .escape(), 
    (req, res, next) => {
        async.parallel({
            all_categories(callback) { 
                Category.find({}, callback);
            },
            all_painters(callback) { 
                Painter.find({}, callback);
            },
        }, (err, results) => {
            if (err) { return next(err) }
            const errors = validationResult(req);

            const artPiece = new ArtPiece({ 
                name: req.body.name,  
                description: req.body.description, 
                categories: req.body.categories, 
                image: encodeURI(req.body.image), 
                instances: [],
                painter: req.body.painter,
            });


            if (!errors.isEmpty()) { 
                const artPieceDecoded = {
                    // TODO - try spread operator
                    name: req.body.name,  
                    description: req.body.description, 
                    categories: req.body.categories, 
                    image: decodeURI(req.body.image), 
                    instances: [],
                    painter: req.body.painter,
                };

                console.log(artPieceDecoded);

                res.render('artpiece_form', {
                    piece: artPieceDecoded,
                    errors: errors.array(), 
                    categories: results.all_categories,
                    painters: results.all_painters,
                });
            } else {
                artPiece.save(err => {
                    if (err) { 
                        return next(err);
                    }
                    res.redirect(artPiece.url);
                });
            }
        })

    }
];

