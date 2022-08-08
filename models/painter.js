const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
const PainterSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    dateOfDeath: { type: Date, required: true },
});

PainterSchema.virtual('url').get(() => {
    return `/inventory/painters/${this._id}`;
});

module.exports = mongoose.model('Painter', PainterSchema);






