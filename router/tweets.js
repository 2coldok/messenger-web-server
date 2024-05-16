import 'express-async-errors';
import express from 'express';
import * as tweetController from '../controller/tweet.js';

const router = express.Router();

// GET /tweets : 모든 tweet들을 반환한다.
// GET /tweets?username=:username : username에 해당하는 tweet들을 반환한다.
router.get('/', tweetController.getTweets);

// GET /tweets/:id
router.get('/:id', tweetController.getTweet);

// POST /tweets
router.post('/', tweetController.createTweet);

// PUT /tweets/:id
router.put('/:id', tweetController.updateTweet);

// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet);

export default router;
