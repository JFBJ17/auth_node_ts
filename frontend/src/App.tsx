import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Homepage from './Pages/Homepage';
import AdminPage from './Pages/AdminPage';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Register from './Pages/Register';
import { myContext } from './Pages/Context';

function App() {

  const ctx = useContext(myContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        {
          ctx ? (
            <>
              {ctx.isAdmin ? <Route path="/admin" component={AdminPage} /> : null}
              <Route path="/profile" component={Profile} />
            </>
          ) : (
            <>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </>
          )
        }
      </Switch>
    </BrowserRouter>
  )
}

export default App
