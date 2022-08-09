const mongoose = require('mongoose');
const Schema = mongoose.Schema;  
const PainterSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    dateOfDeath: { type: Date, required: true },
    img: { type: String, required: false },
});

PainterSchema.virtual('url').get(function () {
    return `/inventory/painter/${this._id}`;
});

PainterSchema.virtual('lifespan').get(function() {
    return this.dateOfBirth.toString().slice(11,15) +
        '-' + this.dateOfDeath.toString().slice(11,15);
});

module.exports = mongoose.model('Painter', PainterSchema);






