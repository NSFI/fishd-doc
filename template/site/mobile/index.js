/* eslint-disable */
import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'
import { Router, hashHistory, Route, IndexRoute, Redirect } from 'react-router'

import Layout from './pages/Layout'
import Home from './pages/Home'
import Demo from './pages/Demo'
import './styles/base.less'

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Route path="/components/:demo" component={Demo}></Route>
    <Redirect from="*" to="/" />
  </Route>
)

const App = () => (
  <Router history={hashHistory}>
    {routes}
  </Router>
)

const Gvm = hot(module)(App)

render(<Gvm />, document.getElementById('app'))
