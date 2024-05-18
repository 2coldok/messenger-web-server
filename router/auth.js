import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';

const router = express.Router();

const validateCredential = [
  body('username')
    .trim()
    .notEmpty()
    .isLength({ min: 6 })
    .withMessage('username 는 6글자 이상이어야 합니다.'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password 는 5글자 이상이어야 합니다.'),
  validate  
];

const validateSignup = [
  ...validateCredential,
  body('name').notEmpty().withMessage('name 이 없습니다'),
  body('email').isEmail().normalizeEmail().withMessage('올바른 email형식이 아닙니다'),
  body('url')
    .isURL()
    .withMessage('유효하지 않은 URL입니다.')
    .optional({ values: 'null'}),
  validate
];

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

export default router;
