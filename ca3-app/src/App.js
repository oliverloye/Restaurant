
//Har lagt de forskellige komponenter i klasser
//for sig selv, og importeret til App.js

import React, { Component } from "react"
import facade from "./apiFacade";
import Data from './Data.js';
import Admin from './Admin.js';
import User from './User.js';
import Home from './Home.js';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", newuser: "", newpw: "", newpw2: "", msg: "" }
  }

  login = (evt) => {
    evt.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  onChange = (evt) => {
    this.setState({ [evt.target.id]: evt.target.value, msg: "" })
  }

  addNew = (event) => {
    event.preventDefault();
    if (this.state.newpw !== this.state.newpw2) {
      this.setState({ msg: "Your passwords must match" })
      event.target.reset();
    } else {
      this.props.addNew(this.state.newuser, this.state.newpw);
    }
  }

  render() {
    return (
      <div>
        <Header user={this.state.dataFromServer} logout={this.props.logout} />
        <br/>
        <form onSubmit={this.login} onChange={this.onChange} >
          <fieldset>
            <legend>Login:</legend>
            <input placeholder="User Name" id="username" />
            <input placeholder="Password" id="password" />
            <button>Login</button>
          </fieldset>
        </form>
        <br></br>
        <form onSubmit={this.addNew} onChange={this.onChange} >
          <fieldset>
            <legend>New user? Register here:</legend>
            <input placeholder="User Name" id="newuser" />
            <input placeholder="Password" id="newpw" />
            <input placeholder="Repeat password" id="newpw2" />
            <button>Login</button>
          </fieldset>
        </form>
        <p>{this.state.msg}</p>

      </div>
    )
  }
}

class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = { dataFromServer: "Fetching!!" };
  }

  componentDidMount() {
    facade.fetchData().then(res => this.setState({ dataFromServer: res }));

  }
  render() {
    return (
      <div>
        <Header user={this.state.dataFromServer} logout={this.props.logout} />
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false }
  }

  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  } 

  login = (user, pass) => {
    facade.login(user, pass)
      .then(res => this.setState({ loggedIn: true }));
  } 

  addNew = (user, pass) => {
    facade.addNew(user, pass)
      .then(res => this.setState({ loggedIn: true }));
  } 

  render() {
    return (
      <div>
        {!this.state.loggedIn ? (<LogIn login={this.login} addNew={this.addNew} />) :
          (<div>
            <LoggedIn logout={this.logout} />
            {/* <Link to="/" onClick={this.logout}>Logout</Link> */}
            {/* <button onClick={this.logout}>Logout</button> */}
          </div>)}
      </div>
    )
  }
}

export function Header(props) {
  
   
  //Nedenstående var bare for at se hvordan jeg fik fat i rollen gemmen token
  //-kan ikke få det til at virke. 
  
  let jwt = localStorage.jwtToken;
  console.log(localStorage.jwtToken);
  let jwtData = jwt.split('.')[1]
  let decodedJwtJsonData = window.atob(jwtData)
  let decodedJwtData = JSON.parse(decodedJwtJsonData)
  let role = decodedJwtData.roles
  
  
  console.log('jwtData: ' + jwtData)
  console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
  console.log('decodedJwtData: ' + decodedJwtData)
  console.log('role: ' + role) //siger undefined
 

  return (
    <Router>
      <div>
        <ul className="header">
          <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
          <li><NavLink activeClassName="active" to="/data">Data</NavLink></li>
          <li><NavLink activeClassName="active" to="/user">User</NavLink></li>
          <li><NavLink activeClassName="active" to="/admin">Admin</NavLink></li>
          <li><NavLink activeClassName="active" to="/logout" onClick={props.logout}>Logout</NavLink></li>
          <div className="nav-right"><li><p>{props.user}</p></li></div>
        </ul>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/data" component={Data} />
          <Route path="/user" component={User} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </div>
    </ Router>
  )
}

export default App;
