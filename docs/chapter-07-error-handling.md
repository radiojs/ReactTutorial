# Error handling

## Log4js

서버에서 오류를 처리하기 위해서는 logging framework를 구축해야 한다.  
다양한 프레임워크가 있는데, 그 중에서 우리는 `log4js`를 선택한다.

다음 패키지를 추가하여 설치한다.

```
    $ yarn add log4js
```

`server/config/log4js` 파일에 설정을 저장하고 사용한다.


## File NOT found

라우팅 주소가 잘못되어 존재하지 않는 페이지를 요청하는 경우를 처리한다.

먼저 `src/modules/misc/NotFound.js` 파일을 만든다. 이 페이지는 화면 UI 용도로 사용한다.

```
    import React from 'react';
    import { Link } from 'react-router-dom';

    import Page from '../../components/layout/Page';

    class NotFound extends React.Component {
        render() {
            return (
                <Page title="NotFound">
                    <h1>Path Not Found</h1>
                    <p><Link to="/">Move to Home</Link></p>
                </Page>
            );
        }
    }

    export default NotFound;
```

그리고 `src/app/Router.js` 파일에 다음을 Switch 문의 가장 마지막에 추가한다:

```
    ...
    <Switch>
        <Route path="/" exact component={Home} />
        ...

        <Route component={NotFound} />
    </Switch>
```

## Error boundaries

React 컴포넌트에서 발생하는 오류를 특정한 영역 내부로 제한하기 위하여 도입된 개념이 Error Boundaries 이다.

`src/modules/misc/ErrorBoundary.js` 파일을 작성한다. 그리고 `src/app/Router.js` 파일에 이 컴포넌트를 추가한다:

```
    const AppRouter = () => (
        <Router>
            <ErrorBoundary>
                <Layout>
                    ...
                </Layout>
            </ErrorBoundary>
        </Router>
    );
```

이렇게 하면 Layout 컴포넌트 이하에서 발생하는 exception을 catch 하여 화면에 보여준다.

하지만, 여기에 동작하지 않는 경우도 있다:

* Event handler
* 비동기 코드
* Server side rendering
* Error boundary 자체에서 발생한 오류

그러므로, 여기에 전적으로 의존할 수는 없다. 
다만, 발생한 오류를 특정한 영역으로 제한하여 앱 전체를 사용 불가로 만드는 현상은 피할 수 있다.
