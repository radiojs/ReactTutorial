# Style using SASS

## 설치

`node-sass` 패키지를 설치한다.  

```
    $ yarn add node-sass
```

`src/App.css` 파일명을 `src/App.scss` 로 변경한다. 
`src/App.js` 파일 내부에서 css 파일에 대한  `import` 문을 `.scss` 확장자로 변경한다.

`src/index.css` 파일명을 `src/index.scss` 로 변경한다.
`src/index.js` 파일 내부에서 css 파일에 대한 `import` 문을 `.scss` 확장자로 변경한다.

## Reset CSS

웹 브라우저마다 약간씩 차이가 나는 스타일을 통일하기 위하여 `normalize css` 기능을 다음 문장을 추가하여 구현한다.

```
    @import-normalize; /* bring in normalize.css styles */
```

이 문장은 `src/index.scss` 파일의 처음 부분에 추가하는 것이 좋다.

## Variables

SCSS 변수 정의만 모은 파일을 `css/_variables.scss` 파일명으로 만든다.

`src/index.scss`, `src/App.scss` 파일의 첫 부분에 다음 문장을 추가하여 사용한다:

```
    @import "css/variables";
```


