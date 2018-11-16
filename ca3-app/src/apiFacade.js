import URL from './Settings.js';

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

class ApiFacade {
    setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }

    getToken = () => {
        return localStorage.getItem('jwtToken')
    }

    loggedIn = () => {
        const loggedIn = this.getToken() != null;
        return loggedIn;
    }

    logout = () => {
        localStorage.removeItem("jwtToken");
        console.log("Hej");

    }

    fetchData = () => {
        const options = this.makeOptions("GET", true); //True add's the token
        return fetch(URL + "/api/info/getname", options).then(handleHttpErrors);
    }

    login = (user, pass) => {
        const options = this.makeOptions("POST", true, { username: user, password: pass });
        return fetch(URL + "/api/login", options, true)
            .then(handleHttpErrors)
            .then(res => { this.setToken(res.token) })
    }

    addNew = (user, pass) => {
        const options = this.makeOptions("POST", true, { username: user, password: pass });
        return fetch(URL + "/api/addNew", options, true)
            .then(handleHttpErrors)
            .then(res => { this.setToken(res.token) })
    }

    getNumberOfUsers = () =>{
        const options = this.makeOptions("GET", true); //True add's the token
        return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
    }

    getAllUsers = () =>{
        const options = this.makeOptions("GET", true);
        return fetch(URL + "/api/info/admin", options).then(handleHttpErrors);
    }

    getPaginationData = () =>{
        const options = this.makeOptions("GET", true);
        return fetch(URL + "/api/info/list", options).then(handleHttpErrors);
    }
// ?_start=0&_end=10
    makeOptions(method, addToken, body) {
        var opts = {
            method: method,
            headers: {
                "Content-type": "application/json",
                'Accept': 'application/json',
            }
        }
        if (addToken && this.loggedIn()) {
            opts.headers["x-access-token"] = this.getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }
}

const facade = new ApiFacade();
export default facade;

