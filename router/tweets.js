import "express-async-errors";
import express from "express";
import * as tweetController from "../controller/tweet.js";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";

const router = express.Router();

const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 3 })
    .withMessage("text는 최소 3글자 이상"),
  validate,  
];

// GET /tweets : 모든 tweet들을 반환한다.
// GET /tweets?username=:username : username에 해당하는 tweet들을 반환한다.
router.get("/", tweetController.getTweets);

// GET /tweets/:id
router.get("/:id", tweetController.getTweet);

// POST /tweets
router.post("/", validateTweet, tweetController.createTweet);

// PUT /tweets/:id
router.put("/:id", validateTweet, tweetController.updateTweet);

// DELETE /tweets/:id
router.delete("/:id", tweetController.deleteTweet);

export default router;
