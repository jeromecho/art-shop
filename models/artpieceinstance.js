const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
const ArtPieceInstanceSchema = new Schema({
    dateMade: { type: Date, required: true },
    status: { type: String, required: true , enum: ['Available', 'Sold', 'On the way'], 
        default: 'Available'},
    genuine: { type: String, required: true, enum: ['Genuine', 'Replica'],
        default: 'Replica' },
    price: { type: Number, required: true },
    productNumber: { type: String, required: true },
});

ArtPieceInstanceSchema.virtual('url').get(() => {
    return `/inventory/pieceinstances/${this._id}`;
});

module.exports = mongoose.model('ArtPieceInstance', ArtPieceInstanceSchema);






