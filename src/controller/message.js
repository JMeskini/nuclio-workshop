const {ChatMessage, Subscription} = require('../mongo/index');

const https = require('https');

//GET ALL MESSAGES
exports.index = (req, res) => {
	ChatMessage.find().then(chats => {
		res.status(200).json(chats);
	}).catch(e => {
		res.status(500).json({error: e.message});
	});
};

//CREATE ONE BY CHAT
exports.createOne = (req, res) => {
	try {
			if(req.body.body){
				const message = new ChatMessage({user: req.body.user, body: req.body.body});
				message.save().then(newMessage => {
					Subscription.find().then(subscriptions => subscriptions.map(subs => {
						sendMsgs(message, subs);
					}));
						res.status(201).json(newMessage);
					}).catch(e =>  {
					res.status(500).json({error: e.message})
				});
			}

	}catch (e) {
		res.status(500).json({error: e.message});
	}
}

exports.receiveOne = (req,res) => {

	try{
		if(req.body.body) {
			const message = new ChatMessage({user: req.body.user, body: req.body.body});
			message.save().then(newMessage => res.status(201).json(newMessage));
		}
	}catch (e) {
			res.status(500).json({error: e.message});
		}
}

exports.deleteOne = (req, res) => {
	ChatMessage.deleteOne({_id: req.params.id}).then(() => res.status(204)).catch(e => res.status(500).json({error: e.message}));

}

const sendMsgs = (message,sub) => {
	const postData = JSON.stringify({
		user: message.user,
		body: message.body,
	});
	const url = sub.url.replace("https://", '');
	const rreq = https.request({
		hostname: url,
		port: 443,
		path: '/message/',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': Buffer.byteLength(postData)
		},
		method: 'POST',

	});
	rreq.on('error', (e) => {
		console.error(`problem with request: ${e.message}`);
	});
	rreq.write(postData);
	rreq.end();
}

