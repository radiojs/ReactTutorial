import React from 'react';

import Page from '../../../components/layout/Page';

class BlogList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            loading: false,
            blogs: [],
        };
    }

    async componentDidMount() {
        this.setState({ loading: true });
        try {
            const result = await fetch('/api/blogs');
            if (result) {
                const json = await result.json();
                if (json.blogs) {
                    this.setState({ loading: false, blogs: json.blogs });
                }
            }
        } catch (ex) {
            console.log('fetch error', ex);
        }
    }

    render() {
        const { loading, blogs } = this.state;

        return (
            <Page title="BlogList">
                <h1>Blog list</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    blogs && blogs.map(doc => (
                        <p key={doc._id}>{doc.title}</p>
                    ))
                )}
            </Page>
        )
    }
}

export default BlogList;
