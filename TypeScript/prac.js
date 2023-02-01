let a = 'kim';
let b = ['kim', 'park']; // array여야하고, string이어야함
let c = {
    name: 'kim',
};
let d = 'oh'; // union type 
let e = 123;
// 함수
function f(x) {
    return x * 2;
}
function func(x) {
    x * 2;
}
f(2); // 자바스크립트와 다른점 -> 타입지정된 파라미터는 필수 파라미터가 옵션일 경우 파라미터변수? :타입
// ? 연산자는 들어올 수도 있다~ 라는 뜻이긴한데 -> ' 변수? :number === number | undefined '
// array
let members = [1, 'asd', 3];
let john = [123, false];
let abc = {
    name: 'kim'
};
let oj = {
    a: 123
};
// any -> 자바스크립트랑 다를게 없음 
// 그래서 나온게 unknown -> 모든 자료형 허용해줌. any 보다 안전하다.
// unknown 은 number 타입이 아님.
// class
class User {
    name;
    constructor(name) {
        this.name = name;
    }
}
// Narrowing & Assertion
function fun(x) {
    // Type Narrowing
    if (typeof x === 'string') {
        return x + '1';
    }
    else {
        return x + 1;
    }
}
fun(123);
function f1(x) {
    let array = [];
    if (typeof x === 'number') {
        array[0] = x;
    }
    else { // if문 썼으면 끝까지 써야 안전 else, else if 써!!
    }
}
f1(123);
// Narrowing으로 판정해주는 문법들
// typeof 변수 , 속성명 in 오브젝트 , 인스턴스 instanceof 부모
// -> 그냥 현재 변수의 타입이 뭔지 특정지을 수만 있기만 하면 다 인정해준다.
// Assertion (타입 덮어쓰기)
function f2(x) {
    let ary = [];
    ary[0] = x; // 왼쪽 변수를 number로 인식하게 덮어버려요
}
let ani = '호랭이';
let anima = {
    name: 'tkwk',
    age: 1223
};
const girl = {
    name: 'hi'
};
//  (주의) 같은 이름의 type 변수 재정의 불가능하다!!!!
//////////////////////////////////////////////////////////////////
// Literal types
let hi;
let me;
// 변수에 뭐가 들어올지 더 엄격하게 관리 가능하다. 자동완성 힌트! 함수도 가능! return 값도 제한 가능!
function rcp(a) {
    return ['가위'];
}
rcp('가위');
// literal type의 문제점
let data = {
    name: 'kim'
};
function data1(a) {
}
let fu = function (a) {
    return 1;
};
let info = {
    name: 'kim',
    age: 13,
    plusOne(a) {
        return a + 1;
    },
    changeName: () => {
        console.log('hi');
    }
};
info.plusOne(1);
info.changeName();
let cutZero = function (x) {
    let result = x.replace(/^0+/, ""); // 맨 앞에 0 문자가 있으면 제거하고 문자 타입으로 return 
    return result;
};
function removeDash(x) {
    let result = x.replace(/-/g, ""); // - 기호 전부 제거해주고 그걸 숫자 type으로 return
    return parseFloat(result);
}
//////////////////////////////////////////////////////////////////////////////////////////////////
// class type
class Human {
    name; // 필드값 미리 지정해줘야 this~ 어쩌구 에러가 안남.
    constructor(a) {
        this.name = a;
    }
    // prototype
    function(a) {
        console.log('hi' + a);
    }
}
let person1 = new Human('kim');
let person2 = new Human('park');
person1.function('bye');
// 복제되는게 항상 object라 return 타입은 해 줄 필요 없음.
class Car {
    model;
    price;
    constructor(a, b) {
        this.model = a;
        this.price = b;
    }
    tax() {
        return this.price * 0.1;
    }
}
let car1 = new Car('Ferari', 2000);
console.log(car1);
console.log(car1.tax());
let nemo = {
    color: 'red',
    width: 100,
};
let student = { name: 'kim' };
let teacher = { name: 'park', age: 30 };
// type vs interface
// 주의!!!!!!!!!!!!!!
// interface 는 중복선언이 가능하지만, type은 중복선언이 불가능하다.
// 외부 라이브러리 같은경우 interface 많이 쓴다.-> 추후에 타입에 뭐 더하는게 쉽다. (interface)
// & 쓸 때 중복속성 발생하면? 
// 에러가 안나서 주의 해야함. 사용할 떄는 에러가 난다. type 'never' & 는 합치는게 아니라 둘다 만족하게 하는 타입임.
