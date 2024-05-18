let users = [
  {
    id: '1',
    username: '초코송이',
    password: '12345',
    name: 'Lee Chanwoong',
    email: "lcw@gmail.com",
    url: "https://www.google.com",
  }
];

export async function findByUserName(username) {
  return users.find((user) => user.username === username);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);

  console.log(users);

  return created.id;
}

