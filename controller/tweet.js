import * as tweetRepository from '../data/tweet.js';

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await(username 
    ? tweetRepository.findByUsername(username)
    : tweetRepository.all());

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Tweets Not Found` });
  }
}

export async function getTweet(req, res) {
  const id = req.params.id;
  const tweet = await tweetRepository.findById(id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet Id Not Found` });
  }
}

export async function createTweet(req, res) {
  const { text, name, username } = req.body;
  const tweet = await tweetRepository.create(text, name, username);

  res.status(201).json(tweet);
}

export async function updateTweet(req, res) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.update(id, text);
  
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet Id Not Found` });
  }
}

export async function deleteTweet(req, res) {
  const id = req.params.id;
  await tweetRepository.remove(id);

  res.sendStatus(204);
}
