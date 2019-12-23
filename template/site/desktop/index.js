/* eslint-disable */
import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'
import { Router, hashHistory, Route, IndexRoute, Redirect } from 'react-router'

import Home from './pages/Home'
import Components from './pages/Components'
import Demo from './pages/Demo'
import Layout from './pages/Layout'

import 'ppfish/es/assets/css/index.less'
import './styles/index.less'

// TODO: 国际化
const routes = (
  <Route path="/" component={Layout}>
    <Route path="/home" component={Home}/>
    <Route path="/components" component={Components}>
      <IndexRoute component={Demo}/>
      <Route path=":demo" component={Demo}/>
    </Route>
    <Redirect from="*" to="/home" />
  </Route>
)

const App = () => (
  <Router history={hashHistory}>
    {routes}
  </Router>
)

const Gvm = hot(module)(App)

render(<Gvm />, document.getElementById('app'))
