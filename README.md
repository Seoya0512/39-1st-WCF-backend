# 👕 위코드가 사랑하는 패션, WCF

1. [프로젝트 소개](#about-🎯)
2. [프로젝트 회고](#review-📚)
3. [기억하고 싶은 CODE](#code-⚒️)
4. [리팩토링 진행 중](#refactoring-💡)

<br>

## ABOUT 🎯

SSF SHOP을 모티브로한 의류 소개 사이트 개발

### 담당 API

- 회원가입 및 로그인
- 상품 조회 (중복 필터링 및 분류)
- 상품 정보 상세 조회

<br>

## REVIEW 📚

프로젝트 개요 및 Sprint별 상세 회고는 `Velog`에 작성해 뒀습니다. 또한, 최종 프로젝트 결과물은 `프로젝트 시연 영상`에서 확인할 수 있습니다.

1. [Sprint1 회고](https://velog.io/@seoya_lee/%ED%9A%8C%EA%B3%A0%EB%A1%9D09-1%EC%B0%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%9A%8C%EA%B3%A0%EB%A1%9D-SSF-SHOP)

2. [Sprint 2 회고](https://velog.io/@seoya_lee/Project-01-WCF-SHOP-Sprint-2-%ED%9A%8C%EA%B3%A0)

3. [프로젝트 시연 영상](https://youtu.be/Tcn1qPpOgQY)

<br>
<br>

## CODE ⚒️

이번 프로젝트에서 크게 두 가지 파트를 기억하고 싶다.

### 1. 에러 핸들링의 모듈화 👾

각 레이어에서 발생하는 에러/예외 처리를 위해 매번 에러를 throw하는 코드를 작성했었다. 이는 가독성과 코드 중복이라는 비효율성을 증대했고, `raiseCustomError`라는 모듈화를 통해 각 필요에 맞게 에러를 호출 할 수 있었다.

```jsx
// utils.error.js
const raiseCustomError = (message, statusCode) => {
	const err = new Error(message);
	err.statusCode = statusCode;
	throw err;
  };


// services/userServices.js

const { raiseCustomError } = require("../utils/error");

const signIn = async (username, password, res) => {
  validateUsername(username);
  validatePw(password);

  const user = await userDao.getUserByUsername(username);

  const is_match = await bcrypt.compare(password, user.password);

  if (!is_match) {
    return raiseCustomError("INVALID USER", 401);
  }
...

}
```

<br>

### 2. 상품 리스트 중복 필터링 및 분류 👚

이번 프로젝트를 진행하면서 가장 많은 시간을 할애 했던 부분이었다. 또한 기능을 계속 고도화 하기 위해 많은 고민을 했었다.

<br>

#### 2-1. 상품리스트 분류 Object로 한 번에 해결하기

처음 기능을 구현할 때, `switch-case` 를 사용해서 분류 경우를 작성했다. if문을 사용하지 않았다는 것에 만족감을 느꼈던 코드였다.

```jsx
const orderSet = (value) => {
  switch (value) {
    case "price_DESC":
      return `price DESC`;
    case "price_ASC":
      return `price ASC`;
    case "created_at":
      return `created_at DESC`;
    default:
      return `created_at DESC`;
  }
};
```

하지만, 멘토님께 코드 리뷰를 받으며 객체를 사용해서 코드를 더 간결하게 작성할 수 있다는 조언을 들었다. 실제로 Object의 key-value 값을 활용했더니 9줄의 코드를 3줄로 간결하게 작성할 수 있었다.

```jsx
//productQueryBuilder.js
const orderSet = {
  price_DESC: "price DESC",
  price_ASC: "price ASC",
  created_at: "created_at DESC",
};
```

`앞으로 Object 를 잘 활용해 봐야겠다!`

<br>

#### 2-2. 다중 필터링에 대한 고민을 한 번에 해결한, 나머지 매개변수

클라이언트(FE)에게 필터링과 분류 방법을 `query param`으로 요청을 받기로 했다. 이때, 나의 고민은 `필터링 방법이 몇개가 요청될지 모르는데 어떻게 처리해야 하는걸까?` 고민 했었다. 이 문제를 해결해준 아주 간단한 방법이 있었다.

```jsx
// productDao.js
const getProductList = async (params) => {
  const {
    sortMethod = "created_at",
    ...filterOptions
  } = params;

  const whereClause = makeProductQueryBuilders(filterOptions);
  const orderbyClause = orderSet[sortMethod];
  ...
}
```

params로 받아온 변수를 `나머지 매개변수`와 `객체 구조 분해 할당`을 사용해 단일 및 다중 필터링 요청을 처리할 수 있었다.

1. `sortMethod = "created_at"` : default 값을 지정, 변수가 있을 경우 수정됨
2. `...filterOptions`는 나머지 변수들을 모두 filterOptions으로 지정된다. 이를 통해 1개의 필터링 조건이 들어오든 여러 개가 들어오든 자유자재로 처리할 수 있게 됐다.

<br>
<br>

## Refactoring 💡

타입스크립트를 공부하며 리팩토링 작업을 진행 중이며, 이후 계획들에 맞춰 변경할 예정입니다.

1. `TypeScript` 로 변환하기 (진행 중)
2. ORM을 사용해서 SQL Injection 강화하기 (계획)
3. `Nest.js` 프레임 워크 사용하기 (최종)
