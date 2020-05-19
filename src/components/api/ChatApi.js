import axios from 'axios'


const prefix = "http://127.0.0.1:8080"

// returns data
export function PostMessage(message, onData, onErr) {
    return axios.post(prefix + "/api/postMessage", message).then((response) => {
        // console.log("PostMessage succesful", response)
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("PostMessage error", error);
        if (onErr) onErr(error)
    })
}

export function GetMessage(id, onData, onErr) {
    return axios.get(prefix + `/api/getMessage/${id}`).then((response) => {
        // console.log("GetMessage succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("GetMessage error", error);
        if (onErr) onErr(error)
    })
}


export function GetClientID(onData, onErr) {
    return axios.get(prefix + `/api/getClientID`).then((response) => {
        // console.log("GetClientID succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("GetClientID error", error);
        if (onErr) onErr(error)
    })
}

export function GetLastNMessages(n, onData, onErr) {
    axios.get(prefix + `/api/getLastNMessages/${n}`).then((response) => {
        // console.log("GetLastNMessages succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("GetLastNMessages error", error);
        if (onErr) onErr(error)
    })
}

export function PollMessages(clientID, onData) {
    return axios.get(prefix + `/api/pollMessage/${clientID}`, {}).then((response) => {
        // console.log("PollMessage succesful", response);
        if (onData) onData(response.data)
    }).catch(() => {
        console.log("not an error, jsut message poll timeout")
    })
}

export function PollUserActions(clientID, onData) {
    return axios.get(prefix + `/api/pollUserActions/${clientID}`, {}).then((response) => {
        // console.log("PollUserActions succesful", response);
        if (onData) onData(response.data)
    }).catch(() => {
        console.log("not an error, jsut users actions poll timeout")
    })
}

export function UserLogin(user, onData, onErr) {
    return axios.post(prefix + `/api/login`, user).then((response) => {
        // console.log("UserLogin succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("couldn't login user", user, error)
        if (onErr) onErr(error)
    })
}

export function UserLogout(user, onData, onErr) {
    return axios.post(prefix + `/api/logout`, user).then((response) => {
        // console.log("UserLogout succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("couldn't logout user", user, error)
        if (onErr) onErr(error)
    })
}

export function KeepAlive(user, onData, onErr) {
    return axios.put(prefix + `/api/keepalive`, user).then((response) => {
        // console.log("KeepAlive succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("couldn't keepalive user", user, error)
        if (onErr) onErr(error)
    })
}

export function GetLoggedUsers(onData, onErr) {
    return axios.get(prefix + `/api/getLoggedUsers`).then((response) => {
        // console.log("GetLoggedUsers succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("couldn't get logged users", error)
        if (onErr) onErr(error)
    })
}

export function UserRegister(user, onData, onErr) {
    return axios.post(prefix + `/api/register`, user).then((response) => {
        // console.log("UserRegister succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("couldn't register user", user, error)
        if (onErr) onErr(error)
    })
}

export function GetAuthToken(user, onData, onErr) {
    return axios.post(prefix + `/api/getAuthToken`, user).then((response) => {
        // console.log("UserRegister succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("couldn't get auth token", user, error)
        if (onErr) onErr(error)
    })
}