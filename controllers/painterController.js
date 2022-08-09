const Painter = require('../models/painter');
const ArtPiece = require('../models/artpiece');
const async = require('async');


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
	res.send('Not yet implemented');
};

exports.create_painter_post = (req, res) => { 
	res.send('Not yet implemented');
};

