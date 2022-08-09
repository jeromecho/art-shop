const fs = require('fs');
const ArtPiece = require('../models/artpiece');

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
	res.send('Not yet implemented');
};

exports.create_piece_post = (req, res) => { 
	res.send('Not yet implemented');
};

