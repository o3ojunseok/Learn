### 프라미스

- 자바스크립트 비동기 처리에 사용되는 객체
- 콜백 패턴은 콜백 헬로 인해 가독성이 나쁘고 비동기 처리 중 발생한 에러의 처리가 곤란하며 여러 개의 비동기 처리를 한번에 처리하는데도 한계가 있다.ES6에서는 비동기 처리를 위한 또 다른 패턴으로 프라미스를 도입
- 콜백의 단점을 보완하며 비동기 처리 시점을 명확하게 표현

```Javascript
const promise1 = new Promise((resolve, reject) => {
    // 비동기 작업
});
```

- 변수의 이름은 promise1 이며, const로 선언했기에 재할당이 되지 않는다. 하나의 변수로 끝까지 해당 Promise를 관리하는 것이 가독성도 좋고 유지보수 하기도 좋다.
- new Promise(...)로 Promise 객체를 새롭게 만들었다. 생성자는 함수이므로 괄호를 써서 함수를 호출하는 것과 동일하다.
- 생성자는 특별한 함수 하나를 인자로 받는다. (여기서 인자로 들어가는 함수의 형태는 화살표 함수)
- executor
  - executor 는 첫번째 인수로 resolve 이며, 두번째 인수로 reject를 받는다.
  - resolve는 executor 내에서 호출할 수 있는 또 다른 함수이다. resolve 를 호출하게 된다면 비동기 작업이 성공
  - reject 또한 executor 내에서 호출할 수 있는 또 다른 함수이다. reject를 호출하게 되면 비동기 작업 실패
- Promise의 특징은 new Promise(...) 하는 순간 여기에 할당된 비동기 작업은 바로 시작된다.
- Promise가 끝나고 난 다음의 동작을 직접 설정할 수 있다.
- then
  - then메서드는 해당 Promise가 성공했을 때의 동작을 지정한다. 인자로 함수를 받는다.
- catch
  - catch메서드는 해당 Promise가 실패했을 때의 동작을 지정한다. 인자로 함수를 받는다.
  - 위 함수들은 체인 형태로 활용할 수 있다.(연속적 호출 가능)

```Javascript
const promise1 = new Promise((resolve, reject) => {
    resolve();
});
promise1
    .then(() => {
        console.log("then!");
    })
    .catch(() => {
        console.log("catch!");
    });

    // then
```

- then에 함수를 넣어주었고, 연속적으로 catch에도 함수를 넣었다. 이 Promise에서는 resolve가 호출되었기 때문에 성공으로 간주하여 then에 있는 동작만 실행한다.
- catch(); 를 호출하면 예상대로 catch! 만 출력된다.

### 재사용

- new Promise(...) 한 것을 그대로 리턴하는 함수를 만들어 사용하면 된다.

```Javascript
function startAsync(age) {
  return new Promise((resolve, reject) => {
    if (age > 20) resolve();
    else reject();
  });
}

setTimeout(() => {
  const promise1 = startAsync(25);
  promise1
    .then(() => {
      console.log("1 then!");
    })
    .catch(() => {
      console.log("1 catch!");
    });
  const promise2 = startAsync(15);
  promise2
    .then(() => {
      console.log("2 then!");
    })
    .catch(() => {
      console.log("2 catch!");
    });
}, 1000);


// 1 then!
// 2 catch!
```

- startAsync 함수를 호출하는 순간 newPromise(...)가 실행되어 비동기 작업이 시작된다.

### Promise.all

- 여러개의 비동기 처리를 모두 병렬 처리할 때 사용한다.

```Javascript
const requestData1 = () =>
    new Promise(resolve => setTimeout(() => resolve(1), 3000))
const requestData2 = () =>
    new Promise(resolve => setTimeout(() => resolve(2), 2000))
const requestData3 = () =>
    new Promise(resolve => setTimeout(() => resolve(3), 1000))

// 세 개의 비동기 처리를 순차적으로 처리
const res = [];
requestData1()
    .then(data => {
        res.push(data);
        return requestData2();
    })
    .then(data => {
        res.push(data);
        return requestData3();
    })
    .then(data => {
        res.push(data);
        console.log(res); // [1,2,3] -> 6초
    })
    .catch(console.error);
```

- 이 예제는 세 개의 비동기 처리를 순차적으로 처리한다. 즉 , 앞선 비동기 처리가 완료하면 다음 비동기 처리를 수행한다.
- 하지만 서로 의존하지 않고 개별적으로 수행된다.
- promise.all 메서드는 여러 개의 비동기 처리를 모두 병렬 처리할 때 사용하는데 병렬로 만들어보자.

```Javascript
const requestData1 = () =>
    new Promise(resolve => setTimeout(() => resolve(1), 3000));
const requestData2 = () =>
    new Promise(resolve => setTimeout(() => resolve(2), 2000));
const requestData3 = () =>
    new Promise(resolve => setTimeout(() => resolve(3), 1000));

// 세 개의 비동기 처리를 병렬로 처리
Promise.all([requestData1(), requestData2(), requestData3()])
    .then(console.log) // [1,2,3] -> 3초 소요
    .catch(console.error);

```

- 프라미스 요소로 갖는 배열 등의 이터러블을 인수로 전달받는다. 그리고 전달받은 모든 프라미스가 모두 fulfilled 상태가 되면 모든 처리 결과를 배열에 저장해 새로운 프라미스를 반환한다.
- 각 프라미스는 다음과 같이 동작한다.

  - 1. 3초후에 1을 resolve
  - 2. 2초후에 2를 resolve
  - 3. 1초후에 3을 resolve

- Promise.all 메서드는 인수로 전달받은 배열의 모든 프라미스가 모두 fulfilled 상태가 되면 종료한다. 따라서 Promise.all메서드가 종료하는 데 걸리는 시간은 가장 늦게 fulfilled 상태가 되는 프라미스의 처리 시간보다 조금 더 길다.
- 인수로 전달받은 배열의 프라미스가 하나라도 rejected 상태가 되면 나머지 프라미스가 fulfilled 상태가 되는 것을 기다리지 않고 즉시 종료한다.

### Promise.race

- all 메서드와 동일하게 프라미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달 받는다.
- race 메서드는 fulfilled 상태가 되는 것을 기다리는 것이 아니라 가장 먼저 fulfilled 상태가 된 프라미스의 처리 결과를 resolve 하는 새로운 프라미스를 반환한다.
- 프라미스가 rejected 상태가 되면 Promise.all 메서드와 동일하게 처리된다. 즉 Promise.race 메서드에 전달된 프라미스가 하나라도 rejected 상태가 되면 에러를 reject 하는 새로운 프라미스를 즉시 반환한다.

### Promise.allSettled

- 프라미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달 받는다. 그리고 전달 받은 프라미스가 모두 settled상태(비동기 처리가 수행된 상태 즉,fulfilled 또는 rejected 상태)가 되면 처리 결과를 배열로 반환한다.

```Javascript
Promise.allSettled([
    new Promise(resolve => setTimeout() => resolve(1), 2000),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Error!'), 1000)))
]).then(console.log);

// [
//     {status: "fulfilled", value: 1},
//     {status: "rejected, reason: Error: Error! at <anonymous>:3:54}
// ]
```

- allSettled 메서드가 반환한 배열에는 fulfilled 또는 rejected 상태와는 상관없이 allSettled 메서드가 인수로 전달받은 모든 프라미스들의 처리 결과가 모두 감겨 있다. 프라미스 처리결과를 나타내는 객체는 다음과 같다.
  - 프라미스가 fulfilled 상태인 경우 비동기 처리 상태를 나타내는 status 프로퍼티와 처리 결과를 나타내는 value 프로퍼티를 갖는다.
  - 프라미스가 rejected 상태인 경우 비동기 처리 상태를 나타내는 status 프로퍼티와 에러를 나타내는 reason 프로퍼티를 갖는다.
