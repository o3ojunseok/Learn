## 중첩함수

- 함수 내부에서 선언한 함수는 중첩 함수라고 부른다.

```javascript
function sayHiBye(firstName, lastName) {
  // 헬퍼(helper) 중첩 함수
  function getFullName() {
    return firstName + " " + lastName;
  }

  alert("Hello, " + getFullName());
  alert("Bye, " + getFullName());
}
```

- 외부 변수에 접근해 이름 전체를 반환해주는 중첩함수 getFullName() 은 편의상 만든 함수다. 이렇게 JS에선 중첩 함수가 흔히 사용된다.
- 새로운 객체의 프로퍼티 형태나 중첩 함수 그 자체로 반환될 수 있다는 점에있다.이렇게 중첩 함수는 어디서든 호출해 사용할 수 있다.
- 물론 이때도 외부 변수에 접근할 수 있다는 사실은 변함없다.

```javascript
function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}

let counter = makeCounter();

alert(counter()); // 0
alert(counter()); // 1
alert(counter()); // 2
```

- counter를 여러개 만들었을 때, 이 함수들은 서로 독립적일까?
- 함수와 중첩 함수 내 count 변수엔 어떤값이 할당될까?

### 렉시컬 환경

#### 변수

- 자바스크립트에선 실행 중인 함수, 코드블록 {...} , 스크립트 전체는 렉시컬 환경이라 불리는 내부 숨김 연관 객체를 갖는다.
- 렉시컬 환경 객체는 두 부분으로 구성된다.
  - 환경 레코드(Enviroment Record) - 모든 지역 변수를 프로퍼티르 저장하고 있는 객체이다. this 값과 같은 기타 정보도 여기에 저장된다.
  - 외부 렉시컬 환경 (Outer Lexical Enviroment)
- 변수는 특수 내부 객체인 환경 레코드의 프로퍼티일 뿐이다. 변수를 가져오거나 변경하는 것은 환경 레코드의 프로퍼티를 가져오거나 변경함을 의미한다.

#### 함수 선언문

- 함수도 변수와 마찬가지로 값이지만 함수 선언문으로 선언한 함수는 일반 변수와는 달리 바로 초기화 된다는 점에 차이가 있다.
- 함수 선언문으로 선언한 함수는 렉시컬 환경이 만들어지는 즉시 사용할 수 있다
- 변수는 let 을 만나 선언될 때까지 사용할 수 없다.

#### 내부와 외부 렉시컬 환경

- 함수를 호출해 실행하면 새로운 렉시컬 환경이 자동으로 만들어진다.이 렉시컬 환경엔 함수 호출 시 넘겨받은 매개변수와 함수의 지역변수가 저장된다.
- 코드에서 변수에 접근할 땐, 먼저 내부 렉시컬 환경을 검색 범위로 잡는다. 내부 렉시컬 환경에서 원하는 변수를 찾지 못하면 검색 범위를 내부 렉시컬 환경이 참조하는 외부 렉시컬 환경으로 확장한다. 이 과정은 검색 범위가 전역 렉시컬 환경으로 확잘될 때까지 반복된다.

#### 함수를 반환하는 함수

```javascript
function makeCounter() {
  let count = 0;

  return function () {
    return count++;
  };
}
let counter = makeCounter();
```

- makeCounter() 를 호출하면 호출할 때마다 새로운 렉시컬 환경 객체가 만들어지고 여기에 makeCounter를 실행하는데 필요한 변수들이 저장된다.

### 클로저

- 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수를 의미한다.
- 자바스크립트에선 모든 함수가 자연스럽게 클로저가 된다.(예외 존재)
- 현재 상태를 기억하고 있다가 상태가 변경되면 그것을 최신상태로 유지하는
- 자신이 생성될 때의 스코프에서 알 수 있었던 변수를 기억!

#### 클로저 활용

- 클로저는 상태를 안전하게 변경하고 유지하기 위해 사용한다.즉, 상태를 안전하게 은닉하고 특정 함수에게만 상태변경을 허용해준다.

```javascript
//카운트 상태 변수
let num = 0;

// 카운트 상태 변경 함수
const increase = function () {
  // 카운트 상태를 1만큼 증가 시킨다.
  return ++num;
};

console.log(increase()); //1
console.log(increase()); //2
console.log(increase()); //3
```

- 동작은 잘 하지만 오류를 발생시킬 가능성이 있다.
  - 카운트 상태 (num 변수의 값)는 increase 함수가 호출되기 전까지 변경되지 않고 유지되어야 한다.
  - 이를 위해 카운트 상태는 increase 함수 만이 변경할 수 있어야 한다.
- 하지만 카운트 상태는 전역 변수를 통해 관리되고 있기 때문에 언제든지 누구나 접근할 수 있고 변경할 수 있다.
- 카운트 상태를 안전하게 변경하고 유지하기 위해서는 increase 함수만이 num 변수를 참조하고 변경할 수 있게 하는것이 바람직하다.

```javascript
// 카운트 상태 변경 함수
const increase = function () {
  // 카운트 상태 변수
  let num = 0;
  // 카운트 상태를 1만큼 증가 시킨다.
  return ++num;
};

console.log(increase()); //1
console.log(increase()); //1
console.log(increase()); //1
```

- 전역 변수 num을 increase 함수의 지역 변수로 바꾸어 의도치 않은 상태 변경을 방지해봤다.
- 하지만 increase 함수가 호출될 때마다 지역 변수 num은 다시 선언되고 0으로 초기화 되기 때문에 출력 결과는 언제나 1이 나온다.
- 상태가 변경되기 이전 상태를 유지하지 못한다. 이전 상태를 유지할 수 있도록 클로저를 사용해보자.

```javascript
// 카운트 상태 변경 함수
const increase = (function () {
  // 카운트 상태 변수
  let num = 0;
  // 클로저
  return function () {
    // 카운트 상태를 1만큼 증가 시킨다.
    return ++num;
  };
})();

console.log(increase()); //1
console.log(increase()); //2
console.log(increase()); //3
```

- 위 코드가 실행되면 즉시 실행 함수가 호출되고 즉시 실행 함수가 반환한 함수가 increase 변수에 할당된다.
- increase 변수에 할당된 함수는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시실행함수의 렉시컬 환경을 기억하는 클로저이다.
- 즉시실행함수는 호출된 이후 소멸되지만, 즉시실행함수가 반환한 클로저는 increase 변수에 할당되어 호출된다. 이때 즉시실행함수가 반환한 클로저는 자신이 정의된 위치에 의해 결정된 상위 스코프인 즉시실행함수의 렉시컬 환경을 기억하고 있다.
- 따라서 즉시실행함수가 반환한 클로저는 카운트 상태를 유지하기 위해 자유 변수 num을 언제 어디서 호출하든지 참조하고 변경할 수 있다.
- 감소예제

```javascript
const counter = (function () {
  //카운트 상태 변수
  let num = 0;

  //클로저인 메서드를 갖는 객체를 반환한다.
  // 객체 리터럴은 스코프를 만들지 않는다.
  // 따라서 아래 메서드들의 상위 스코프는 즉시 실행 함수의 렉시컬 환경이다.
  return {
    //num :0 , // 프로퍼티는 public 하므로 은닉되지 않는다.
    increase() {
      return ++num;
    },
    decrease() {
      return num > 0 ? --num : 0;
    },
  };
})();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```

- 즉시 실행 함수가 반환하는 객체 리터럴은 즉시실행함수의 실행 단계에서 평가되어 객체가 된다.
- 이때 객체의 메서드도 함수 객체로 생성된다. 객체 리터럴의 중괄호는 코드 블록이 아니므로 별도의 스코프를 생성하지 않는다.

#### 함수형 프로그래밍에서 클로저를 활용하는 예제

```javascript
//함수를 인수로 전달 받고 함수를 반환하는 고차 함수
// 이 함수는 카운트 상태를 유지하기 위한 자유변수 counter를 기억하는 클로저를 반환한다.

function makeCounter(aux) {
    //카운트 상태를 유지하기 위한 자유변수
  let counter = 0;

  //클로저 반환
  return function() {
      //인수로 전달 받은 보조 함수에 상태 변경을 위임
    counter = aux(counter);
    return counter;
  };
}

// 보조 함수
function increase(n) {
    return ++n;
}

// 보조 함수
function  decrease(n) {
    return --n;
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다.
const increaser = makeCounter(increase); // (1)
console.log(increaser()); // 1
console.log(increaser()); // 2

// increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
counst decreaser = makeCounter(decrease); // (2)
console.log(decreaser()); // -1
console.log(decreaser()); // -2

```

- makeCounter 함수는 보조 함수를 인자로 전달받고 함수를 반환하는 고차 함수다. makeCounter 함수가 반환하는 함수는 자신이 생성됐을 때의 렉시컬 환경인 makeCounter 함수의 스코프에 속한 counter 변수를 기억하는 클로저이다.
- makeCounter 함수는 인자로 전달 받은 보조 함수를 합성하여 자신이 반환하는 함수의 동작을 변경할 수 있다.
- 주의할점!!
  - makeCounter 함수를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다.
  - 이는 함수를 호출하면 그때마다 새로운 makeCounter 함수 실행 컨텍스트의 렉시컬 환경이 생성되기 때문이다.

#### 예제 과정 설명

- (1)에서 makeCounter 함수를 호출하면 makeCounter 함수의 실행 컨텍스트가 생성된다. 그리고 makeCounter 함수는 함수객체를 생성하여 반환한 후 소멸된다.
- makeCounter 함수가 반환한 함수는 makeCounter 함수의 렉시컬 환경을 상위 스코프로서 기억하는 클로저이며 전역 변수인 increaser에 할당된다.
- 이때 makeCounter 함수의 실행 컨텍스트는 소멸되지만 makeCounter 함수 실행 컨텍스트의 렉시컬 환경은 makeCounter 함수가 반환한 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있기 때문에 소멸되지 않는다.
- (2) 에서 makeCounter 함수를 호출하면 새로운 makeCounter 함수의 실행 컨텍스트가 생성된다. 그리고 makeCounter 함수는 함수 객체를 생성하여 반환한 후 소멸된다.
- makeCounter 함수가 반환한 함수는 makeCounter 함수의 렉시컬 환경을 상위 스코프로서 기억하는 클로저이며, 전역 변수인 decreaser에 할당된다.
- 이때 makeCounter 함수의 실행 컨텍스트는 소멸되지만 makeCounter 함수 실행 컨텍스트의 렉시컬 환경은 makeCounter 함수가 반환한 [[Environment]] 내부 슬롯에 의해 참조되고 있기 때문에 소멸되지 않는다.

#### 정리

- 예제에서 전역변수 increaser 와 decreaser 에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에 카운트를 유지하기 위한 자유변수 counter를 공유하지 않아 카운터의 증감이 연동되지 않는다.
- 따라서 독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만드려면 렉시컬 환경을 공유하는 클로저를 만들어야 한다. 이를 위해서는 makeCounter 함수를 두번 호출하지 말아야 한다.

```javascript
const counter = (function () {
  let counter = 0;

  return function (aux) {
    counter = aux(counter);
    return counter;
  };
})();

function increase(n) {
  return ++n;
}

function decrease(n) {
  return --n;
}

console.log(counter(increase)); //1
console.log(counter(increase)); //2

//자유변수를 공유
console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0
```
