### switch 문

- 복수의 if 조건문은 switch 문으로 바꿀 수 있다.
- switch 문을 사용한 비교법은 특정 변수를 다양한 상황에서 비교할 수 있게 해준다.
- 하나 이상의 case 문으로 구성된다. 대게 default문도 있지만 이는 필수는 아니다.

```Javascript
switch(x) {
  case 'value1':  // if (x === 'value1')
    ...
    [break]

  case 'value2':  // if (x === 'value2')
    ...
    [break]

  default:
    ...
    [break]
}
```

- 변수 x의 값과 첫 번째 case문의 값 value1 를 비교한 후 두번째 case문의 값 value2 와 비교한다. 이 과정이 계속 이어진다.
- case 문에서 변수 x의 값과 일치하는 값을 찾으면 해당 case 문의 아래의 코드가 실행된다. 이때 break 문을 만나거나 switch문이 끝나면 코드의 실행은 멈춘다.
- 값과 일치하는 case 문이 없다면, default 문 아래의 코드가 실행된다.(default 문이 있는 경우)

```Javascript
let arg = prompt("값을 입력해주세요.");
switch (arg) {
  case '0':
  case '1':
    alert( '0이나 1을 입력하셨습니다.' );
    break;

  case '2':
    alert( '2를 입력하셨습니다.' );
    break;

  case 3:
    alert( '이 코드는 절대 실행되지 않습니다!' );
    break;
  default:
    alert( '알 수 없는 값을 입력하셨습니다.' );
}
```

- 0이나 1을 입력한 경우엔 첫 번째 alert
- 2를 입력한 경우 두 번째 alert
- 3을 입력하더라도 세 번째 alert 문은 실행되지 않는다. prompt 함수는 사용자가 입력 필드에 기재한 값을 문자열로 변환해 반환하기 때문에 숫자 3을 입력하더라도 prompt 함수는 문자열'3'을 반환한다. 그런데 세 번째 case문에선 사용자가 입력한 값과 숫자영 3을 비교하므로 형 자체가 다르기 때문에 case3아래의 코드는 절대 실행되지 않는다. 대신 default 문이 실행된다.
