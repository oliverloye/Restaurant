import React, { Component } from "react"
import facade from "./apiFacade";
import Restaurants from './Restaurants';
import MyRestaurants from './MyRestaurants.js';
import AddRestaurant from './AddRestaurant.js';
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { loggedIn: false, role: "", username: "", password: "" }
    }

    logout = () => {
        facade.logout();
        this.setState({ loggedIn: false });
    }

    login = (user, pass) => {
        console.log("In the login method of App2")
        facade.login(user, pass)
            .then(res => this.setState({ loggedIn: true, username: user }));
    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <Router>
                    <div>
                        <ul className="header">
                            <li><NavLink exact activeClassName="active" to="/">Restaurants</NavLink></li>
                            <li><NavLink activeClassName="active" to="/login">Log in</NavLink></li>
                        </ul>
                        <Switch>
                            <Route exact path="/" component={Restaurants} />
                            <Route path="/login" render={(props) => <LogIn {...props} login={this.login} />} />
                        </Switch>
                    </div>
                </Router>
            )
        } else
            return (
                <Router>
                    <div>
                        <ul className="header">
                            <li><NavLink exact activeClassName="active" to="/myrestaurants">MyRestaurants</NavLink></li>
                            <li><NavLink activeClassName="active" to="/addrestaurant">Add Restaurant</NavLink></li>
                            <li><NavLink activeClassName="active" to="/logout" onClick={this.logout}>Logout</NavLink></li>
                            <div className="nav-right"><li><p>{this.state.username}</p></li></div>
                        </ul>
                        <Switch>
                            <Route path="/myrestaurants" render={(props) => <MyRestaurants {...props} username={this.state.username} />} />
                            <Route path="/addrestaurant" render={(props) => <AddRestaurant {...props} restOwner={this.state.username} />} />
                        </Switch>
                    </div>
                </ Router>
            )

    }
}

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "" }
    }

    login = (evt) => {
        evt.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    onChange = (evt) => {
        this.setState({ [evt.target.id]: evt.target.value, msg: "" })
    }

    render() {
        return (
            <div>
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
            </div>
        )
    }
}

export default App;
