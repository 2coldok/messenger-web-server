import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await(username 
    ? tweetRepository.findByUsername(username)
    : tweetRepository.all());
  
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Tweets 가 존재하지 않습니다.` });
  }
}

export async function getTweet(req, res) {
  const tweetId = req.params.id;
  const tweet = await tweetRepository.findById(tweetId);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `유호하지 않은 Tweet Id 입니다.` });
  }
}

export async function createTweet(req, res) {
  const { text, userId } = req.body;
  const tweet = await tweetRepository.create(text, userId);

  res.status(201).json(tweet);
}

export async function updateTweet(req, res) {
  const tweetId = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.update(tweetId, text);
  
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `존재하지 않는 Tweet Id 입니다.` });
  }
}

export async function deleteTweet(req, res) {
  const tweetId = req.params.id;
  await tweetRepository.remove(tweetId);

  res.sendStatus(204);
}
