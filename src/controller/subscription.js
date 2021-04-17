const {Subscription} = require('../mongo/index');

//GET ALL
exports.index = (req, res) => {
	Subscription.find().then(subs => {
		res.status(200).json(subs);
	}).catch(e => {
		res.status(500).json({error: e.message});
	});
};

exports.getOne = (req, res) => {
	Subscription.findById(req.params.id).then(subs => {
		res.status(200).json(subs);
	}).catch(e => {
		res.status(500).json({error: e.message});
	})
};

exports.createOne = (req, res) => {
	console.log(req.body);
	const subscription = new Subscription({url: req.body.url, userName: req.body.userName});

	subscription.save().then(newSubs => {
		res.status(200).json(newSubs);
	}).catch(e =>  {
		res.status(500).json({error: e.message})
	});

}


exports.deleteOne = (req, res) => {
	Subscription.deleteOne({_id: req.params.id}).then(result => res.status(204)).catch(e => res.status(500).json({error: e.message}));
}
