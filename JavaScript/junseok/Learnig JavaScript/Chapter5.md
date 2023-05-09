# 표현식과 연산자
- 표현식은 대부분 연산자 표현식이다. 즉 , 곱셈 표현식은 곱셈 연산자와 피연선자 두 개로 이루어진다.
- 피연산자는 서로 곱하는 두 숫자이며 피연산자 자체도 표현식이다.
- 연잔사 표현식이 아닌 표현식에는 식별자 표현식과 리터럴 표현식 두 가지가 잇다.

# 연산자
## 산술 연산자
+ +, -, /, *, %(나머지), ++(전위 증가, 후위 증가), -- (전위 감소, 후위 감소
+ 전위 연산자
  + 먼저 변수의 값을 바꾼 다음에 평가
+ 후위 연산자
  + 값을 바꾸기 전에 평가

## 연산자 우선순위
- 기초 수학과 같음

## 비교 연산자
- ===
- ==
- !==
- !=
- >=, >, <, <=
  
## 논리 연산자
- ture, false
- 자바스크립트에서 거짓과 같은 값
  - undefined, null, false, 0, NaN, ''(빈 문자열)

## AND, OR, NOT
- &&, ||, !

## 해체 할당
```javascript
// 객체 선언
const obj = { b: 2, c: 3, d: 4}

//해체 할당
const {a, b, c} = obj;

a; //undefined a property x
b; // 2
c; // 3 
d; // ReferenceError d 정의 x
```

- 할당, 산술, 비교, 불리언 연산자는 가장 널리 쓰이는 연산자. 