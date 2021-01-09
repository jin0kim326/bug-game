# bug-game

vanila javascript를 이용한 벌레게임

**카운트시간내에 벌레를 피해 당근을 모두 클릭해야 이기는 게임**

기능정의

- 카운트다운 (10s)
  => 게임스타트버튼을 누르면 설정한 시간카운트 10s
  => 생각나는 키워드 : javascript timer

- 이미지(벌레,당근) 랜덤 배치
  => 게임스타트버튼을 누르면 벌레10개, 당근10개 를 필드내에 랜덤하게 배치
  => 생각나는 키워드 : javascript clickevent, position : relative or absolute, DOM조작(엘리멘트추가)
- 벌레클릭 : GameOver
- 당근클릭 : 갯수카운트 10개->9개 ...
- Gameover, win -> restart
- BGM
