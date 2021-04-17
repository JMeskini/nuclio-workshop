const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	url: {type: mongoose.Schema.Types.String, required: true},
	userName: {type: mongoose.Schema.Types.String, required: true}
}, {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }});


const Subscription = mongoose.model('Subscription', schema);



module.exports = Subscription;
