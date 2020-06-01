import axios from 'axios'


const prefix = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://chatsie.herokuapp.com"

// returns data
export function PostMessage(message, onData, onErr) {
    console.log("PostMessage start", message);
    return axios.post(prefix + "/api/loggedonly/postMessage", message, { withCredentials: true }).then((response) => {
        console.log("PostMessage succes", message, response.data)
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("PostMessage fail", message, error);
        if (onErr) onErr(error)
    })
}

export function GetLastMessages(chatname, onData, onErr) {
    console.log("GetLastMessages start", chatname);
    axios.post(prefix + `/api/loggedonly/getLastMessages`, { chat: chatname }, { withCredentials: true }).then((response) => {
        console.log("GetLastMessages succes", chatname, response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("GetLastMessages fail", chatname, error);
        if (onErr) onErr(error)
    })
}


export function Poll(onData, onErr) {
    console.log("Poll start");
    return axios.get(prefix + `/api/loggedonly/poll`, { withCredentials: true }).then((response) => {
        console.log("Poll succes", response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("Poll fail", error);
        if (onErr) onErr(error)
    })
}

export function UserLogin(username, onData, onErr) {
    console.log("UserLogin start", username);
    return axios.post(prefix + `/api/login`, { user: username }, { withCredentials: true }).then((response) => {
        console.log("UserLogin succes", username, response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("UserLogin fail", username, error.data);
        if (onErr) onErr(error)
    })
}

// logins only with cookie data
export function UserLoginLogged(onData, onErr) {
    console.log("UserLoginLogged start");
    return axios.post(prefix + `/api/loggedonly/login`, {}, { withCredentials: true }).then((response) => {
        console.log("UserLoginLogged succes", response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("UserLoginLogged fail", error);
        if (onErr) onErr(error)
    })
}

export function UserLogout(onData, onErr) {
    console.log("UserLogout start")
    return axios.post(prefix + `/api/loggedonly/logout`, {}, { withCredentials: true }).then((response) => {
        console.log("UserLogout succes", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("UserLogout fail", error)
        if (onErr) onErr(error)
    })
}

export function KeepAlive(onData, onErr) {
    // console.log("KeepAlive start")
    return axios.put(prefix + `/api/loggedonly/keepalive`, {}, { withCredentials: true }).then((response) => {
        // console.log("KeepAlive succes", response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        // console.log("KeepAlive fail", error)
        if (onErr) onErr(error)
    })
}

export function UserRegister(user, onData, onErr) {
    console.log("UserRegister start", user);
    return axios.post(prefix + `/api/register`, user).then((response) => {
        console.log("UserRegister succes", user, response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("UserRegister fail", user, error)
        if (onErr) onErr(error)
    })
}

export function Authorize(user, onData, onErr) {
    console.log("Authorize start", user);
    return axios.post(prefix + `/api/authorize`, user, { withCredentials: true }).then((response) => {
        console.log("Authorize succes", user, response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("Authorize fail", user, error)
        if (onErr) onErr(error)
    })
}

export function GetChats(onData, onErr) {
    console.log("GetChats start")
    return axios.get(prefix + `/api/loggedonly/getChats`, { withCredentials: true }).then((response) => {
        console.log("GetChats succes", response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("GetChats fail", error)
        if (onErr) onErr(error)
    })
}

export function GetUsers(chatname, onData, onErr) {
    console.log("GetUsers start", chatname)
    return axios.post(prefix + `/api/loggedonly/getUsers`, { chat: chatname }, { withCredentials: true }).then((response) => {
        console.log("GetUsers succes", response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("GetUsers fail", error)
        if (onErr) onErr(error)
    })
}

export function JoinChat(chatname, onData, onErr) {
    console.log("JoinChat start", chatname);
    return axios.post(prefix + `/api/loggedonly/joinChat`, { chat: chatname }, { withCredentials: true }).then((response) => {
        console.log("JoinChat succes", chatname, response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("JoinChat fail", chatname, error)
        if (onErr) onErr(error)
    })
}

export function LeaveChat(chatname, onData, onErr) {
    console.log("LeaveChat start", chatname)
    return axios.post(prefix + `/api/loggedonly/leaveChat`, { chat: chatname }, { withCredentials: true }).then((response) => {
        console.log("LeaveChat succes", chatname, response.data);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("LeaveChat fail", chatname, error)
        if (onErr) onErr(error)
    })
}