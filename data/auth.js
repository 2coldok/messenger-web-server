let users = [
  {
    id: '1',
    username: '노랑초코송이',
    password: 'yellow93',
    name: 'Lee Chanwoong',
    email: "lcw@gmail.com",
    url: "https://www.google.com",
  },
  {
    id: '2',
    username: '포카리스웨트',
    password: 'kshbabo123',
    name: 'Kim Yeonhee',
    email: 'kyh@naver.com',
    url: 'https://www.google.com',
  },
  {
    id: '3',
    username: '새우깡매운맛',
    password: '$2b$12$XmGDp8XlvKRDiw4w1UOXK.jCVmaGs5A6v9qpLs4JEzukQyiTlB0Mq',
    name: 'Han Byunghak',
    email: 'hbh@naver.com',
    url: 'https://www.google.com',
  }
];

export async function findByUserName(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);

  return created.id;
}

