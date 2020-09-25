# 과제 설명

react native & redux & redux-saga 세팅이 된 프로젝트입니다. 

- `redux.js` 

스토어를 만들고 사가 미들웨어를 부착만 하는 부분입니다.

스토어의 형태는 다음과 같습니다.

```ts
store = {
    root: {
        data: Array<String>,
        token: String
    }
}
```

- `reducer.js`

`root` 리듀서를 만듭니다. 다음과 같은 액션들로 이루어져있습니다.

- `data`에 값을 추가하는 `ADD_DATA` 액션 그리고 이 액션을 만드는 액션 크리에이터 `addData`
- `token` 값을 설정하는 `SET_TOKEN` 액션 그리고 이 액션을 만드는 액션 크리에이터 `setToken`
- mock api에 요청해서 새 토큰을 가져오고 `SET_TOKEN` 액션을 트리거하는 `authGenerator` 사가 액션 그리고 이 액션을 트리거하는 액션 크리에이터 `auth`
- mock api에 요청해서 데이터를 가져오고 `ADD_DATA` 액션을 트리거하는 `fetchGenerator` 사가액션 그리고 이 액션을 트리거하는 액션 크리에이터 `fetch`


그리고 mockApi에 요청해서 새 토큰을 가져오는 

- `App.js`

메인 화면입니다. `fetch` 버튼과 `auth` 버튼이 있고 각각 같은 이름의 액션 크리에이터를 호출합니다. 현재 기본으로 토큰 값이 valid 하지 않아서 `fetch` 액션이 제대로 수행되지 않는 상태입니다. `auth` 버튼으로 토큰 재발급 과정이 진행되면 그 후에는 `fetch`가 제대로 이루어집니다. 

사용자가 수동으로 토큰 재발급 과정을 거치지 않고 api 요청이 발생했을 때 토큰이 만료된 경우 자동으로 토큰 재발급을 하고 다시 원래의 api 요청을 진행하는 자연스러운 흐름을 구현해주세요.

mock api도 리덕스 로직 코드도 많이 허술한 상태이니 코드 레벨의 구현이 불가능하시다면 의사코드로 설명해주셔도 됩니다.