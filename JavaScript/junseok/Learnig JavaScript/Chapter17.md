# 정규표현식

## 정규식만들기
- 자바스크립트의 정규식은 RegExp 클래스이다. 
- 특수한 경우를 제외하면 더 간편한 리터럴 문법을 사용하면 된다.
- 리터럴 표기법의 매개변수는 두 빗금으로 감싸야 하며 따옴표를 사용하지 않는다.
- 생성자 함수의 매개변수는 빗금으로 감싸지 않으나 따옴표를 사용한다
```javascript
/ab+c/i
new RegExp(/ab+c/, 'i') // 리터럴
new RegExp('ab+c', 'i') // 생성자
```