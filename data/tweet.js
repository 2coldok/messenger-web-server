import * as userRepository from './auth.js';

let tweets = [
  {
    tweetId: '1004',
    text: '몽상가 이찬웅',
    createdAt: new Date().toString(),
    userId: '1',
  },
  {
    tweetId: '1253',
    text: '애니츠 첫번째 남자 젠더락 스트라이커',
    createdAt: new Date().toString(),
    userId: '2',
  },
  {
    tweetId: '7979',
    text: '로스트아크 유일한 칼잡이 버서커',
    createdAt: new Date().toString(),
    userId: '3',
  }
];

export async function all() {
  return Promise.all(tweets.map(async (tweet) => {
    const { username, name, url } = await userRepository.findById(tweet.userId);

    return { ...tweet, username, name, url };
  }))
}

export async function findByUsername(username) {
  return all().then((tweets) => tweets.filter((tweet) => tweet.username === username));
}

export async function findById(tweetId) {
  const found = tweets.find((tweet) => tweet.tweetId === tweetId);
  if (!found) {
    return null;
  }

  const { username, name, url } = await userRepository.findById(found.userId);
  return { ...found, username, name, url };
}

export async function create(text, userId) {
   const tweet = {
    tweetId: Date.now().toString(),
    text,
    createdAt: new Date().toString(),
    userId,
  };
  tweets = [tweet, ...tweets];

  return findById(tweet.tweetId);
}

export async function update(tweetId, text) {
  const tweet = tweets.find((tweet) => tweet.tweetId === tweetId);
  if (tweet) {
    tweet.text = text;
  }
  
  return findById(tweet.tweetId);
}

export async function remove(tweetId) {
  tweets = tweets.filter((tweet) => tweet.tweetId !== tweetId);
}
