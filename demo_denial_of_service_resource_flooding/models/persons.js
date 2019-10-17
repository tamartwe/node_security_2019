'use strict';

const mongoose = require('mongoose');

const personSchema  = mongoose.Schema({
    name: {type: String},
    lastName: {type: String},
    address: {type: String}
});

module.exports = mongoose.model('Person', personSchema);