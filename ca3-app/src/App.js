import React, { Component } from "react"
import facade from "./apiFacade";
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false }
  }

  logout = () => {
    facade.logout();
    this.setState({ loggedIn: false });
  } //TODO

  login = (user, pass) => {
    facade.login(user, pass)
      .then(res => this.setState({ loggedIn: true }));
  } //TODO

  addNew = (user, pass) => {
    facade.addNew(user, pass) // SKAL MÅSKE ÆNDRES HERUNDER?
      .then(res => this.setState({ loggedIn: true }));
  } //TODO

  render() {
    return (
      <div>
        {!this.state.loggedIn ? (<Initial login={this.login} addNew={this.addNew} />) :
          (<div>
            <LoggedIn logout={this.logout} />
            {/* <Link to="/" onClick={this.logout}>Logout</Link> */}
            {/* <button onClick={this.logout}>Logout</button> */}
          </div>)}
      </div>
    )
  }

  /* render() {
    return (
      <div>
        {!this.state.loggedIn ? (<LogIn login={this.login} addNew={this.addNew} />) :
          (<div> 
            <LoggedIn logout={this.logout}/>
          </div>)}
      </div>
    )
  } */
}

class Initial extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul className="header">
            <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
            <li><NavLink activeClassName="active" to="/login">Login</NavLink></li>
          </ul>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" render={() =>
              <LogIn login={this.props.login} addNew={this.props.addNew} />} />
          </Switch>
        </div>
      </ Router>
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
        <h2>Welcome to CA3</h2>
        <br></br>
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



class User extends Component {
  constructor(props) {
    super(props);
    this.state = { usernum: "Fetching usernum..." };
  }

  componentDidMount() {
    facade.getNumberOfUsers().then(res => this.setState({ usernum: res }));
  }
  render() {
    return (
      <div>
        {this.state.usernum}
      </div>
    )
  }
}

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { allUsers: "Fetching allUsers..." };
  }

  componentDidMount() {
    facade.getAllUsers().then(res => this.setState({ allUsers: res }));
  }
  render() {
    return (
      <div>
        <h4>Admin page</h4>
        {this.state.allUsers}
      </div>
    );
  }
}

function Header(props) {
  return (
    <Router>
      <div>
        <ul className="header">
          <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
          <li><NavLink activeClassName="active" to="/luke">Luke</NavLink></li>
          <li><NavLink activeClassName="active" to="/user">User</NavLink></li>
          <li><NavLink activeClassName="active" to="/admin">Admin</NavLink></li>
          <li><NavLink activeClassName="active" to="/logout" onClick={props.logout}>Logout</NavLink></li>
          <div className="nav-right"><li><p>{props.user}</p></li></div>
        </ul>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/luke" component={Luke} />
          <Route path="/user" component={User} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </div>
    </ Router>
  )
}

function Luke() {
  return (
    <div>
      <h4>Luke</h4>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h4>Welcome.</h4>
    </div>
  );
}

export default App;
