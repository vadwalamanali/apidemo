import React from 'react'
import { BrowserRouter as Router,
Route, Redirect } from 'react-router-dom';

const AuthContext = React.createContext()
let val = {};

class AuthProvider extends React.Component {
  state = { validUser: false }
  constructor() {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }
  login(event) {
    event.preventDefault();
    if((document.querySelector("#email").value === "") && (document.querySelector("#password").value === "")) {
      return false
    } else if(document.querySelector("#password").value === "") {
      document.querySelector("#password").style.borderColor = 'red';
    } else {
      val.email = document.querySelector("#email").value;
      val.password = document.querySelector("#password").value;
    }
    return fetch('https://reqres.in/api/register', {
        method:'POST',
        body: JSON.stringify(val),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          validUser: true,
          data:responseJson
        });
        //console.log(this.state.data);
        localStorage.setItem("validUser", true)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  logout() {
    this.setState({ validUser: false })
    localStorage.removeItem("validUser")
  }

  render() {
    return (
      <div>
      <AuthContext.Provider
        value={{
          validUser: this.state.validUser,
          login: this.login,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
      {
            this.state.validUser  && (<Redirect to={{
            pathname: "/sharedata",
            state: { validUser: this.state.validUser }
          }}/>)
      }
    </div>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
export default AuthContext
