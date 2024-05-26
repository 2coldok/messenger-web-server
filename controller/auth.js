import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import * as userRepository from '../data/auth.js'

// Todo
const jwtSecretKey = 'fvkdfskmlhntkgkj3fnj8';
const jwtExpiresInDays = '2d'; // 숫자부여시 초단위, 2d(이틀) 부여할려고 할 시 문자열로 전달 '2d'
const bcryptSaltRounds = 12;

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUserName(username);
  if (found) {
    return res.status(409).json({ message: `${username} 라는 username이 이미 존재합니다` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJwtToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUserName(username);
  if (!user) {
    return res.status(401).json({ message: 'username이 db에 없어요' });
  }
  
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: '비밀번호가 틀렸어요' });
  }

  const token = createJwtToken(user.userId);
  res.status(200).json({ token, username });
}
 
export async function me(req, res ) {
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json({ token: req.token, username: user.username });
}

function createJwtToken(id) {
  return JWT.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}
