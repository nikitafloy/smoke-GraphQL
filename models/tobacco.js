const {Schema, model} = require('mongoose')

const tobacco = new Schema({
    name: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
})

module.exports = model('Product', tobacco)