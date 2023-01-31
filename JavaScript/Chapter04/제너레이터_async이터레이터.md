### 제너레이터

- 일반 함수는 하나의 값(혹은 0개의 값) 만을 반환한다.
- 제너레이터를 사용하면 여러 개의 값을 필요에 따라 하나씩 반환(yield) 할 수 있다.

### 제너레이터 함수

- function\*

```Javascript
function* generateSequence() {
    yield 2;
    yield 1;
    yield 3;
}
```

- 제너레이터 함수는 일반 함수와 동작 방식이 다르다. 제너레이터 함수를 호출하면 코드가 실행되지 않고, 대신 실행을 처리하는 특별한 객체, '제너레이터 객체' 가 반환된다.

```Javascript
function* generateSequence() {
    yield 1;
    yield 2;
    return 3;
}

// 제너레이터 함수는 제너레이트 객체를 생성한다.
let generator = generateSequence();
alert(generator); // [object Generator]
```

- next()
  - 제너레이터의 주요 메서드이다. next()를 호출하면 가장 가까운 yield <value> 문을 만날 때까지 실행이 지속된다.
  - 이후 yield <value>문을 만나면 실행이 멈추고 산출하고자 하는 값인 value 가 바깥코드에 반환된다.
  - value: 산출 값
  - done: 함수 코드 실행이 끝났으면 true, 아니라면 false

```Javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

let one = generator.next();

alert(JSON.stringify(one)); // {value: 1, done: false}

/////////////////////////////////////////////////////////////
// generator.next() 다시 호출
let two = generator.next();

alert(JSON.stringify(two)); // {value: 2, done: false}
//실행이 재개 되고 다음 yield 반환

/////////////////////////////////////////////////////////////////
// 또 호출하면 return 문에 다다르고 함수가 종료된다.
let three = generator.next();

alert(JSON.stringify(three)); // {value: 3, done: true}

```

- 처음엔 첫번째 값만 받았으므로 함수 실행은 두 번째 줄에서 멈췄다.
- 제너레이터가 종료되었기 때문에 현재 상태에선 generator.next()를 암만 호출해도 소용 없다. 암만 호출해도 {done: true}가 반환될 것이다.

### 제너레이터와 이터러블

```Javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3; // yield 3; 하면 3까지 출력된다.
}

let generator = generateSequence();

for(let value of generator) {
  alert(value); // 1, 2가 출력됨
}

```

- 위 예시를 실행하면 1과 2만 출력되고 3은 출력이 되지 않는다.
- 이유는 for..of 이터레이션이 done:true 일 때 마지막 value를 무시하기 때문이다. 그러므로 for..of을 사용했을 때 모든 값이 출력되길 원한다면 return -> yield로 값을 반환해야 한다.
- 제너레이터에도 전개문법(...) 관련 기능 사용 가능

### 이터러블 대신 제너레이터 사용

```Javascript
let range = {
  from: 1,
  to: 5,

  // for..of 최초 호출 시, Symbol.iterator가 호출됩니다.
  [Symbol.iterator]() {
    // Symbol.iterator는 이터레이터 객체를 반환합니다.
    // for..of는 반환된 이터레이터 객체만을 대상으로 동작하는데, 이때 다음 값도 정해집니다.
    return {
      current: this.from,
      last: this.to,

      // for..of 반복문에 의해 각 이터레이션마다 next()가 호출됩니다.
      next() {
        // next()는 객체 형태의 값, {done:.., value :...}을 반환해야 합니다.
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

// 객체 range를 대상으로 하는 이터레이션은 range.from과 range.to 사이의 숫자를 출력합니다.
alert([...range]); // 1,2,3,4,5

//////////////////////////////////////////////////////////////////////
let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // [Symbol.iterator]: function*()를 짧게 줄임
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

alert( [...range] ); // 1, 2, 3, 4, 5

```

- Symbol.iterator 대신 제너레이터 함수를 사용하면 , 제너레이터 함수로 반복이 가능하다.
- .next()메서드가 없음
- 반환 값의 형태는 {value: ..., done: true/false} 이어야함.
- 이렇게 이터러블 객체 대신 제너레이터를 사용할 수 있는 것은 우연이 아니다. 이터레이터를 어떻게 하면 쉽게 구현할지를 염두에 두며 자바스크립트에 추가되었다.
- 제너레이터는 무한한 값을 만들 수도 있다.

### 제너레이터 컴포지션

- 제너레이터 안에 제너레이터를 임베딩 할 수 있게 해주는 제너레이터의 특별 기능이다.

```Javascript
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
```

- 먼저 연속된 숫자를 생성하는 제너레이터 함수 만듦.
- 이 함수를 기반으로 좀 더 복잡한 값을 연속해서 생성하는 함수를 만들자.

  - 처음엔 숫자 0부터 9까지 생성 (문자코드 48부터 57까지)
  - 이어서 알파벳 대문자 A 부터 Z 까지를 생성한다.( 문자코드 65부터 90까지)
  - 이어서 알파벳 소문자 a 부터 z 까지 생성 (문자코드 97부터 122까지)

- 일반 함수로는 여러 개의 함수를 만들고 그 호출 결과를 어딘가에 저장한 후 다시 그 결과들을 조합해야 원하는 기능을 구현할 수 있다.
- 하지만 제너레이터의 특수문법 yield\*을 사용하면 제너레이터를 다른 제너레이터에 끼워넣을 수 있다.

```Javascript
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z

////////////////////////////////////////////////////////
function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;

}

let str = '';

for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z



```

- yield* 지시자는 실행을 다른 제너레이터에 위임한다. 여기서 위임은 yield* gen 이 제너레이터 gen을 대상으로 반복을 수행하고, 산출 값들을 바깥으로 전달하는 것을 의미한다.
- 중첩 제너레이터의 코드를 직접 써줘도 결과는 같다.

- 제너레이터 컴포지션을 사용하면 한 제너레이터의 흐름을 자연스럽게 다른 제너레이터에 삽입할 수 있다. 제너레이터 컴포지션을 사용하면 중간 결과 저장 용도의 추가 메모리가 필요하지 않다.
