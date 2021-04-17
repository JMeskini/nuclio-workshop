const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	body: { type: String, required: true},
	user: {type: mongoose.Schema.Types.String,  required: true},
}, {timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }});


const ChatMessage = mongoose.model('ChatMessage', schema);



module.exports = ChatMessage;
