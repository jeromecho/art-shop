const Painter = require('../models/painter');
const ArtPiece = require('../models/artpiece');
const async = require('async');
const { body, validationResult } = require('express-validator');

exports.painters_list = (req, res) => { 
    Painter.find().exec((err, found_painters) => {
        res.render('painters_list', {
            title: 'Painters', 
            painters: found_painters, 
        })
    });
};

exports.painter_detail = (req, res) => {
    async.parallel({
        painter(callback) {
            Painter.findById(req.params.id).exec(callback);
        }, 
        painter_paintings(callback) {
            ArtPiece.find({ painter: req.params.id }).exec(callback);
        }
    }, (err, results) => {
        if (err) { return next(err) }
        res.render('painter_detail', {
            painter: results.painter,
            paintings: results.painter_paintings, 
        });
    });
};

exports.update_painter_get = (req, res) => { 
	res.send('Not yet implemented');
};

exports.update_painter_post = (req, res) => { 
	res.send('Not yet implemented');
};

exports.delete_painter_get = (req, res) => { 
	res.send('Not yet implemented');
};

exports.delete_painter_post = (req, res) => { 
	res.send('Not yet implemented');
};

exports.create_painter_get = (req, res) => { 
    res.render('painter_form', {});
};

exports.create_painter_post = [
    body('name', 'Name is required').trim().isLength({ min: 1 }).escape(), 
    body('description', 'Description is required').trim().isLength({ min: 1 }).escape(), 
    body('dateOfBirth', 'Date of Birth is required')
    .trim()
    .isLength({ min: 1 })
    .isISO8601()
    .toDate(),
    body('dateOfDeath', 'Date of Death is required')
    .trim()
    .isLength({ min: 1 })
    .isISO8601()
    .toDate(),
    body('img', 'Image URL is required').trim().isLength({ min: 1 }), 
    (req, res, next) => { 
        const errors = validationResult(req);

        const painter = new Painter({
            name: req.body.name,
            description: req.body.description,
            dateOfBirth: req.body.dateOfBirth,
            dateOfDeath: req.body.dateOfDeath,
            img: encodeURI(req.body.img),
        });

        if (!errors.isEmpty()) { 
            const decodedPainter = {
                name: req.body.name,
                description: req.body.description,
                dateOfBirth: req.body.dateOfBirth,
                dateOfDeath: req.body.dateOfDeath,
                img: decodeURI(req.body.img),
            };

            res.render('painter_form', {
                painter: decodedPainter,
            });
        } else {
            painter.save(err => {
                if (err) { return next(err) }
                res.redirect(painter.url);
            });
        }
    }
];

