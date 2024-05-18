// 기본 import 세팅
import express from 'express';
import cors from "cors";
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';

// Router
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';

const app = express();

// 미들웨어 세팅
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173'],
}));
app.use(morgan('tiny'));

// 라우터 세팅
app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);

// 정의되지 않은 api에 대한 처리
app.use((req, res, next) => {
  res.sendStatus(404);
});

// 서버 오류에 대한 처리
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);