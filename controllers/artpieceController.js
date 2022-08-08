const fs = require('fs');

exports.index = (req, res) => {
    res.render('homepage', {
        title: 'Art Shop', 
    });
};

exports.pieces_list = (req, res) => { 
	res.send('Not yet implemented');
};

exports.piece_detail = (req, res) => { 
	res.send('Not yet implemented');
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

