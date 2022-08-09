const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
const { DateTime } = require('luxon');
const ArtPieceInstanceSchema = new Schema({
    dateMade: { type: Date, required: true },
    status: { type: String, required: true , enum: ['Available', 'Sold', 'On the way'], 
        default: 'Available'},
    genuine: { type: String, required: true, enum: ['Genuine', 'Replica'],
        default: 'Replica' },
    price: { type: Number, required: true },
    productNumber: { type: String, required: true },
});

ArtPieceInstanceSchema.virtual('url').get(function () {
    return `/inventory/piece_instance/${this._id}`;
});

ArtPieceInstanceSchema.virtual('date_made_formatted').get(function () {
    return DateTime.fromJSDate(this.dateMade).toLocaleString(DateTime.DATE_MED); 
});

module.exports = mongoose.model('ArtPieceInstance', ArtPieceInstanceSchema);






