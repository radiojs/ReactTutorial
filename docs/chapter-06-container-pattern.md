# Container Pattern

React는 Component 기반의 앱 개발 시스템으로 이루어져 있다.  
Component란 화면에 보여주는 UI와 데이터를 가져오는 Process가 함께 존재한다는 의미이다.  
그런데, 개발이라는 과정이 수많은 컴포넌트를 생성하고 관리해야 하는 일이기 때문에
이 업무를 보다 효율적으로 수행해야 한다는 과제가 생긴다.
이를 위해서 UI와 Process를 분리해서 관리하는 것이 더 효율적이라고 생각을 하게 되었다.

그리하여, React Component를 개발할 때, UI만 처리하는 Component를 
Process를 처리하는 Container Component가 감싸는 형태로 구현하는 방식을 선호하게 되었다.

앞의 BlogList 컴포넌트를 이렇게 분리해보자.

```
    import React from 'react';

    import Page from '../../../components/layout/Page';

    const BlogList = ({ loading, data, error }) => (
        <Page title="BlogList">
            <h1>Blog list</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (error ? (
                <p>Error: check server connection</p>
            ) : (
                data.blogs && data.blogs.map(doc => (
                    <p key={doc._id}>{doc.title}</p>
                ))
            ))}
        </Page>
    );

    export default BlogList;
```

`BlogList.js` 파일은 서버로부터 데이터를 요청하여 받아오는 부분은 모두 제거한다.
Parent 컴포넌트로부터 `loading`, `data`, `error` 속성을 받아와서 화면이 뿌려주는 기능만 구현한다.

그리고 `BlogListContainer.js` 파일을 다음과 같이 만든다:

```
    import React from 'react';

    import BlogList from './BlogList';

    class BlogListContainer extends React.Component {
        constructor(props) {
            super(props);

            this.state = { 
                loading: false,
                data: {},
                error: null,
            };
        }

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

        render() {
            const { loading, data, error } = this.state;

            return (
                <BlogList loading={loading} data={data} error={error} />
            )
        }
    }

    export default BlogListContainer;

```

즉, 서버로부터 데이터를 가져오는 부분만 구현하고, 가져온 데이터를 화면에 그려주는 기능은 `BlogList` 컴포넌트에 전달하기만 한다.

이렇게 UI Component와 Process Component를 분리하면, 후에 소스를 수정하거나 업그레이드하는 경우에
보다 용이하게 소스 관리를 할 수 있게 된다.

특히, Process 컴포넌트에서 UI 컴포넌트로 전달하는 매개변수들 `loading`, `data`, `error` 등을 표준화하면 
더욱 편리한 관리가 가능해진다.

이제 `Router.js`에서 컴포넌트를 `BlogList`에서 `BlogListContainer`로 변경하고 서버와 앱을 재구동해보자.

정상적으로 앱이 동작하는 것을 확인할 수 있다.
