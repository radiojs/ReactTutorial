import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from '../components/layout/Layout';
import Home from '../modules/home/ui/Home';
import About from '../modules/about/ui/About';
import BlogList from '../modules/blog/ui/BlogList';

const AppRouter = () => (
    <Router>
        <Layout>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" exact component={About} />
                <Route path="/blogs" exact component={BlogList} />
            </Switch>
        </Layout>
    </Router>
);

export default AppRouter;
