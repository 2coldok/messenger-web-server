import JWT from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication 에러에용' };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer'))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];

  JWT.verify(token, 'fvkdfskmlhntkgkj3fnj8', async (error, decode) => {
    if (error) {
      return res.status(401).json({ message: 'auth1 에러'});
    }

    // 생략가능 이미 JWT 토큰 자체로 유효성 검사를 완료하였기 때문
    const user = await userRepository.findById(decode.id);
    if (!user) {
      return res.status(401).json({ message: 'auth2 에러'});
    }
    
    req.userId = user.userId;
    req.token = token;
    next();
  });
}