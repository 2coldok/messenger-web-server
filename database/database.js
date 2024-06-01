import { MongoClient } from 'mongodb';
import { config } from '../config.js';

const client = new MongoClient(config.db.host);

export async function connectDB() {
  try {
    const connectedClient = await client.connect();
    console.log('MongoDB 연결 성공');

    return connectedClient.db();
  } catch (error) {
    console.log(`MongoDB 연결 실패 : ${error}`);
  }
}
