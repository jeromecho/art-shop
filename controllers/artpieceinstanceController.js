const ArtPieceInstance = require('../models/artpieceinstance');
const ArtPiece = require('../models/artpiece');
const async = require('async');
const url = require('url');
const { body, validationResult } = require('express-validator');
const { DateTime } = require('luxon');

exports.piece_instance_detail = (req, res, next) => { 
    async.parallel({
        instance(callback) {
            ArtPieceInstance.findById(req.params.id).exec(callback);
        }, 
        instance_artpiece(callback) {
            ArtPiece.findOne({ instances: { "$in" : [req.params.id]}}).exec(callback);
        }
    }, (err, results) => {
        if (err) { return next(err) }
        // TODO - debug
        res.render('artpieceinstance_detail', {
            artpiece: results.instance_artpiece,
            instance: results.instance,
        });
    });
};

exports.update_piece_instance_get = (req, res, next) => { 
            ArtPieceInstance.findById(req.params.id).exec((err, instance) => {
            if (err) { return next(err) } 
            res.render('artpieceinstance_form', {
                instance: instance, 
                artpieceID: 'dummy',
            });
    });
};

exports.update_piece_instance_post = [
    body('dateMade', 'Date made is required').trim().isISO8601().toDate(), 
    body('status', 'Status is required').escape(), 
    body('genuine', 'Genuine is required').escape(), 
    body('price', 'Price is required').trim().isLength({ min: 1 }).escape(), 
    body('productNumber', 'Product number must be an 8 character string')
    .trim()
    .isLength(8)
    .escape(),
    body('artpieceID', 'Art piece ID must exist').trim().isLength({ min: 1}),
    (req, res, next) => { 
        const errors = validationResult(req);

        const updated_instance = new ArtPieceInstance({
            dateMade: req.body.dateMade,
            status: req.body.status,
            genuine: req.body.genuine,
            price: req.body.price,
            productNumber: req.body.productNumber,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) { 
            res.render('artpieceinstance_form', { 
                instance: updated_instance, 
                artpieceID: req.body.artpieceID,
                errors: errors.array(),
            })
        } else {  
            ArtPieceInstance.findByIdAndUpdate(
                req.params.id, 
                updated_instance, 
                {}, 
                (err, updatedInstance) => {
                    if (err) { return next(err) }
                    res.redirect(updatedInstance.url);
                }
            );
    }
    }
];

exports.delete_piece_instance_get = (req, res, next) => { 
    ArtPiece.findOne({ instances: { "$in": [req.params.id] }}).exec(
    (err, piece) => {
        if (err) { return next(err) }

        res.render('artpieceinstance_delete', {
            piece: piece,
            instance_id: req.params.id,
        });
    });
};

exports.delete_piece_instance_post = (req, res, next) => { 
    async.parallel({
        deleteInstance(callback) {
            ArtPieceInstance.findByIdAndDelete(req.params.id, {}, callback);
        },  
        updatePiece(callback) { 
            ArtPiece.findOneAndUpdate({ instances: { "$in": [req.params.id] }}, {
                "$pull": { 
                    instances: req.params.id,
                },
            }).exec(callback);
        }},  (err, results) => {
            if (err) { return next(err) }
            res.redirect('/inventory/pieces');
        })
};

exports.create_piece_instance_get = (req, res) => { 
    const id = url.parse(req.url, true).query.piece;
    res.render('artpieceinstance_form', {
        artpieceID: id, 
    });
};

exports.create_piece_instance_post = [
    body('dateMade', 'Date made is required').trim().isISO8601().toDate(), 
    body('status', 'Status is required').escape(), 
    body('genuine', 'Genuine is required').escape(), 
    body('price', 'Price is required').trim().isLength({ min: 1 }).escape(), 
    body('productNumber', 'Product number must be an 8 character string')
    .trim()
    .isLength(8)
    .escape(),
    body('artpieceID', 'Art piece ID must exist').trim().isLength({ min: 1}),
    (req, res, next) => { 
        const errors = validationResult(req);

        const new_instance = new ArtPieceInstance({
            dateMade: req.body.dateMade,
            status: req.body.status,
            genuine: req.body.genuine,
            price: req.body.price,
            productNumber: req.body.productNumber,
        });

        if (!errors.isEmpty()) { 
            res.render('artpieceinstance_form', { 
                instance: new_instance, 
                artpieceID: req.body.artpieceID,
                errors: errors.array(),
            })
        } else {  
            ArtPiece.findByIdAndUpdate(req.body.artpieceID, 
                { 
                $push: { instances: new_instance._id }
                },
                {},
                (err, updatedArtpiece) => {
                    if (err) { return next(err) }
                }
            );
            new_instance.save(err => {
                if (err) { return next(err) }
                res.redirect(new_instance.url);
            });
        }
    }
];




