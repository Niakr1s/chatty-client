import axios from 'axios'


const prefix = "http://127.0.0.1:8080"

// returns data
export function PostMessage(message, onData) {
    return axios.post(prefix + "/api/postMessage", message).then((response) => {
        // console.log("PostMessage succesful", response)
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("PostMessage error", error);
    })
}

export function GetMessage(id, onData) {
    return axios.get(prefix + `/api/getMessage/${id}`).then((response) => {
        // console.log("GetMessage succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("GetMessage error", error);
    })
}


export function GetClientID(onData) {
    return axios.get(prefix + `/api/getClientID`).then((response) => {
        // console.log("GetClientID succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("GetClientID error", error);
    })
}

export function GetLastNMessages(n, onData) {
    return axios.get(prefix + `/api/getLastNMessages/${n}`).then((response) => {
        // console.log("GetLastNMessages succesful", response);
        if (onData) onData(response.data)
    }).catch((error) => {
        console.log("GetLastNMessages error", error);
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