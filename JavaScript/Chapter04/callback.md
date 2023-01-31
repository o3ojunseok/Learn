### 콜백

- 나중에 호출할 함수를 의미한다.
- 자바스크립트 호스트 환경이 제공하는 여러 함수를 사용하면 비동기 동작을 스케줄링 할 수 있다. 원하는 때에 동작이 시작하도록...
- setTimeout 은 스케줄링에 사용되는 가장 대표적 함수이다.

```Javascript
function loadScript(src) {
    // <script> 태그를 만들고 페이지에 태그를 추가
    // 태그가 페이지에 추가되면 src에 있는 스크립트를 로딩하고 실행
    let script = document.createElement('script');
    script.src = src;
    document.head.append(script);
}
```

- 함수 loadScript(src)는 <script src = "...">를 동적으로 만들고 이를 문서에 추가한다. 브라우저는 자동으로 태그에 있는 스크립트를 불러오고, 로딩이 완료되면 스크립트를 실행한다.

```Javascript
//해당 경로에 위치한 스크립트를 불러오고 실행
loadScript('/my/script.js')

// loadScript 아래의 코드는
// 스크립트 로딩이 끝날 때까지 기다리지 않는다.

// script.js엔 "function newFunction() {...}" 이 있다
newFunction(); // 함수가 존재하지 않는다는 에러가 발생
```

- 이 때 스크립트는 비동기적으로 실행된다. 로딩은 당장 시작되더라도 실행은 함수가 끝난 후에야 되기 때문
- 따라서 loadScript(...) 아래에 있는 코드들은 스크립트 로딩이 종료되는 걸 기다리지 않는다.
- 스크립트 로딩이 끝나자 마자 이 스크립트를 사용해 무언가를 한다고 가정해보자. 스크립트 안에 다양한 함수가 정의되어있고, 우리는 이 함수를 실행하길 원하는 상황.
- 그런데 loadScript(...) 를 호출하자마자 내부 함수를 호출하면 원하는 대로 작동하지 않는다.
- 에러는 브라우저가 스크립트를 읽어올 수 있는 시간을 충분히 확보하지 못했기 때문에 발생한다. 그런데 현재로서는 함수 loadScript 에서 스크립트 로딩이 완료되었는지 알 방법이 없다. 언젠가 스크립트가 로드되고 실행도 되는 정도..? 원하는 대로 스크립트 안에 함수나 변수를 사용하려면 스크립트 로딩이 끝났는지 여부를 알 수 있어야 한다.
- loadScript의 두번째 인수로 스크립트 로딩이 끝난 후 실행될 함수인 콜백 함수를 추가해보자

```Javascript
funcion loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(script);

    document.head.append(script);
}
```

- 새롭게 불러온 스크립트에 있는 함수를 콜백 함수 안에서 호출하면 원하는대로 외부 스크립트 안의 함수를 사용할 수 있다.

```Javascript
loadScript('/my/script.js', function(){
    //콜백 함수는 스크립트 로드가 끝나면 실행
    newFunction(); // 이제 함수 호출이 제대로 동작
});
```

- 이렇게 두번째 인수로 전달된 함수(대개 익명함수) 는 원하는 동작이 완료되었을때 실행된다.

```Javascript
function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(script);
    document.head.append(script);

}

loadScript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js', script => {
  alert(`${script.src}가 로드되었습니다.`);
  alert( _ ); // 스크립트에 정의된 함수
});
```

- 이런 방식을 콜백기반 비동기 프로그래밍이라고 한다. 무언가를 비동기적으로 수행하는 함수는 함수 내 동작이 모두 처리된 후 실행되어야 하는 함수가 들어갈 콜백을 인수로 반드시 제공해야한다.

### 콜백 속 콜백

```Javascript
loadScript('/my/script.js', function(script) {

  alert(`${script.src}을 로딩했습니다. 이젠, 다음 스크립트를 로딩합시다.`);

  loadScript('/my/script2.js', function(script) {
    alert(`두 번째 스크립트를 성공적으로 로딩했습니다.`);
  });

});

///////////////////////////////////////////////////

loadScript('/my/script.js', function(script) {

  loadScript('/my/script2.js', function(script) {

    loadScript('/my/script3.js', function(script) {
      // 세 스크립트 로딩이 끝난 후 실행됨
    });

  })

});

```

- 이렇게 중첩 콜백을 만들면 바깥에 위치한 loadScript가 관료된 후 , 안쪽 loadScript가 실행된다.
- 위와 같이 모든 새로운 동작이 콜백 안에 위치하게 작성하면 된다. 그런데 이렇게 콜백 안에 콜백을 넣는 것은 수행하려는 동작이 단 몇개 뿐이라면 괜찮지만, 동작이 많은경우엔 좋지 않다.

### 에러 핸들링

```Javascript
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생했습니다.`));

  document.head.append(script);
}

```

- loadScript 에서 로딩 에러를 추적할 수 있기 만들었다.
- 이제 loadScript 는 스크립트 로딩에 성공하면 callback(null,script) , 실해파면 callback(error) 를 호출한다.

```Javascript
loadScript('/my/script.js', function(error, script) {
  if (error) {
    // 에러 처리
  } else {
    // 스크립트 로딩이 성공적으로 끝남
  }
});
```

- 흔이 에러를 처리하는 사용 패턴
- 이런 패턴은 오류우선콜백 이라고 불린다.
  - callback의 첫 번째 인수는 에러를 위해 남겨둔다. 에러가 발생하면 이 인수를 통해 callback(err)이 호출
  - 두 번째 인수(인수 추가 가능) 는 에러가 발생하지 않았을 때를 위해 남겨둔다. 원하는 동작이 성공한 경우엔 callback(null, result1, result2...)이 호출
