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
            ArtPiece.findOne({name: 'The Potato Eaters'}).exec(callback);
            return;
            ArtPiece.find({ instances: { "$in" : [req.params.id]}}).exec(callback);
        }
    }, (err, results) => {
        if (err) { return next(err) }
        // TODO - debug
        console.log(results.instance_artpiece);
        res.render('artpieceinstance_detail', {
            artpiece: results.instance_artpiece,
            instance: {
                dateMade: results.instance.date_made_formatted,
                genuine: results.instance.genuine,
                status: results.instance.status,
                price: results.instance.price,
                productNumber: results.instance.productNumber,
                _id: results.instance._id,
            },
        });
    });
};

exports.update_piece_instance_get = (req, res) => { 
	res.send('Not yet implemented');
};

exports.update_piece_instance_post = (req, res) => { 
	res.send('Not yet implemented');
};

exports.delete_piece_instance_get = (req, res) => { 
	res.send('Not yet implemented');
};

exports.delete_piece_instance_post = (req, res) => { 
	res.send('Not yet implemented');
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




