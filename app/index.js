import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

import Navigator from 'lib/Navigator'
import Store from 'lib/Store'
import App from 'App'
import Login from 'pages/Login'
import Dashboard from 'pages/Dashboard'
import EmployeeList from 'components/admin/employees/EmployeeList'
import EmployeeView from 'components/admin/employees/EmployeeView'
import EmployeeEdit from 'components/admin/employees/EmployeeEdit'
import EmployeeCreate from 'components/admin/employees/EmployeeCreate'

import FoodCategoryList from 'components/admin/foodCategories/FoodCategoryList'
import FoodCategoryView from 'components/admin/foodCategories/FoodCategoryView'
import FoodCategoryEdit from 'components/admin/foodCategories/FoodCategoryEdit'
import FoodCategoryCreate from 'components/admin/foodCategories/FoodCategoryCreate'

ReactDOM.render((
  <Provider store={Store}>
    <Router history={Navigator}>
      <Route path='/' component={App}>
        <IndexRoute component={Login} />
        <Route path='login' component={Login}/>
        <Route path='dashboard' component={Dashboard} />

        <Route path='employees' component={EmployeeList} />
        <Route path='employee-view' component={EmployeeView} />
        <Route path='employee-edit' component={EmployeeEdit} />
        <Route path='employee-create' component={EmployeeCreate} />

        <Route path='food-categories' component={FoodCategoryList} />
        <Route path='food-category-view' component={FoodCategoryView} />
        <Route path='food-category-edit' component={FoodCategoryEdit} />
        <Route path='food-category-create' component={FoodCategoryCreate} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('website'))
