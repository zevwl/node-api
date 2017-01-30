const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bearSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Bear', bearSchema);