import Mongoose from 'mongoose';
import { useVirtualId } from '../database/database.js';
import * as userRepository from './auth.js';

const tweetSchema = new Mongoose.Schema({
  text: { type: String, required: true },
  // createdAt: { type: String, required: true },
  user: { type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},{ timestamps: true });

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

// let tweets = [
//   {
//     tweetId: '1004',
//     text: '몽상가 이찬웅',
//     createdAt: new Date().toString(),
//     userId: '1',
//   },
//   {
//     tweetId: '1253',
//     text: '애니츠 첫번째 남자 젠더락 스트라이커',
//     createdAt: new Date().toString(),
//     userId: '2',
//   },
//   {
//     tweetId: '7979',
//     text: '로스트아크 유일한 칼잡이 버서커',
//     createdAt: new Date().toString(),
//     userId: '3',
//   }
// ];

// export async function all() {
//   return Promise.all(tweets.map(async (tweet) => {
//     const { username, name, url } = await userRepository.findById(tweet.userId);

//     return { ...tweet, username, name, url };
//   }))
// }

export async function all() {
  const tweets = await Tweet.find().populate('user', 'username name url').exec();
  
  return tweets;
}

// export async function findByUsername(username) {
//   return all().then((tweets) => tweets.filter((tweet) => tweet.username === username));
// }

export async function findByUsername(username) {
  // return all().then((tweets) => tweets.filter((tweet) => tweet.user.username === username));
  const tweets = await Tweet.find().populate({
    path: 'user',
    match: { username: username },
    select: 'username name url',
  })
  .exec();

  // poppulate에서 match 조건을 통해 필터링시 못찾으면 단순히 해당 필드를 user: null 로 한다.
  // 따라서 null check를 꼭 해줘야 한다.
  const filteredTweets = tweets.filter(tweet => tweet.user !== null);

  return filteredTweets;
}

// export async function findById(tweetId) {
//   const found = tweets.find((tweet) => tweet.tweetId === tweetId);
//   if (!found) {
//     return null;
//   }

//   const { username, name, url } = await userRepository.findById(found.userId);
//   return { ...found, username, name, url };
// }

export async function findById(tweetId) {
  return Tweet.findById(tweetId).populate('user', 'username name url').exec();
}

// export async function create(text, userId) {
//    const tweet = {
//     tweetId: Date.now().toString(),
//     text,
//     createdAt: new Date().toString(),
//     userId,
//   };
//   tweets = [tweet, ...tweets];

//   return findById(tweet.tweetId);
// }

export async function create(text, userId) {
  const tweet = await new Tweet({
    text,
    user: new Mongoose.Types.ObjectId(`${userId}`),
  }).save();

  const populatedTweet = await Tweet.findById(tweet.id).populate('user', 'username name url').exec();

  return populatedTweet;
}

// export async function update(tweetId, text) {
//   const tweet = tweets.find((tweet) => tweet.tweetId === tweetId);
//   if (tweet) {
//     tweet.text = text;
//   }
  
//   return findById(tweet.tweetId);
// }

export async function update(tweetId, text) {
  return Tweet.findByIdAndUpdate(tweetId, { text: text }, { returnOriginal: false });
}

// export async function remove(tweetId) {
//   tweets = tweets.filter((tweet) => tweet.tweetId !== tweetId);
// }

export async function remove(tweetId) {
    const a = await Tweet.findByIdAndDelete(tweetId);
}