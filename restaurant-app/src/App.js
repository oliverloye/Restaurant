import React, { Component } from "react"
import facade from "./apiFacade";
import Data from './Data.js';
import Admin from './Admin.js';
import User from './User.js';
import Home from './Home.js';
import Restaurants from './Restaurants';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false, role: "" }
  }

  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  }

  login = (user, pass) => {
    console.log("Tester")
    facade.login(user, pass)
      .then(res => this.setState({ loggedIn: true }));
  }

  addNew = (user, pass) => {
    facade.addNew(user, pass)
      .then(res => this.setState({ loggedIn: true }));
  }

  render() {
    return (
      <Router>
        <div>
          {!this.state.loggedIn ? (<LogIn login={this.login} addNew={this.addNew} />) :
            (<div>
              <LoggedIn logout={this.logout} />
            </div>)}
        </div>
      </Router>
    )
  }
}

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
        <br />
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

function Header(props) {
  let role = "";
  if (localStorage.jwtToken) {
    let jwt = localStorage.jwtToken;
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    role = decodedJwtData.roles
  }
  console.log('role: ' + role)
  if (role === "user") {
    return (
      <Router>
        <div>
          <ul className="header">
            <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
            <li><NavLink activeClassName="active" to="/data">Data</NavLink></li>
            <li><NavLink activeClassName="active" to="/user">User</NavLink></li>
            <li><NavLink activeClassName="active" to="/logout" onClick={props.logout}>Logout</NavLink></li>
            <div className="nav-right"><li><p>{props.user}</p></li></div>
          </ul>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/data" component={Data} />
            <Route path="/user" component={User} />
          </Switch>
        </div>
      </ Router>
    )
  }
  else if (role === "admin") {

    return (
      <Router>
        <div>
          <ul className="header">
            <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
            <li><NavLink activeClassName="active" to="/data">Data</NavLink></li>
            <li><NavLink activeClassName="active" to="/admin">Admin</NavLink></li>
            <li><NavLink activeClassName="active" to="/logout" onClick={props.logout}>Logout</NavLink></li>
            <div className="nav-right"><li><p>{props.user}</p></li></div>
          </ul>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/data" component={Data} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </div>
      </ Router>
    )
  }
  else {
    return (
      <Router>
        <div>
          <ul className="header">
            <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
            <li><NavLink activeClassName="active" to="/restaurants">Restaurants</NavLink></li>
            <div className="nav-right"><li><p>Not logged in</p></li></div>
          </ul>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/restaurants" component={Restaurants} />
          </Switch>
        </div>
      </ Router>
    )

  }
}

export default App;
