# CRUD 기본구조

### CRUD #0.

H2 데이터베이스, JPA 환경 설정(applecation.properties), domain과 com.sparta.week_03.service 패키지를 만든다.

### CRUD #1.

CourseRepository 만들기(com.sparta.week_03.domain 안에 Interface로 CourseRepository.java 생성) -JPA사용 준비

### CRUD #2.

테이블 생성(com.sparta.week_03.domain 안에 Course.java) - Annotation 작성

### CRUD #2-1.

테이블 생성(위 CURD #2. 작성한 이후에 public class Course 안에 작성)
--@Getter // Getter를 밑에 작성 안해도 됨!
@NoArgsConstructor // 기본생성자를 대신 생성해줍니다.
@Entity

### CRUD #2-2.

Getter를 lombok으로 바꿔도 됨. @Getter

### CRUD#3.

CREATE 구현 준비(Week-2Application.java)

### CRUD#4.

READ(Week-2Application.java)

### CRUD#5.

Timestamped 만들기. 업데이트 시 시간기록 해야하니까.(Timestamped.java 생성)

### CRUD#6.

Timestamped 상속받기(Course.java - public class Course extends Timestamped)

### CRUD#6-1.

EnableJpaAuditing 추가! @EnableJpaAuditing(Week-2Application.java)

### CURD#7.

update메소드 추가(Course.java)

### CRUD#8.

Update 구현을 위한 com.sparta.week_03.service 부분 작성(CourseService.java)

<핵심코드>

```java

private final MemoRepository memoRepository; 
//final은 필수적으로 입력! final = 필수적으로 가져와라.
// 스프링이 memorepository를 이용해서  데이터를 가져오게 하려면 final 필수임!!

public Long update(Long id, MemoRequestDto requestDto) { 
//update#2. 메소드 선언하기. id와 requestDto를 가져온다.

Memo memo = memoRepository.findById(id).orElseThrow( 
//id를 갖고 해당 콘텐츠(memo)를 찾고, 그 콘텐츠를 수정해야 하므로 findById 메소드 사용.
//이를 위해서는 jpa 기능 갖고있는 MemoRepository를 이용해야 함.
//id를 찾을 수 없을 땐 어떻게 할지 정해주는 orElseThrow도 필수!!
//id를 통해 찾은 콘텐츠를 memo에 저장하고, 이를 requestDto로 update해주고, 변경된 memo의 id값을 반환해준다!!
//ex) id=1로 찾았으면 콘텐츠를 수정하고, 수정이 성공적으로 이루어지면 id=1 반환하기!!
() -> new IllegalArgumentException("아이디가 존재하지 않습니다.")
);
memo.update(requestDto);
return memo.getId(); // id를 return하기 때문에 반환타입은 Long!!
}

CRUD#8-1. @Service // MemoService가 Service임을 알려주기 위해서 작성

CRUD#8-2. @RequiredArgsConstructor 작성해주기. final memorepository처럼 final 입력된 것이 있으면 반드시 작성.

CRUD#8-3. @Transactional // update메소드를 쓸 때 이거 DB에 꼭 반영해야된다는 의미에서 쓰는것!!
```

### CRUD#9.

UPDATE(Week02Application.java)

### CRUD#10.

DELETE(Week02Application.java)

### CRUD#11.

DTO 만들기(CourseRequestDto.java) - Getter, Setter, RequiredArgsConstructor 추가

### CURD#12.

Week02Application.java에 DTO 적용하기

```java

Course new_course = new Course("웹개발의 봄, Spring", "임민영");
courseService.update(1L, new_course);

CourseRequestDto requestDto = new CourseRequestDto("웹개발의 봄, Spring", "임민영");
courseService.update(1L, requestDto);
```

### CRUD#13.

CourseService.java에 DTO 적용하기

```java

public Long update(Long id, Course course) {
Course course1 = courseRepository.findById(id).orElseThrow(
() -> new IllegalArgumentException("해당 아이디가 존재하지 않습니다.")
);
course1.update(course);
return course1.getId();
}

public Long update(Long id, CourseRequestDto requestDto) {
Course course1 = courseRepository.findById(id).orElseThrow(
() -> new IllegalArgumentException("해당 아이디가 존재하지 않습니다.")
);
course1.update(requestDto);
return course1.getId();
}
```

### CRUD#14.

Course.java에 DTO 적용하기

```java

public void update(Course course) {
this.title = course.title;
this.tutor = course.tutor;
}

public void update(CourseRequestDto requestDto) {
this.title = requestDto.getTitle();
this.tutor = requestDto.getTutor();
}
```

### CRUD#15.

CourseContoller.java 생성

- GET 생성

```java

//Update를 위해서는 Service가 필요하고, Create, Read, Delete를 위해서는 Repository가 필요함.
@RestController 
//다른데서 MemoController 사용할 일 있을 때 new MemoController 이런거 입력 안하도록 만들어줌.
—GET 생성
@GetMapping("/api/courses")
public List<Course> getCourses() {
return courseRepository.findAll();
}
```

- POST 생성

```java

@PostMapping("/api/courses")
public Course createCourse(@RequestBody CourseRequestDto requestDto) {
Course course = new Course(requestDto);
return courseRepository.save(course);
}

//이렇게 하면 new Course(requestDto)부분에 빨간줄 생김
//--->Course.java에 생성자 추가해줘야 함.
public Course(CourseRequestDto requestDto){
this.title = requestDto.getTitle();
this.tutor = requestDto.getTutor();
}
```

- PUT 생성

```java

@PutMapping("/api/courses/{id}")
// @PathVariable = /api/courses/{id} 의 id가 Long id의 id임을 알려주기 위한 것!!
public Long updateCourse(@PathVariable Long id, 
												@RequestBody CourseRequestDto requestDto) {

		return courseService.update(id, requestDto);

}
```

- DELETE 생성