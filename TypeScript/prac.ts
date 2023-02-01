let a :string = 'kim';
let b :string[] = ['kim', 'park']; // array여야하고, string이어야함
let c :{name? :string} ={  // object ? name이 올수도있고 안올 수도 있다. 속성이 불확실할때
    name:'kim',
}


let d :string | number = 'oh'; // union type 

// 변수
type myType = string | number;
let e :myType = 123;

// 함수
function f(x :number) :number // 리턴타입 
{
  return x * 2
}

function func(x :number) :void { // 리턴쓰기 싫을때
  x * 2;
}

f(2); // 자바스크립트와 다른점 -> 타입지정된 파라미터는 필수 파라미터가 옵션일 경우 파라미터변수? :타입
// ? 연산자는 들어올 수도 있다~ 라는 뜻이긴한데 -> ' 변수? :number === number | undefined '


// array
let members :(number | string) [] =  [1, 'asd', 3];

// 튜플타입
type member = [number, boolean]; 
let john :member = [123, false];

// object
type mem = {
   [key :string] :string // 글자로된 모든 object 속성타입은 string
}
let abc :mem = {
    name : 'kim'
}

let oj :{ a :string | number} = {
    a : 123
}

// any -> 자바스크립트랑 다를게 없음 
// 그래서 나온게 unknown -> 모든 자료형 허용해줌. any 보다 안전하다.
// unknown 은 number 타입이 아님.

// class
class User {
    name;
    constructor(name :string) {
        this.name = name;
    }
}


// Narrowing & Assertion
function fun(x :number | string) {
   // Type Narrowing
   if(typeof x === 'string'){ 
    return x + '1'
   } else {
    return x + 1
   }
}
fun(123);

function f1(x : number | string) {

    let array :number[] = [];
    if (typeof x === 'number') {
        array[0] = x;
    } else { // if문 썼으면 끝까지 써야 안전 else, else if 써!!

    }
}
f1(123);

// Narrowing으로 판정해주는 문법들
// typeof 변수 , 속성명 in 오브젝트 , 인스턴스 instanceof 부모
// -> 그냥 현재 변수의 타입이 뭔지 특정지을 수만 있기만 하면 다 인정해준다.


// Assertion (타입 덮어쓰기)
function f2(x :number | string) {

    let ary :number[] = [];
    ary[0] = x as number; // 왼쪽 변수를 number로 인식하게 덮어버려요
}
// as 문법의 용도! 
// 1. narrowing 할 때 쓴다.
// 2. union타입을 하나의 타입으로 확정짓고 싶을 때 사용하는거다. 단순 변경으로 사용하는게 아님
// 3. 무슨 타입이 들어올지 100% 확실할 때 쓴다.


// type alias -> 대문자로 시작하거나 뒤에 Type 붙여주기
type Animal = string | number | undefined;
let ani :Animal = '호랭이';

type Animals = { name :string, age :number}
let anima :Animals = {
    name: 'tkwk',
    age: 1223
}

// typescript object
type GirlFriend = {
    readonly name :string // object 자료 수정도 막을 수 있다 '읽기 전용'
}
const girl :GirlFriend = {
    name: 'hi'
}
// object 속성 안에도 ? 사용가능

// type 변수 union type으로
type Name = string;
type Age = number;
type Person = Name | Age;

// & 연산자로 object타입 extend 
type PositionX = { x :number };
type PositionY = { y :number };
type PositionXY = PositionX & PositionY;

//  (주의) 같은 이름의 type 변수 재정의 불가능하다!!!!



//////////////////////////////////////////////////////////////////

// Literal types
let hi :'kim';
let me : '빡빡' | 'solo';
// 변수에 뭐가 들어올지 더 엄격하게 관리 가능하다. 자동완성 힌트! 함수도 가능! return 값도 제한 가능!
function rcp(a :'가위'|'바위'|'보') :('가위'|'바위'|'보')[]{
    return ['가위']
}
rcp('가위');

// literal type의 문제점
let data = {
    name :'kim'
}

function data1(a :'kim') { // type이 kim인거임.

}
// data1(data.name); data.name자체는 문제가 없는데, 함수에서 kim이라는 타입만 들어올 수 있게 지정했기 떄문에 안된다.

// 솔루션
// 1. object 만들 때 타입지정 확실히 할것.
// 2. as 문법으로 타입 덮던가.
// 3. as const 키워드 쓰던가. -> 이 object는 literal type 지정을 알아서 해라 
// object value 값을 그대로 타입으로 지정해줌. // object 속성들에 모두 readonly를 붙여줌

////////////////////////////////////////////////////////////////////////////////////////////////////

// function type alias
type funcType = (a :string) => number; 
let fu :funcType = function (a) { // 표현식이어야함.
    return 1;
}

// let info = {
//     name : 'kim',
//     plusOne(a :number) :number {
//         return a + 1
//     },
//     changeName :() => {
//         console.log('hi');
//     }
// }
// info.plusOne(1); 
// info.changeName();

type Mem = {
    name : string,
    age : number,
    plusOne : ( a :number) => number;
    changeName : () => void
}

let info :Mem = {
    name : 'kim',
    age : 13,
    plusOne(a)  {
        return a + 1
    },
    changeName :() => {
        console.log('hi');
    }
}
info.plusOne(1); 
info.changeName();


type CutType = ( x :string ) => string;

let cutZero :CutType = function (x) {
    let result = x.replace(/^0+/, "");    // 맨 앞에 0 문자가 있으면 제거하고 문자 타입으로 return 
    return result;
}
function removeDash( x :string) :number {
    let result = x.replace(/-/g, "");     // - 기호 전부 제거해주고 그걸 숫자 type으로 return
    return parseFloat(result);
}

//////////////////////////////////////////////////////////////////////////////////////////////////

// class type
class Human {
    name :string; // 필드값 미리 지정해줘야 this~ 어쩌구 에러가 안남.
    constructor(a :string) {
        this.name = a;
    }

    // prototype
    function(a :string) {
        console.log('hi' + a)
    }
}

let person1 = new Human('kim');
let person2 = new Human('park');
person1.function('bye');
// 복제되는게 항상 object라 return 타입은 해 줄 필요 없음.


class Car {
    model :string;
    price :number;
    constructor(a :string, b:number) {
        this.model = a;
        this.price = b;
    }

    tax() :number {
        return this.price * 0.1;
    }
}
let car1 = new Car('Ferari', 2000)
console.log(car1);
console.log(car1.tax());


////////////////////////////////////////////////////////////////////////////////////////////////

// object - type,interface
type Sqaure = { 
    color : string,
    width : number
 } // object의 경우에는 type이 아니라 interface 써도 됨!

 let nemo :Sqaure= {
    color : 'red',
    width : 100,
}

interface SchoolStuType {
    name : string
}
interface SchoolTeaType extends SchoolStuType {
    name : string,
    age : number,
}

let student :SchoolStuType= { name : 'kim' }
let teacher :SchoolTeaType= { name : 'park', age: 30}

// interface를 쓰면 extends로 복사가 가능하다.

// type alias
type Dog = {
    name : string
}

type Cat = {
    age : number
} & Dog // intersection type 두 타입을 전부 만족하는 타입으로! interface도 & 기호로 가능!

// type vs interface
// 주의!!!!!!!!!!!!!!
// interface 는 중복선언이 가능하지만, type은 중복선언이 불가능하다.
// 외부 라이브러리 같은경우 interface 많이 쓴다.-> 추후에 타입에 뭐 더하는게 쉽다. (interface)

// & 쓸 때 중복속성 발생하면? 
// 에러가 안나서 주의 해야함. 사용할 떄는 에러가 난다. type 'never' & 는 합치는게 아니라 둘다 만족하게 하는 타입임.
