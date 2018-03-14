import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

import Navigator from 'lib/Navigator'
import Store from 'lib/Store'
import App from 'App'
import Login from 'pages/Login'
import Dashboard from 'pages/Dashboard'
import Employees from 'pages/admin/Employees'

ReactDOM.render((
  <Provider store={Store}>
    <Router history={Navigator}>
      <Route path='/' component={App}>
        <IndexRoute component={Login} />
        <Route path='login' component={Login} />
        <Route path='dashboard' component={Dashboard} />
        <Route path='employees' component={Employees} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('website'))
