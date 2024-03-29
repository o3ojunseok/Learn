# JOIN
- 같은 의미를 가지는 컬럼의 값을 기준으로 테이블을 합칠 때 사용


## 종류
- INNER JOIN
  - default
  - 기본 조인 두 테이블 모두에 있는 값만 찾기 (교집합)
  
```SQL
SELECT column
FROM table
INNER JOIN tableB
ON table.column = tableB.columnB -- 값을 서로 연결 
WHERE 조건;
```
```SQL
SELECT *
FROM mypoketmon
INNER JOIN ability
ON mypocketmon.number = ability.number;
```

- LEFT JOIN
  - 왼쪽 테이블에 있는 값만 합치기

```SQL
SELECT column
FROM table
RIGHT JOIN tableB
ON table.column = tableB.columnB
WHERE 조건;
```

```SQL
SELECT *
FROM mypocketmon
LEFT JOIN ability
ON mypocketmon.number = ability.number;
```

- RIGHT JOIN
  - 오른쪽 테이블에 있는 값만 합치기
  
```SQL
SELECT *
FROM mypocketmon
RIGHT JOIN ability
ON mypocketmon.number = ability.number;
```
  - 좌우 기준으로 값이 없는거면 null로 나옴


- OUTER JOIN
  - 두 테이블에 있는 모든 값 합치기 (합집합) 
  - MYSQL에는 없음 그래서 LEFT JOIN 과 RIGHT JOIN 합친다. 
  - UNION 키워드 (두 쿼리 결과를 중복 제외하고 합쳐줌)

```SQL
SELECT column
FROM table
LEFT JOIN tableB
ON table.column = tableB.columnB;
UNION
SELECT column
FROM table
RIGHT JOIN tableB
ON table.column = tableB.columnB;
```

```SQL
SELECT *
FROM mypocketmon
LEFT JOIN ability
ON mypocketmon.number = ability.number
UNION
SELECT *
FROM mypocketmon
RIGHT JOIN ability
ON mypocketmon.number = ability.number;
```

- CROSS JOIN
  - 두 테이블에 있는 모든값을 가져옴 (각각 합쳐서)

```SQL
SELECT column
FROM table
CROSS JOIN tableB
WHERE 조건;
-- ON키워드 없어도됨
```

```SQL
SELECT *
FROM mypocketmon
CROSS JOIN ability;
```

- SELF JOIN
  - 같은 테이블에 있는 값 합치기 
  - 별칭 필요 (같은 테이블이라 구분하기가 어려움)
```SQL
SELECT column
FROM table AS t1
INNER JOIN table AS t2
ON t1.column = t2.columnB
WHERE 조건;
```

```SQL
SELECT *
FROM mypocketmon AS t1
INNER JOIN mypoecktmon AS t2
ON t1.number = t2.number;
```