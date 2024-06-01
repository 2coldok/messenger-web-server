import { getUsers } from "../database/database.js";
import MongoDb from 'mongodb';

const ObjectId = MongoDb.ObjectId;
// let users = [
//   {
//     userId: '1',
//     username: '노랑초코송이',
//     password: 'yellow93',
//     name: 'Lee Chanwoong',
//     email: "lcw@gmail.com",
//     url: "https://www.google.com",
//   },
//   {
//     userId: '2',
//     username: '포카리스웨트',
//     password: 'kshbabo123',
//     name: 'Kim Yeonhee',
//     email: 'kyh@naver.com',
//     url: 'https://www.google.com',
//   },
//   {
//     userId: '3',
//     username: '새우깡매운맛',
//     password: '$2b$12$BhGAuNuhzfcLvwMLeObcuea1H3SmQodHaRrlpGOaBBDwbgyQEGTXK',
//     name: 'Han Byunghak',
//     email: 'hbh@naver.com',
//     url: 'https://www.google.com',
//   }
// ];
// 새우깡매운맛 의 비밀번호 : black123

// export async function findByUserName(username) {
//   return users.find((user) => user.username === username);
// }

export async function findByUserName(username) {
  return getUsers().findOne({ username: username }).then((data) => {
    return mapOptionalUser(data);
  })
}

// export async function findById(userId) {
//   return users.find((user) => user.userId === userId);
// }

export async function findById(userId) {
  console.log(userId);
  return getUsers().findOne({ _id: new ObjectId(`${userId}`) }).then((data) => {
    return mapOptionalUser(data);
  })
}

// export async function createUser(user) {
//   const created = { ...user, userId: Date.now().toString() };
//   users.push(created);

//   return created.userId;
// }

export async function createUser(user) {
  return getUsers().insertOne(user).then((data) => data.insertedId.toString());
}

function mapOptionalUser(user) {
  return user ? { ...user, userId: user._id } : user;
}