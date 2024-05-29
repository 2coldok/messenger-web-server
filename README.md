## 공통 적용
공통: 클라이언트에서 정의되지 않은 API 요청시: 404, body: { message: `정의 되지 않은 api 요청입니다.` } 반환   
공통: 서버 코드 내에서 오류시: 500, body: { message: `서버 오류` } 반환   
   
   
## 인증(isAuth)
미들웨어.   
해더에 담긴 token을 채취해, 서버가 발행한 유효한 토큰을 가지고 있는지 확인한다.   
3단계의 유효성 검사를 거친다.   
```zsh
401, { message: `인증 오류: 해더에 Authorization이 존재하지 않거나 해더 내용이 Bearer로 시작하지 않음` }   
401, { message: `인증 오류: 유효하지 않은 토큰임` }   
401, { message: `인증 오류: db에 토큰 소유자의 userId가 존재하지 않음` }   
```
토큰에서 userId를 췌취해서 토큰과 함께 req에 실어서 next() 함.   
req.userId = user.userId;   
req.token = token;   


## [GET /tweets] router.get("/", tweetController.getTweets);
- 성공   
모든 트윗들을 반환하거나,      
tweets?username=:username 으로 쿼리로 username을 전달시 username의 트윗들을 반환한다.(200)   
- 실패 1   
트윗이 db에 존재하지 않을경우 또는 username에 해당하는 트윗들이 존재하지 않을 경우,   
404, body: { message: `Tweets 가 존재하지 않습니다.` } 를 반환한다.   
   
   
## [GET /tweets/:id] router.get("/:id", isAuth, tweetController.getTweet);
- 성공   
param에 담긴 트윗아이디에 해당하는 트윗을 반환한다.(200)   
- 실패 1   
`isAuth`   
- 실패 2   
db에 해당 트윗 id가 존재하지 않을 경우   
404, body: { message: `유호하지 않은 Tweet Id 입니다.` }   
   
      
## [PUT /tweets/:id] router.put("/:id", isAuth, validateTweet, tweetController.updateTweet);   
- 성공   
트윗 수정자가 해당 트윗에 대한 권한을 가지고 있다면, req.params.id 그리고 req.body.text 을 통해   
해당 tweet id의 text를 수정한다. 이후 tweet관련 구체적인 정보를 반환한다.(200)   
이는 Tweet 데이터에 username, name, url 정보를 추가하여 구성되었다.   
```zsh
{   
  tweetId: '7979',   
  text: '수정된 텍스트 내용..',   
  createdAt: '발행날짜'    
  userId: '3',    
  username: '한량'   
  name: '홍길동'   
  url: 'https:// ....'     
}    
```
- 실패 1   
`isAuth`   
- 실패 2   
validateTweet   
수정하려는 tweet text의 글자수 3글자 이상이 아니라면,   
400, body: { message: `text는 최소 3글자 이상 작성해주세요.` }    
- 실패 3   
req.params.id를 통해 기존의 해당 트윗 데이터를 불러오는데 실패하면   
404, { message: `존재하지 않는 Tweet Id 입니다.` }    
isAuth 미들웨어로 부터 생성된 req.userId를 통해 수정하려는 tweet의 userId 동일하지 않다면,
{ message: `Tweet의 작성자가 아닙니다.` }

    
    
## [POST /tweets] router.post("/", isAuth, validateTweet, tweetController.createTweet);
- 성공    
const { text, userId } = req.body 를 통해 Tweet 데이터를 생성하여 추가하고, 이후 tweet관련 구체적인 정보를 반환한다.(201)    
이는 Tweet 데이터에 username, name, url 정보를 추가하여 구성되었다.    
```zsh
{
  tweetId: '새로 생성된 트윗 아이디',
  text: '새로 만든 내용',
  createdAt: '발행날짜'
  userId: '3',
  username: '한량'
  name: '홍길동'
  url: 'https:// ....'
}
```
- 실패 1    
`isAuth`    
- 실패 2    
validateTweet     
새로 추가하려는 tweet text의 글자수 3글자 이상이 아니라면,     
400, body: { message: `text는 최소 3글자 이상 작성해주세요.` }      
     
      
## [DELETE /tweets/:id] router.delete("/:id", isAuth, tweetController.deleteTweet);
- 성공    
트윗 삭제 시도자가 해당 트윗에 대한 권한을 가지고 있다면, tweetId = req.params.id 를 통해 해당 트윗을 삭제한다.    
아무것도 반환하지 않는다.(204)    
- 실패 1    
`isAuth`    
- 실패 2   
req.params.id를 통해 트윗 데이터를 불러오는데 실패하면
{ message: `존재하지 않는 Tweet Id 입니다.` }
isAuth 미들웨어로 부터 생성된 req.userId를 통해 삭제하려는 tweet의 userId 동일하지 않다면,   
{ message: `Tweet의 작성자가 아닙니다.` }   
     
     
## [POST /auth/signup] router.post('/signup', validateSignup, authController.signup);    
- 성공    
const { username, password, name, email, url } = req.body; 를 통해    
비밀번호는 암호화 해서 db에 저장하고 생성한 고유한 userId를 통해 새로운 토큰을 생성한다.     
body: { token, username } 를 반환한다.(201)    
- 실패 1    
```zsh
validateSignup     
{ message: `username 는 6글자 이상이어야 합니다.` }
{ message: `password 는 5글자 이상이어야 합니다.` }
{ message: `name 이 없습니다` }
{ message: `올바른 email형식이 아닙니다` }
{ message: `유효하지 않은 URL입니다.` }
```
- 실패 2     
409, { message: `${username} 라는 username이 이미 존재합니다` }     
     
      
## [POST /auth/login] router.post('/login', validateCredential, authController.login);
- 성공     
const { username, password } = req.body; 을 통해     
username을 통해 해당 user data를 가져온다. bcrypt compare를 통해 password가 일치하는지 확인한다.     
userId를 통해 새로운 토큰을 생성한다.    
{ token, username } 을 반환한다.(200)    
- 실패 1
```zsh
validateCredential     
{ message: `username 는 6글자 이상이어야 합니다.` }
{ message: `password 는 5글자 이상이어야 합니다.` }
```
- 실패 2
```zsh
{ message: `username이 db에 없어요` }
{ message: `비밀번호가 틀렸어요` }
```


## [GET /auth/me] router.get('/me', isAuth, authController.me);
- 성공    
미들웨어 isAuth에 의해 추가된 token과 userId를 통해    
body: { token: req.token, username: user.username } (200) 을 반환한다.    
sinup, login 과정과는 다르게 새로운 토큰을 생성하지 않고,    
클라이언트가 기존에 보유하고 있는 토큰을 그대로 다시 반환해준다.    
- 실패 1    
`isAuth`    
