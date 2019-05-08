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
