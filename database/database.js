import Mongoose from 'mongoose';
import { config } from '../config.js';

export async function connectDB() {
  return Mongoose.connect(config.db.host);
}

export function useVirtualId(schema) {
  schema.virtual('id').get(function() {
    return this._id.toString();
  });

  const transform = (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  };
  
  schema.set('toJSON', { virtuals: true, transform });
  schema.set('toObject', { virtuals: true, transform });
}

let db;
// users collection 
export function getUsers() {
  return db.collection('users');
}

// tweets collection
export function getTweets() {
  return db.collection('tweets');
}
