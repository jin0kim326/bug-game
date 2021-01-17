# bug-game

**카운트시간내에 벌레를 피해 당근을 모두 클릭해야 이기는 게임**

해당프로젝트는 개인공부를 위해 만들어졌으며 간단한 html,css를 통해 보이는 부분을 작성하고 그 외 기능적인 요소는 모두 순수 vanila javascript로 만들었습니다.

![시연동영상](https://www.youtube.com/watch?v=yRTNg0NkKh8)
<audio controls src="movie/bug-gametest"></audio>

#### 프로젝트 개요

- 게임 시작 버튼 클릭시 게임이 시작되며 보이는 당근들을 모두 클릭하면 승리! 제한시간이 초과되거나 벌레를 클릭하게되면 패배!

</br>

### 프로젝트 주요 프로세스(기능)

- 게임의 시작,종료 (boolean 변수를 이용해서 게임상태를 체크)
- 벌레,당근의 랜덤 배치 (당근클릭시 스코어 증가, 스코어와 최초개수가 같으면승리 / 벌레클릭시 패배 )
- 게임상태에 따른 시작버튼, 타이머, 스코어보드 visibility 설정
- 승,패,중지에 따른 리플레이 팝업 visibility 설정
- 이벤트에 따른 사운드 진행

### 프로젝트 완성후 개선한점

- Builder Pattern을 이용하여 직관적으로 코드 작성

```
const game = new GameBuilder()
  .withGameDuration(10)
  .withCarrotCount(10)
  .withBugCount(10)
  .build();
```

</br>

- 모듈화 (최초 프로그램완성시 한 js파일에 모든 함수들이 존재했지만 기능별로 js파일을 나누어 모듈화진행)

### 생각되는 개선방향

- 난이도별로 벌레,당근,타이머를 다르게 설정하여 여러 사용자에게 다양한 플레이 방식제공
