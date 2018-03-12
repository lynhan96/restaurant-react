import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

import Navigator from 'lib/Navigator'
import Store from 'lib/Store'
import App from 'App'
import HomePage from 'pages/HomePage'
import Page from 'pages/Page'
import Validation from 'pages/Validation'
import ListCategory from 'pages/ListCategory'
import ListSet from 'pages/ListSet'
import ListQuestion from 'pages/ListQuestion'
import ListResult from 'pages/ListResult'
import ThankYou from 'pages/ThankYou'
import Login from 'pages/Login'
import AdminUsers from 'pages/admin/Users'
import AdminPages from 'pages/admin/Pages'
import AdminSets from 'pages/admin/Sets'
import AdminQuestions from 'pages/admin/Questions'
import EditPage from 'pages/admin/EditPage'
import EditSet from 'pages/admin/EditSet'
import EditQuestion from 'pages/admin/EditQuestion'
import 'styles/website.less'

ReactDOM.render((
  <Provider store={Store}>
    <Router history={Navigator}>
      <Route path='/' component={App}>
        <IndexRoute component={HomePage} />
        <Route path='homepage' component={HomePage} />
        <Route path='p/:page' component={Page} />
        <Route path='validation' component={Validation} />
        <Route path='list-category' component={ListCategory} />
        <Route path='list-set' component={ListSet} />
        <Route path='list-question' component={ListQuestion} />
        <Route path='list-result/:setID' component={ListResult} />
        <Route path='thank-you' component={ThankYou} />

        <Route path='login' component={Login} />
        <Route path='admin' component={AdminUsers} />
        <Route path='admin/users' component={AdminUsers} />
        <Route path='admin/pages' component={AdminPages} />
        <Route path='admin/pages/form/:pageID' component={EditPage} />
        <Route path='admin/sets' component={AdminSets} />
        <Route path='admin/sets/form' component={EditSet} />
        <Route path='admin/sets/form/:setID' component={EditSet} />
        <Route path='admin/questions/:setID' component={AdminQuestions} />
        <Route path='admin/questions/:setID/form/:questionID' component={EditQuestion} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('website'))
