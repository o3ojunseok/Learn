# Transaction

## 트랜잭션?

- 데이터베이스 내에서 하나의 그룹으로 처리되어야 하는 명령문들을 모아 놓은 논리적인 작업 단위
- 즉 데이터베이스에 접근하는 경우 (SELECT, DELETE, UPDATE, INSERT)
- All or Nothing
- 여러 개의 명령어의 집합이 정상적으로 처리되면 정상 종료되며, 하나의 명령어라도 잘못되면 전체 취소된다.
- 특징
    - Atomicity 원자성
        - 트랜잭션이 데이터베이스에 모두 반영되던가 아니면 전혀 반영되지 않아야 한다.
    - Consistency 일관성
        - 트랜잭션의 작업 처리 결과가 항상 일관성이 있어야 한다.
    - Isolation 독립성
        - 둘 이상의 트랜잭션이 동시에 병행 실행되고 있을 경우 어느 하나의 트랜잭션이라도 다른 트랜잭션의 연산에 끼어들 수 없다.
    - Durability 지속성
        - 트랜잭션이 성공적으로 완료되면 결과는 영구적으로 반영되어야 한다.
- Commit
    - 한 개의 논리적 단위에 대한 작업이 성공적으로 끝나 데이터베이스가 다시 일관된 상태에 있을 때 이 트랜잭션이 행한 갱신 연산이 완료된 것을 트랜잭션 관리자에게 알려주는 연산
- RollBack
    - 하나의 트랜잭션 처리가 비정상적으로 종료되어 데이터베이스의 일관성을 깨뜨렸을때 이 트랜잭션의 일부가 정상적으로 처리되었더라도 트랜잭션의 원자성을 구현하기 위해 이 트랜잭션이 행한 모든 연산을 취소 (Undo)한다.

## 사용이유

- 데이터의 일관성을 유지하면서 안정적으로 데이터를 복구하기 위함이다. 데이터베이스에선 테이블에서 데이터를 읽어온 후 다른 테이블에 데이터를 입력하거나 갱신, 삭제하는데 처리 도중 오류가 발생하면 모든 작업을 원상태로 되돌린다. 처리 과정이 성공했을 때만 최종적으로 데이터베이스에 반영한다.