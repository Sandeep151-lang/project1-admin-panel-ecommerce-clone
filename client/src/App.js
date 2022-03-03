import React, { useReducer } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomePage from './component/HomePage'
import 'bootstrap/dist/css/bootstrap.css';
import CreaProduct from './component/CreateProduct';
import Navs from './component/Navs';
import About from './component/About';
import AdminLogin from './component/AdminLogin';
import AdminRegister from './component/AdminRegister';
import AdminDashboard from './component/AdminDashboard';
import ProductDetails from './component/ProductDetails';
import Logout from './component/Logout';
import Products from './component/Products'
import { initialState, reducer } from './reducer';
import 'bootstrap/dist/css/bootstrap.min.css';




export const MyContext = React.createContext();
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <>
    <Router>
      <MyContext.Provider value={{ state, dispatch }}>
        <Navs />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path="/Create" component={CreaProduct} />
          <Route path="/About" component={About} />
          <Route path="/Admin/login" component={AdminLogin} />
          <Route path="/Admin/register" component={AdminRegister} />
          <Route path="/Admin/dashboard" component={AdminDashboard} />
          <Route path="/Logout" component={Logout} />
          <Route path="/Products/:_id" component={ProductDetails} />
          <Route path="/Products" component={Products} />
          <Redirect to="/" />
        </Switch>
      </MyContext.Provider>
    </Router>
  </>
}

export default App
