# Routing

`react-router` 패키지를 이용하여 라우팅 기능을 구현한다.

## 설치

```
    $ yarn add react-router-dom
```

## 파일 구조

`/src` 경로의 하위에 다음과 같은 디렉토리 구조를 만든다:

```
    /app
        App.js
        App.scss
        Router.js
    /css
        _variables.scss
    /modules
        /about
            /ui
                About.js
        /blog
            /ui
                BlogList.js
        /home
            /ui
                Home.js
```

`/src` 디렉토리에 있던 App 관련 소스를 `/src/app` 디렉토리로 이동하고 
여기에 `Router.js` 파일을 추가한다.

`Router.js` 파일의 내용은 다음과 같다:

```
    import React from 'react';
    import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

    import Home from '../modules/home/ui/Home';
    import About from '../modules/about/ui/About';
    import BlogList from '../modules/blog/ui/BlogList';

    const AppRouter = () => (
        <Router>
            <nav>
                <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/blogs">Blog list</Link></li>
                </ul>
            </nav>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/blogs" exact component={BlogList} />
            </Switch>
        </Router>
    );

    export default AppRouter;
```

`About.js`, `BlogList.js`, `Home.js` 파일은 단순한 React 컴포넌트 파일로 구성한다.
`Home.js` 파일의 내용은 다음과 같다:

```
    import React from 'react';

    class Home extends React.Component {
        render() {
            return (
                <div>Home</div>
            );
        }
    }

    export default Home;
```

마지막으로 `App.js` 파일의 내용을 모두 삭제하고 다음과 같이 구성한다:

```
    import React from 'react';

    import Router from './Router';
    import './App.scss';

    const App = () => (
    <div className="App">
        <Router />
    </div>
    );

    export default App;
```

앱을 실행하면, 화면 상단의 네비게이션 링크를 클릭함에 따라서 화면의 내용이 변경되는 것을 볼 수 있다.

