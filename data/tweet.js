let tweets = [
  {
    id: '1',
    text: '몽상가 이찬웅',
    createdAt: new Date().toString(),
    name: '이찬웅',
    username: '나비',
    url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
  },
  {
    id: '2',
    text: '애니츠 첫번째 남자 젠더락 스트라이커',
    createdAt: new Date().toString(),
    name: '한병학',
    username: '호랑나비',
  },
  {
    id: '3',
    text: '로스트아크 유일한 칼잡이 버서커',
    createdAt: new Date().toString(),
    name: '최병학',
    username: '칼나비',
  }
];

export async function all() {
  return tweets;
}

export async function findByUsername(username) {
  return tweets.filter((tweet) => tweet.username === username);
}

export async function findById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

export async function create(text, name, username) {
   const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  tweets = [tweet, ...tweets];

  return tweet;
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  
  return tweet;
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
