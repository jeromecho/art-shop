const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
const ArtPieceSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectID, ref: 'Category' }],
    image: { type: String, required: true },
    instances: [{ type: Schema.Types.ObjectID, ref: 'ArtPieceInstance' }],
    painter: { type: Schema.Types.ObjectID, ref: 'Painter' },
});

// CANT USE () => here. We want context according to object before . in use 
//                case, not according to how the code is WRITTEN originally
ArtPieceSchema
.virtual('url')
.get(function () {
    return `/inventory/pieces/${this._id.toString()}`;
});

module.exports = mongoose.model('ArtPiece', ArtPieceSchema);






