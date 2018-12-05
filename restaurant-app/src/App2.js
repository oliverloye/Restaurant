import React, { Component } from "react"
import facade from "./apiFacade";
import Restaurants from './Restaurants';
import MyRestaurants from './MyRestaurants.js';
import AddRestaurant from './AddRestaurant.js';
import Customer from './Customer.js';
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
        facade.login(user, pass)
            .then(res => this.setState({ loggedIn: true, username: user }));
    }

    render() {
        let role = "";
        if (localStorage.jwtToken) {
            let jwt = localStorage.jwtToken;
            let jwtData = jwt.split('.')[1]
            let decodedJwtJsonData = window.atob(jwtData)
            let decodedJwtData = JSON.parse(decodedJwtJsonData)
            role = decodedJwtData.roles
        }

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
        } else if (role === 'rest_owner') {
            return (
                <Router>
                    <div>
                        <ul className="header">
                            <li><NavLink exact activeClassName="active" to="/myrestaurants">MyRestaurants</NavLink></li>
                            <li><NavLink activeClassName="active" to="/addrestaurant">Add Restaurant</NavLink></li>
                            <li><NavLink activeClassName="active" to="/logout" onClick={this.logout}>Logout</NavLink>
                            </li>
                            <div className="nav-right">
                                <li><p>{this.state.username}</p></li>
                            </div>
                        </ul>
                        <Switch>
                            {/* path={`${match.path}/details/:userfirst`} */}
                            {/* <Route exact path={`${match.path}/:id`}
                                render={(props, { match }) => <EditMenu id={match.params.id} {...props} username={this.state.username} />} /> */}
                            <Route path="/myrestaurants"
                                render={(props) => <MyRestaurants {...props} username={this.state.username} />} />
                            <Route path="/addrestaurant"
                                render={(props) => <AddRestaurant {...props} restOwner={this.state.username} />} />
                        </Switch>
                    </div>
                </ Router>
            )
        } else if (role === 'customer') {
            return (
                <Router>
                    <div>
                        <ul className="header">
                            <li><NavLink exact activeClassName="active" to="/">Restaurants</NavLink></li>
                            <li><NavLink activeClassName="active" to="/customer">My page</NavLink></li>
                            <li><NavLink activeClassName="active" to="/logout" onClick={this.logout}>Logout</NavLink>
                            </li>
                            <div className="nav-right">
                                <li><p>{this.state.username}</p></li>
                            </div>
                        </ul>
                        <Switch>

                            <Route exact path="/" 
                                    render={(props) => <Restaurants {...props} username={this.state.username}/>}/>
                            <Route path="/customer"
                                    render={(props) => <Customer {...props} username={this.state.username}/>}/>
                        </Switch>
                    </div>
                </ Router>
            )
        } else {
            return (
                <Router>
                    <div>
                        <ul className="header">
                            <li><NavLink exact activeClassName="active" to="/adduser">Add user</NavLink></li>
                            <li><NavLink activeClassName="active" to="/deleteuser">Delete user</NavLink></li>
                            <li><NavLink activeClassName="active" to="/logout" onClick={this.logout}>Logout</NavLink>
                            </li>
                            <div className="nav-right">
                                <li><p>{this.state.username}</p></li>
                            </div>
                        </ul>
                        <Switch>
                            <Route path="/adduser" render={(props) => <AddUser {...props} />} />
                            <Route path="/deleteuser"
                                render={(props) => <DeleteUser {...props} username={this.state.username} />} />
                            <Route path="/user"
                                render={(props) => <AddRestaurant {...props} restOwner={this.state.username} />} />
                        </Switch>
                    </div>
                </ Router>
            )
        }
    }
}

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = { username: '', password: '' }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    resetForm = () => {
        this.setState({ username: '', password: '' });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        facade.addNew(this.state.username, this.state.password);
        this.resetForm();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Username</label>
                    <input type="text" name="username" value={this.state.username} placeholder="username"
                        onChange={this.handleChange} />
                    <label>Password</label>
                    <input type="password" name="password" value={this.state.password} placeholder="password"
                        onChange={this.handleChange} />
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

class DeleteUser extends Component {
    constructor(props) {
        super(props);
        this.state = { userList: [] }
    }

    async componentDidMount() {
        const userList = await facade.getAllUsers();
        this.setState({ userList });
        console.log(this.state.userList);
    }

    handleClick = async (userName) => {
        console.log('success: ' + userName);
        //this.setState({ edit: true, editID: id })
        await facade.deleteUser(userName);
        const userList = await facade.getAllUsers();
        this.setState({ userList });

    }

    render() {
        const tableData = this.state.userList.map((user) =>
            <SingleData key={user.userName}
                userName={user.userName}
                onclicking={() => this.handleClick(user.userName)} />
        );
        return <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>User name</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
        </div>
    }

}

function SingleData(props) {
    const userName = props.userName;
    return (
        <tr>
            <td>{userName}</td>
            <td>
                <button type="button" onClick={props.onclicking}>Delete (u/s)</button>
            </td>
        </tr>
    );
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
                <form onSubmit={this.login} onChange={this.onChange}>
                    <fieldset>
                        <legend>Login:</legend>
                        <input placeholder="User Name" id="username" />
                        <input placeholder="Password" id="password" type="password" />
                        <button>Login</button>
                    </fieldset>
                </form>
                <br></br>
            </div>
        )
    }
}

export default App;
