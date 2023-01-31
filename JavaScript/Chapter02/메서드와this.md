### 메서드와 this

- 객체는 사용자,주문, 등과 같이 실제 존재하는 개체(entity)를 표현하고자 할 때 생성된다.

```Javascript
let user = {
    name: "John",
    age: 30
};
```

- 사용자는 현실에서 장바구니에서 물건 선택하기, 로그인하기, 로그아웃하기 등의 행동을 한다. 이와 마찬가지로 사용자를 나타내는 객체 user도 특정한 행동을 할 수 있다.
- 자바 스크립트에선 객체의 프로퍼티에 함수를 할당해 객체에게 행동할 수 있는 능력을 부여해준다.

### 메서드 만들기

- 객체 user 에게 인사할 수 있는 능력을 부여해 줘보자!

```Javascript
let user = {
    name: "John",
    age: 30
};

user.sayHi = function() {
    alert("안녕하세요!");
};

user.sayHi(); // 안녕하세요!
```

- 함수표현식으로 함수를 만들고 객체 프로퍼티 user.sayHi에 함수를 할당해 주었다. 이제 객체에 할당된 함수를 호출하면 user가 인사를 해준다.
- 이렇게 객체 프로퍼티에 할당된 함수를 메서드 라고 부른다.
- 위 예시에선 user에 할당된 sayHi가 메서드이다.
- 메서드는 이미 정의된 함수를 이용해 만들수도 있다.

```Javascript
let user = {
    // ...
}

// 함수 선언
function sayHi() {
    alert("안녕하세요!");
};

// 선언한 함수를 메서드로 등록
user.sayHi = sayHi;

user.sayHi(); // 안녕하세요!
```

### 메서드 단축 구문

```Javascript
// 아래 두 객체는 동일하게 동작합니다.

user = {
  sayHi: function() {
    alert("Hello");
  }
};

// 단축 구문을 사용하니 더 깔끔해 보이네요.
user = {
  sayHi() { // "sayHi: function()"과 동일합니다.
    alert("Hello");
  }
};
```

- function을 생략해도 메서드를 정의할 수 있다.

### 메서드와 this

- 메서드는 객체에 저장된 정보에 접근할 수 있어야 제 역할을 할 수 있다. 모든 메서드가 그런건 아니지만, 대부분의 메서드가 객체 프로퍼티의 값을 활용한다.
- user.sayHi() 의 내부코드에서 객체 user에 저장된 이름을 이용해 인사말을 만드는 경우가 이런경우에 속한다.
- 메서드 내부에서 this 키워드를 사용하면 객체에 접근할 수 있다.
- 이때 . 앞의 this는 객체를 나타낸다. 정확히는 메서드를 호출할 때 사용된 객체를 나타낸다.

```Javascript
let user = {
    name: "John",
    age: 30,

    sayHi() {
        // this는 현재 객체를 나타낸다.
        alert(this.name);
    }

};

user.sayHi(); //John
```

- user.sayHi()가 실행되는 동안에 this는 user를 나타낸다.
- this를 사용하지 ㅇ낳고 외부 변수를 참조해 객체에 접근하는 것도 가능하다.

```Javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert(user.name); // 'this' 대신 'user'를 이용함
  }

};
```

- 그런데 이렇게 외부 변수를 사용해 객체를 참조하면 예상치 못한 에러가 발생할 수 있다. user를 복사해 다른 변수에 할당(admin = user) 로 하고 , user는 전혀 다른 값을 덮어썻다고 가정해보자 sayHi()는 원치 않는값(null)을 참조할 것이다.

```Javascript
let user = {
  name: "John",
  age: 30,

  sayHi() {
    alert( user.name ); // Error: Cannot read property 'name' of null
  }

};


let admin = user;
user = null; // user를 null로 덮어씁니다.

admin.sayHi(); // sayHi()가 엉뚱한 객체를 참고하면서 에러가 발생했습니다.
```

- alert 함수가 user.name 대신 this.name을 인수로 받았다면 에러가 발생하지 않았을 것이다.

### 자유로운 this

- 자바스크립트의 this는 다른 프로그래밍 언어의 this와 동작 방식이 다르다. 자바스크립트에선 모든 함수에 this를 사용할 수 있다.

```Javascript
function sayHi() {
    alert( this.name ); // 에러 안남
}
```

- this 값은 런타임에 결정된다. 컨텍스트에 따라 달라진다.
- 동일한 함수라도 다른 객체에서 호출했다면 this가 참조하는 값이 달라진다.

```Javascript
let user = { name: "John" };
let admin = { name: "Admin" };

function sayHi() {
  alert( this.name );
}

// 별개의 객체에서 동일한 함수를 사용함
user.f = sayHi;
admin.f = sayHi;

// 'this'는 '점(.) 앞의' 객체를 참조하기 때문에
// this 값이 달라짐
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin['f'](); // Admin (점과 대괄호는 동일하게 동작함)
```

- 규칙은 간단하다. obj.f()를 호출했다면 this는 f를 호출하는 동안의 obj이다. 위 예시에선 obj가 user나 admin을 참조한다.

- 객체가 없어도 호출이 가능하다 this == undefined

### this가 없는 화살표 함수

- 화살표 함수는 일반 함수와는 달리 고유한 this를 가지고 있지 않다. this를 참조하면, 화살표 함수가 아닌 평범한 외부 함수에서 this값을 가져온다.
