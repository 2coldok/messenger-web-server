import { MongoClient } from 'mongodb';
import { config } from '../config.js';

const client = new MongoClient(config.db.host);
let db;

export async function connectDB() {
  try {
    const connectedClient = await client.connect();
    console.log('MongoDB 연결 성공');
    db = connectedClient.db();

  } catch (error) {
    console.log(`MongoDB 연결 실패 : ${error}`);
  }
}

// users collection 
export function getUsers() {
  return db.collection('users');
}

// tweets collection
export function getTweets() {
  return db.collection('tweets');
}
