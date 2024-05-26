import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
}

// res.status(400).json({ message: errors.array() }) 의 생김새는 다음과 같다
// "message": [
//   {
//       "type": "field",
//       "value": "메세",
//       "msg": "text는 최소 3글자 이상",
//       "path": "text",
//       "location": "body"
//   }
// ]