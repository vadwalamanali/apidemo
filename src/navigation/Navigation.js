import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from '../authContext/AuthContext'
import Landing from '../landing/Landing'
import ShareData from '../shareData/ShareData'
import Register from '../register/Register'
import Header from '../header/Header'
import ProtectedRoute from '../protectedRoute/ProtectedRoute'


const Navigation = () => (
  <div>
    <Router>
      <AuthProvider>
        <Header />
        <Switch>
          <ProtectedRoute path="/sharedata" component={ShareData} />
          <Route path="/login" component={Register} />
          <Route path="/" component={Landing} />
        </Switch>
      </AuthProvider>
    </Router>
  </div>
)

export default Navigation;
