import JWT from 'jsonwebtoken';
import * as userRepository from '../data/auth.js';

// const AUTH_ERROR = { message: 'Authentication 에러에용' };

export const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer'))) {
    return res.status(401).json({ message: '인증 오류: 해더에 Authorization이 존재하지 않거나 해더 내용이 Bearer로 시작하지 않음' });
  }

  const token = authHeader.split(' ')[1];

  JWT.verify(token, 'fvkdfskmlhntkgkj3fnj8', async (error, decode) => {
    if (error) {
      return res.status(401).json({ message: '인증 오류: 유효하지 않은 토큰임'});
    }

    // 생략가능. 이미 JWT 토큰 자체로 유효성 검사를 완료하였기 때문
    const user = await userRepository.findById(decode.userId);
    if (!user) {
      return res.status(401).json({ message: '인증 오류: db에 토큰 소유자의 userId가 존재하지 않음'});
    }
    
    req.userId = user.userId;
    req.token = token;
    next();
  });
}

// userId로 토큰을 생성하며, deocde의 형태는 다음과 같음
// { userId: '1004', iat: 1716642790 }