import React from 'react';

import Page from '../../../components/layout/Page';

class BlogList extends React.Component {
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
        )
    }
}

export default BlogList;
