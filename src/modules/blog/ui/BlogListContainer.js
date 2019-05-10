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
