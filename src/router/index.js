const { subscriptionController, messageController} = require('../controller');
const express = require('express');

const appRouter = express.Router();

const subscriptionRouter = express.Router();

subscriptionRouter.get('/', subscriptionController.index);
subscriptionRouter.get('/:id', subscriptionController.getOne);
subscriptionRouter.post('/', subscriptionController.createOne);
subscriptionRouter.delete('/:id', subscriptionController.deleteOne);

appRouter.use('/member', subscriptionRouter);

const messageRouter = express.Router();

messageRouter.get('/', messageController.index);
messageRouter.post('/', messageController.createOne);
messageRouter.post('/receiveMessage', messageController.receiveOne);
messageRouter.delete('/:id', messageController.deleteOne);

appRouter.use('/message', messageRouter);

module.exports = appRouter;
