const ArtPieceInstance = require('../models/artpieceinstance');
const ArtPiece = require('../models/artpiece');
const async = require('async');

exports.piece_instance_detail = (req, res) => { 
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
	res.send('Not yet implemented');
};

exports.create_piece_instance_post = (req, res) => { 
	res.send('Not yet implemented');
};

