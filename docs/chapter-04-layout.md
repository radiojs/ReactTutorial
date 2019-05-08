# Layout

이전의 라우팅 기능의 구현으로 화면간의 이동이 가능해졌다.  
이제 각 화면의 공통부분을 관리하는 기능을 구현해보자.  

소스의 `app/Router.js` 파일은 `nav` 태그로 구성된 부분과 `Route` 태그로 구성된 부분으로 이루어져 있다.  
`nav` 태그 부분이 네비게이션 영역에 속한다. 이 영역은 모든 페이지에 동일하게 존재한다.
또한 각 페이지 영역도 좀 더 구조화할 수 있다. 예를 들면, `header`와 `footer`, 그리고 내용 영역으로 구성할 수 있다.

## Layout 페이지 구성

`components/layout` 디렉토리에 `Layout.js`, `Page.js` 파일을 만든다.

`Layout.js` 파일은 모든 페이지에 공통으로 적용하는 레이아웃을 구성한다. 

```
    import React from 'react';
    import { Link } from 'react-router-dom';

    class Layout extends React.Component {
        render() {
            const { children } = this.props;
            return (
                <div className="Layout">
                    <nav>
                        <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/blogs">Blog list</Link></li>
                        </ul>
                    </nav>
                    {children}
                </div>
            )
        }
    }

    export default Layout;
```

이 파일은 `app/Route.js` 파일에서 `<nav>...` 코드 부분을 대체한다.

`Page.js` 파일은 각 페이지의 공통 구조를 잡는다.

```
    import React from 'react';

    class Page extends React.Component {
        render() {
            const { title, children } = this.props;
            return (
                <div className="Page">
                    <header>{title}</header>
                    <main>{children}</main>
                    <footer>
                        <div className="copy-right">
                            &copy; 2019 Radio JS. All rights reserved.
                        </div>
                    </footer>
                </div>
            )
        }
    }

    export default Page;
```

이 파일은 모든 페이지를 구성하는 화면의 기본 요소로 구성한다.

`Home.js` 파일에 적용한 모습은 다음과 같다. 다른 페이지도 동일하게 적용한다.

```
    import React from 'react';

    import Page from '../../../components/layout/Page';

    class Home extends React.Component {
        render() {
            return (
                <Page title="Home">
                    Home Content
                </Page>
            );
        }
    }

    export default Home;
```


