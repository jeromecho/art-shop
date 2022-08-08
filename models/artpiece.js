const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
const ArtPieceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectID, ref: 'Category' }],
    instances: [{ type: Schema.Types.ObjectID, ref: 'ArtPieceInstance' }],
    painter: { type: Schema.Types.ObjectID, ref: 'Painter' },
});

ArtPieceSchema.virtual('url').get(() => {
    return `/inventory/pieces/${this._id}`;
});

module.exports = mongoose.model('ArtPiece', ArtPieceSchema);






