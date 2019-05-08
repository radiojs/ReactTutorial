# Backend Integration

`Create-react-app` 을 이용하여 React 프로젝트를 만들고, 여기에 서버도 함께 연결한다.

여기서 서버는 Express 기반의 Node.js 서버를 연동하기로 한다.

## 서버 코드 작성

`server` 디렉토리에 서버 코드를 작성한다. 

```
    import express from 'express';

    const app = express();
    const PORT = 4000;

    // setup routing
    const router = express.Router();
    router.get('/api/blogs', (req, res) => {
    const result = {
        blogs: [{
        _id: 1,
        title: 'Seoul',
        }, {
        _id: 2,
        title: 'Tokyo',
        }, {
        _id: 3,
        title: 'London',
        }, {
        _id: 4,
        title: 'Paris',
        }],
    };
    res.status(200).json(result);
    });

    app.use(router);

    // enable CORS
    app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });

    app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
    });

```

여기서 서버는 포트번호 4000 으로 접속하게 구성한다. 또한 CORS 를 가능하게 설정한다.

API URI 는 `/api/blogs` 하나만 구현한다. 이 요청은 blog 목록 데이터를 JSON 형태로 리턴한다.

`package.json` 파일에 서버를 구성하고, 구동하는 기능을 추가한다. 

우선, Babel 관련 패키지를 추가하고, 그 설정 파일 `babel.config.js`을 추가하여 ES6 기반의 서버 코드를 수용하게 설정한다.
서버의 실행은 `yarn start-server` 명령으로 구동시킨다. 

## 클라이언트 코드 작성

`/src/modules/blog/ui/BlogList.js` 파일에 서버로부터 데이터를 요청하는 코드를 추가한다.

```
    ...
    async componentDidMount() {
        this.setState({ loading: true, error: null });
        try {
            const result = await fetch('/api/blogs');
            if (result) {
                const json = await result.json();
                if (json.blogs) {
                    this.setState({
                        loading: false,
                        data: {
                            blogs: json.blogs,
                        },
                    });
                }
            }
        } catch (ex) {
            this.setState({ loading: false, error: 'error_fetch' });
        }
    }
```

componentDidMount 메서드에서 서버에 `fetch(...)` 함수를 이용하여 데이터를 요청한다. 
이 때, 매개변수 값을 URL 주소 전체를 지정하지 않고, URI 주소만 추가했다. 
이것은 `package.json` 에 `proxy` 속성을 지정함으로써 가능하게 되었다.

fetch 함수 호출의 전 후로 화면을 다르게 그리는 기능 등을 추가로 구현한 다음,
서버를 먼저 구동하고, 클라이언트를 구동하여 정상 작동하는 지를 확인한다.

