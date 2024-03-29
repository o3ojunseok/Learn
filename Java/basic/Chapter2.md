## 프리미티브 타입 종류와 값의 범위 그리고 기본값

- boolean 
  - 참 or 거짓 을 나타내는 타입이다. 1bit로도 표현이 가능하지만, 일반적인 JVM의 구현은 1byte를 사용하는 것으로 알려져 있다. 디폴트값은 false이다.(논리형)
- char
  - 유니코드 문자를 나타내는 정수형 타입이다. 
- byte
  - 이름과 같이 1byte를 차지하는 정수형 타입이다. 
  - -128 ~ 127 의 범위를 가진다. 디폴트값은 0 이다.
- short
  - 2byte를 차지하는 정수형 타입이다. 
  - -32,768, ~  32,767 의 범위를 가진다. 디폴트값은 0 이다.
- int
  - 4byte를 차지하는 정수형 타입이다. 
  - -231 ~ 231-1 의 범위를 가진다. 디폴트값은 0이다.
  - 리터럴로 정수형 값을 할당할 때 기본적으로 사용되는 타입이다.
- long
  - 8byte를 차지하는 정수형 타입이다.
  - -263 ~ 263-1 의 범위를 가진다. 디폴트값은 0이다.
  - 정수형 리터럴에 L 이나 l 을 뒤에 붙이면 long타입으로 생성되며, 일반적으로 대문자 L이 혼동을 방지할 수 있어 대문자를 사용하는 것이 일반적이다.
- float 
  - 4byte를 차지하는 IEEE 754 단정밀도 부동소수점 타입이다. (실수형)
  - 부동소수점 타입은 표현가능한 값의 범위는 굉장히 넓으나, 정확히 표현하지 못하는 한계가 있기 때문에 보통은 유효숫자 범위를 더 중요하게 생각한다.
  - 6~7 자리의 정밀도를 가진다.
  - 부동소수점 리터럴에 f 혹은 F를 붙여서 표현한다 . 디폴트값은 0.0f이다.
- double
  - 8byte를 차지하는 IEEE 754 배정밀도 부동소수점 타입이다. (실수형)
  - 15자리의 정밀도를 가진다.
  - 부동소수점 리터럴은 기본적으로 double 형을 사용하나 d 혹으 D를 사용해서 표현할수 있다.
  - 기본값은 0.0d 이다.

## 프리미티브 타입과 레퍼런스 타입
- primitive type
  - 자바의 기본타입이다.
  - 자바에서는 필드 선언시 초기화를 하지 않으면, 기본 값으로 초기화가 된다. 프리미티브 타입은 유의미한 값을 가지며, 레퍼런스 타입은 null로 초기화가 된다.
  - 자바에 의해 이미 정의되어 있고 개발자가 추가적으로 정의할 수 없다.
  - 정수,실수,문자,논리,리터럴을 메모리에 직접 저장한다.
  - JVM내 스택영역 존재

- reference type 
  - primitive type 를 제외한 모든 타입들이 해당된다.
  - 변수 선언시 변수에 값이 저장되는 것이 아니라 객체에 대한 힙 영역의 참조를 저장하게 된다.
  - 자바의 참조는 포인터가 아니기 때문에 개발자는 직접적으로 메모리에 접근해서 조작할 수 없다.
  - 참조를 저장한다는 말은 같은 참조를 가리키고 있다면 한 쪽에서 객체의 상태를 변경하는 경우 다른 쪽에서도 영향을 받을 수 있다.
  - JVM Heap 영역에 존재

- reference type은 null을 할당할 수 있지만 primitive type에는 할당할 수 없다.

## 리터럴
- 고정된 값을 나타내는 소스코드상에서의 표현이다. 별도의 연산이 필요없이 표현된다.
- 소스코드의 고정된 값을 대표하는 용어
- 변수 초기화에 종종 사용되기도 한다.
### 정수리터럴
- 정수형숫자, 정수형 숫자가 L 또는 l 로 끝나는 형태로 표현된다. byte,short,int,long 타입은 int 리터럴로 생성될 수 있다.

### 부동소수점 리터럴
- 소수점이 포함된 숫자가 F 또는 f 로 끝나는 형태로 표현된다. 
- F or f = float형 리터럴
- D or d = double형 리터럴
- E or e 를 사용하여 지수 표현식으로도 작성 가능

### 숫자 리터럴에서의 밑줄 문자 사용
- 숫자 리터럴을 읽기 쉽게 도와준다. 자리수가 긴 리터럴을 표현할때 유용
- 숫자 사이에만 밑줄을 넣을 수 있다.
- 밑줄을 넣을수 없는경우
  - 숫자의 시작 또는 끝
  - 부동 소수점 리터럴에서 소수점에 붙은경우
  - 뒤에 붙는 F,L,D 등의 문자 앞 뒤에 붙은경우
  - 문자열에서 문자가 올 것으로 예상 되는 위치
```java
 void 밑줄_숫자 () {
    long phoneNb = 010_123_123;
    long bigNb = 999_999_999_999_999L;
    long manyUnderScore = 9__________9;
        } 
```

### 문자 및 문자열 리터럴
- char와 String 은 유니코드로 표현된다. 직접 해당 문자를 코드에 입력할 수도 있고, 유니코드 이스케이프('\u0000)를 사용할 수 있다.
- char형 리터럴은 작은 따옴표 ''를 사용하고 , String 형 리터럴은 큰따옴표 "" 를 사용한다.
- \ 
  - 이스케이프 문자라고 하며 백슬래시를 입력해서 사용할 수 있다.
  - \b(백 스페이스), \t(탭), \n(라인 피드), \f(폼 피드), \r(캐리지 리턴), \", \', \\

### Boolean 리터럴
- 불린 리터럴은 논리값을 나타내는 표현이다.
- true, false로 나타낸다.

## 그 외 리터럴
- null (특수리터럴)
- Class 리터럴 
  - 특수리터럴
  - <type의 이름>.class 의 형태로 표현한다
  - Class타입 자체를 나타내는 객체의 참조를 반환하며, reflection을 사용할 때 많이 사용한다.
## 변수 선언 및 초기화 하는 방법
- 인스턴스 변수
  - 클래스 선언시 static 키워드 없이 선언된 필드이다. 이 필드는 인스턴스 별로 다른 값을 가질 수 있기 때문에 인스턴스 변수라한다.
- 클래스 변수
  - 클래스 선언시 static 키워드와 함께 선언된 필드이다. 이 필드는 모든 인스턴스들이 공유하는 값이다.
  - 클래스 명으로 접근이 가능하고, 클래스 하나에 값이 하나이기 때문에 클래스 변수라고 불린다.
- 로컬 변수 
  - 메서드 선언 사이에 등장하는 변수로 다른 클래스에서 접근할 수 없는 변수이다. 메서드 영역에서만 임시로 사용되는 변수이다.
- 매개 변수
  - 메서드의 인자로 전달되는 변수를 의미한다.
- 인스턴스 변수와 클래스 변수는 멤버 변수라고 통칭하기도 한다. 멤버 변수는 꼭 초기화를 해주지 않더라도 기본값으로 초기화 되지만, 로컬변수는 반드시 초기화를 해야한다.

```java
class Variables {
    int instanceVar; // 0으로 초기화되는 인스턴스 변수
    static int classVar; // 0으로 초기화되는 클래스 변수
    int initInstanceVar = 10; // 명시적 초기화
    static int intClassVar = 10; // 명시적 초기화
  
  void method(int num) { // 매개변수는 초기화 할 수 없고, 전달받는 값을 사용만 가능
      int a; // 선언은 가능
        // int b = a; 자동으로 초기화 되지 않으므로 동작하지 않음
      a = 10; // 선언을 미리 해줬다면 이렇게 초기화 가능
      int b = a; // 선언과 동시에 초기화
  }
}
```

```java
public class Prac {
    static int a;
    static int b = a;
    
    public static void main(String[] args) {
        System.out.println(b);
    }
}
```
- 변수선언
  - 값을 저장할 공간을 마련하기 위해서 변수 선언을 한다.
  - 변수타입 변수이름; 으로 선언
  - 변수의 초기화는 변수에 값을 저장한다는 말
  - 초기화 방법은 대입연산자 = 을 사용한다. ex) int a = 1; 
  - 지역변수를 제외하고 클래스 변수와 인스턴스 변수는 기본값으로 초기화된다.


- 변수선언
  - {변수타입} {변수이름}
- 초기화 방법
  - 명시적 초기화
  - 초기화 블록
    - 클래스 초기화 블록
      - static{} block내부에 초기화하는 코드를 적는다.
      - static 변수의 복잡한 초기화에 사용된다.
      - e.g.static array의 element를 for-loop 으로 초기화
    - 인스턴스 초기화 블록
      - 클래스 내부에서 {}block 내부에 초기화 하는 코드를 적는다.
      - instance 변수의 복잡한 초기화, instance 생성자 코드 마다 반복되는 초기화에 사용된다.
    - 생성자초기화 순서
      - static 변수 
        - 기본값 -> 명시적초기화-> 클래스 초기화 블록
      - instance 변수 
        - 기본값 -> 명시적초기화 -> 인스턴스 초기화 블록 -> 생성자 

```java
public class Prac {
    static int a;
    static int b = a;
    
    public static void main(String[] args) {
        int x;
        int y = x;
        System.out.println(b);
    }
}
```
- x,y에 컴파일 에러가난다.
- 지역변수는 반드시 따로 초기화 해야한다.
- 변수명 사용규칙
  - 변수명은 숫자로 시작할 수 없다.
  - _(underscore)와 $ 문자 이외에 특수문자 사용 불가
  - 자바의 키워드는 변수명으로 사용할 수 없다 (int,class,return 등 var는 가능)


## 변수의 스코프와 라이프타임
- 선언된 변수를 사용할 수 있는 범위를 변수의 스코프라고 한다.
- 라이프 타임은 해당 변수가 살아있는 기간이다. 즉, 언제까지 메모리를 유지하는가!

### 인스턴스 변수
- 클래스 내부 & 모든 메서드 바깥에 선언된 변수
- 스코프 
  - static 메서드를 제외한 클래스 전체
```java
public class Prac {
    int a = 0;
    
    public static void main(String[] args) {
        System.out.println(a);
    }
}
```
- java: non-static variable a cannot be referenced from a static context -> static 메서드는 제외 
- 라이프타임
  - 인스턴스가 생성될 때부터 인스턴스 객체가 메모리에 있을때 까지

### 클래스 변수 
- 클래스 내부 & 모든 블럭 바깥에 & static 으로 선언된 변수
- 스코프 
  - 클래스 내부 전체
```java
public class Prac{
    static int a = 0;
    
    public static void main(String[] args) {
        System.out.println(a);
    }
    
    public void hello() {
        System.out.println(a);
    }
}
```

### 지역변수 
- 인스턴스나 클래스 변수가 아닌 모든 변수
- 스코프 
  - 선언된 블럭 내에서 
- 라이프타임
  - 선언된 블록에서 제어권이 떠날때 까지 
  - 예를들어 메서드 안에 선언된 지역변수라고 하면 그 메서드가 사용되기 시작하면서부터 사용 종료 될떄까지

```java
public class Prac {
    public void scope() {
        int i = 0;
    }
}
```

## 타입변환, 캐스팅 그리고 타입 프로모션
- 캐스팅
  - 강제로 타입을 변경하는 경우
  - 자료형의 크기가 큰 것을 작은 것에 강제로 넣는 행위
  - 표현 범위가 더 좁은쪽으로의 자동 형변환(묵시적형변환)
```java
public static void main(String[] args) {
        int a = 10;
        byte b = (byte) a;
        System.out.println(b);

        int c = 1010101010;
        byte d = (byte) c;
        System.out.println(d);
        }
```
- 결과 10 / 18 나온다.
- 크기가 큰 int형 값을 크기가 작은 byte형에 강제 캐스팅
- 첫번째는 int 형이지만 byte의 크기 내의 값을 할당한 후 캐스팅을 한 경우
  - byte 크기 내의 값을 할당하였기에 값으 변화가 없이 그대로 10 출력
- 두번째는 byte의 크기 외의 값을 할당한 후 캐스팅
  - byte의 크기 외의 값을 할당하였기 때문에 값의 변화가 일어남

- 프로모션
  - 묵시적으로 타입이 변경되는 경우
  - 캐스팅과 반대로 작은 자료형을 큰 자료형에 할당하는 경우 자바에서는 이런경우 데이터를 묵시적으로 변경

```java
public static void main(String[] args) {
    byte a = 10;
    int b = a;
    System.out.println(b);
        }
```
- 결과 10
- int 보다 작은 byte에 값을 할당한 뒤 int변수에 할당하는 코드
- 데이터가 변형되지 않고 그대로 할당되어 출력


## 1차 및 2차 배열 선언하기
- 배열
  - 같은 타입의 변수를 연속적인 메모리 공간에 적재하는 자료구조
  - 같은 타입의 여러변수를 하나의 묶음으로 다루는것

### 1차배열
- 배열의 시작은 0부터 시작한다.
```java
intArrays[0] = 0;
intArrays[1] = 1;
intArrays[2] = 5;
intArrays[3] = 3;
intArrays[4] = 1;
```
- 배열선언
  - 변수를 선언할때 []와 함께 사용하여 선언
```java
int[] int Arrays;
int intArrays[];
```
- 배열초기화
  - 배열을 초기화할 때 배열의 사이즈를 할당
```java
int[] intArrays = new int[5];
```
- 배열 선언 초기화 동시
```java
int[] intArrays = {0,1,2,5,1}
```
- 배열의 크기를 5로 지정하고 값을 할덩한 것과 동일

---
### 2차배열

- 배열선언
```java
int[][] int Arrays;
int intArrays[][];
```

- 배열 초기화
```java
int[][] intArrays = new int [2][2];
```

- 값 할당
```java
intArrays[0][0] = 0 ;
intArrays[0][1] = 2 ;
intArrays[1][0] = 3 ;
intArrays[1][1] = 2 ;
```

- 선언 초기화 동시
```java
int[][] intArrays = {{0.1} , {1,4}}
```


---

- 배열은 순서가 있다. 0부터 시작 (index)
- 배열 선언 방법 1차) : 타입[ ] 변수이름; ( 타입 변수이름[ ] 도 가능하다 )
- 배열 선언 방법 2차) : 타입[ ][ ] 변수이름;
- 배열의 생성 : 변수이름 = new 타입[길이];
- 선언과 생성을 같이 한다면 타입[ ] 변수이름 = new 타입[길이]; 가 되겠다.
- 배열에 값 저장하기
1) 배열을 생성한 후 배열[i] = 값 이렇게 하나씩 넣어주는 방식 (for문 활용도 가능하다)
2) 배열의 생성과 값 저장을 한 번에) 타입[ ][ ] 변수이름; = new 타입[ ]{50, 60, 70, 80, 80}; (이 때 길이는 안 적어도 된다)
3) new new 타입[ ] 생략하기) 타입[ ][ ] 변수이름; = {50, 60, 70, 80, 80}; (단 이렇게 값을 넣으려면 배열을 선언할 때 해줘야 한다. ( int[] temp = new int[3]; temp = { 1, 3, 5 }는 불가능하다 )
## 타입추론, var
- 타입추론
  - 데이터타입을 명시하지 않아도 컴파일러가 데이터 타입을 추론하여 처리하는 것
  - Java 10 부터 지원되는 기능
  - 변수타입을 정확히 명시하지 않고 var로 선언하여 주입받은 값의 타입을 추론하여 변수로 활용 대표적으로 람다,제네릭에서 사용되고 있다.
```java
public class Prac {
    public static void main(String[] args) {
        int a = 3;
        var c :int = a;
        System.out.println(c+2);
    }
}
```
- 값 5

---

- var 는 키워드가 아니다.
- int 는 키워드라 변수로 쓸 수 없지만 var 는 변수로 사용가능하다.
- var는 지역변수에서만 선언가능하고 멤버 변수로 활용은 불가능하다.
- 조건
  - var는 로컬 변수에서만 사용가능
```java
public class Var{
    var test; // error
}
```
```java
public class Var{
    public void test() {
        var test1;  //error
        var test2 = "Var"; // String test2 = "Var" 와 동일
    }
}
```