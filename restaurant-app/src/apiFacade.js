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
        return fetch(URL + "/api/adduser", options, true)
            .then(handleHttpErrors)
            .then(res => { this.setToken(res.token) })
    }

    getNumberOfUsers = () => {
        const options = this.makeOptions("GET", true); //True add's the token
        return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
    }

    getAllUsers = () => {
        const options = this.makeOptions("GET", true);
        return fetch(URL + "/api/info/admin", options).then(handleHttpErrors);
    }

    getPaginationData = () => {
        const options = this.makeOptions("GET", true);
        return fetch(URL + "/api/info/list", options).then(handleHttpErrors);
    }

    getAllRestaurants = () => {
        const options = this.makeOptions("GET", true);
        return fetch(URL + "/api/info/getlists", options).then(handleHttpErrors);
    }

    getAllUsers = () => {
        const options = this.makeOptions("GET", true);
        return fetch(URL + "/api/info/getusers", options).then(handleHttpErrors);
    }

    getMenuItems = (id) => {
        const options = this.makeOptions("GET", true);
        return fetch(URL + "/api/info/getmenu?id=" + id, options).then(handleHttpErrors);
    }

    getMyRestaurants = (owner) => {
        const options = this.makeOptions("GET", true);
        return fetch(URL + "/api/info/getmyrestaurants?owner=" + owner, options).then(handleHttpErrors);
    }

    addRestaurant = (restaurant) => {
        const options = this.makeOptions("POST", true, restaurant);
        return fetch(URL + "/api/info/addrest", options).then(handleHttpErrors);
    }

    editRestaurant = (restaurant) => {
        const options = this.makeOptions("PUT", true, restaurant);
        return fetch(URL + "/api/info/editrest", options).then(handleHttpErrors);
    }

    editMenuItem = (menuItem) => {
        const options = this.makeOptions("PUT", true, menuItem);
        return fetch(URL + "/api/info/editmenuitem", options).then(handleHttpErrors);
    }

    deleteRestaurant = (id) => {
        const options = this.makeOptions("DELETE", true);
        return fetch(URL + "/api/info?id=" + id, options).then(handleHttpErrors);
    }

    deleteMenuItem = (id) => {
        const options = this.makeOptions("DELETE", true);
        return fetch(URL + "/api/info/deletemenuitem?id=" + id, options).then(handleHttpErrors);
    }

    addMenuItem = (menuItem) => {
        const options = this.makeOptions("POST", true, menuItem);
        return fetch(URL + "/api/info/addmenuitem", options).then(handleHttpErrors);
    }

    getSingleMenuItem = (id) => {
        const options = this.makeOptions("GET", true);
        return fetch(URL + "/api/info/getmenuitem?id=" + id, options).then(handleHttpErrors);
    }

    getSingleRestaurant = (id) => {
        const options = this.makeOptions("GET", true);
        return fetch(URL + "/api/info/getrestaurant?id=" + id, options).then(handleHttpErrors);
    }

    getFoodTypes = () => {
        const options = this.makeOptions("GET", true);
        return fetch(URL + "/api/info/getfoodtypes", options).then(handleHttpErrors);
    }

    getZipCodes = () => {
        const options = this.makeOptions("GET", true);
        return fetch(URL + "/api/info/getzipcodes", options).then(handleHttpErrors);
    }

    addFavRest = (favRest) => {
        const options = this.makeOptions("PUT", true, favRest);
        return fetch(URL + "/api/info/addfavrest", options).then(handleHttpErrors);
    }

    getFavRestaurants = (userName) => {
        const options = this.makeOptions("GET", true);
        return fetch(URL + "/api/info/getfavrests?userName=" + userName, options).then(handleHttpErrors);
    }

    getSingleFavRest = (userName, restID) => {
        const options = this.makeOptions("GET", true);
        return fetch(URL + "/api/info/getsinglefavrest?userName=" + userName + "&restID=" + restID, options).then(handleHttpErrors);
    }
    
    editFavRest = (favRest) => {
        const options = this.makeOptions("PUT", true, favRest);
        return fetch(URL + "/api/info/editfavrest", options).then(handleHttpErrors);
    }
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

