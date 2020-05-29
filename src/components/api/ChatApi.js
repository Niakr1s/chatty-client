import axios from 'axios'


const prefix = "http://127.0.0.1:8080"

// returns data
export function PostMessage(message, onData, onErr) {
    return axios.post(prefix + "/api/loggedonly/postMessage", message, { withCredentials: true }).then((response) => {
        // console.log("PostMessage succesful", response)
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("PostMessage error", error);
        if (onErr) onErr(error)
    })
}

export function GetMessage(id, onData, onErr) {
    return axios.get(prefix + `/api/getMessage/${id}`, { withCredentials: true }).then((response) => {
        // console.log("GetMessage succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("GetMessage error", error);
        if (onErr) onErr(error)
    })
}

export function GetLastMessages(chatname, onData, onErr) {
    console.log("GetLastMessages start", chatname);
    axios.post(prefix + `/api/loggedonly/getLastMessages`, { chatname }, { withCredentials: true }).then((response) => {
        // console.log("GetLastMessages succesful", response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("GetLastMessages error", error);
        if (onErr) onErr(error)
    })
}


export function Poll(onData, onErr) {
    return axios.get(prefix + `/api/loggedonly/poll`, { withCredentials: true }).then((response) => {
        console.log("Poll succes", response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("Poll failure", error);
        if (onErr) onErr(error)
    })
}

export function UserLogin(user, onData, onErr) {
    console.log("UserLogin start login", user);
    return axios.post(prefix + `/api/login`, user, { withCredentials: true }).then((response) => {
        console.log("UserLogin succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("UserLogin failure", error.data);
        if (onErr) onErr(error)
    })
}

// logins only with cookie data
export function UserLoginLogged(user, onData, onErr) {
    return axios.post(prefix + `/api/loggedonly/login`, user, { withCredentials: true }).then((response) => {
        // console.log("UserLogin succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        if (onErr) onErr(error)
    })
}

export function UserLogout(user, onData, onErr) {
    return axios.post(prefix + `/api/loggedonly/logout`, user, { withCredentials: true }).then((response) => {
        // console.log("UserLogout succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("couldn't logout user", user, error)
        if (onErr) onErr(error)
    })
}

export function KeepAlive(onData, onErr) {
    return axios.put(prefix + `/api/loggedonly/keepalive`, {}, { withCredentials: true }).then((response) => {
        console.log("KeepAlive succes", response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("KeepAlive failure", error)
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

export function Authorize(user, onData, onErr) {
    return axios.post(prefix + `/api/authorize`, user, { withCredentials: true }).then((response) => {
        // console.log("UserRegister succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("couldn't authorize", user, error)
        if (onErr) onErr(error)
    })
}

export function GetChats(onData, onErr) {
    return axios.get(prefix + `/api/loggedonly/getChats`, { withCredentials: true }).then((response) => {
        console.log("GetChats succesful", response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        // console.log("GetChats failure", error)
        if (onErr) onErr(error)
    })
}

export function JoinChat(chatname, onData, onErr) {
    return axios.post(prefix + `/api/loggedonly/joinChat`, { chatname }, { withCredentials: true }).then((response) => {
        console.log("JoinChat succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        // console.log("JoinChat failure", error)
        if (onErr) onErr(error)
    })
}

export function LeaveChat(chatname, onData, onErr) {
    return axios.post(prefix + `/api/loggedonly/leaveChat`, { chatname }, { withCredentials: true }).then((response) => {
        // console.log("LeaveChat succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        // console.log("LeaveChat failure", error)
        if (onErr) onErr(error)
    })
}