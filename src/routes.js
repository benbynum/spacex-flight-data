import 'babel-polyfill'
import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import LaunchList from './components/ui/LaunchList'
import Options from './components/ui/Options'

const routes = (
    <Router history={hashHistory}>
        <Route path="/" component={LaunchList} />
        <Route path="/" component={Options} />
        <Route path="launch-list" component={LaunchList} />
    </Router>
)

export default routes