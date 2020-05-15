import React from "react"

import ChatBox from "./ChatComponents/ChatBox"
import ChatInput from "./ChatComponents/ChatInput"

import "./Chat.css"
import ChatHeader from "./ChatComponents/ChatHeader"

import ChatUserList from "./ChatComponents/ChatUserList"

import * as ChatApi from './api/ChatApi'

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: "",
                hash: 0,
            },
            messages: [],
            activeUsers: [],
        }
    }

    componentDidMount = () => {
        ChatApi.GetLastNMessages(100, (messages) => {
            this.setState({
                messages: messages,
            })
        });

        ChatApi.GetClientID((data) => {
            this.clientID = data.clientID
            console.log(`Got clientID: ${this.clientID}, starting long poll...`)
            this.startPollMessages();
            this.startPollUserActions();
        })

    }

    startPollUserActions = () => {
        ChatApi.PollUserActions(this.clientID, (userAction) => {
            console.log(`Got new user action`, userAction)
            this.appendUserAction(userAction)
        }).then(() => {
            this.startPollUserActions();
        })
    }


    startPollMessages = () => {
        ChatApi.PollMessages(this.clientID, (message) => {
            console.log(`Got new message`, message)
            this.appendMessage(message)
        }).then(() => {
            this.startPollMessages(this.clientID)
        })
    }

    logout = () => {
        console.log(`Logouting user:`, this.state.user)
        this.setState((prevState) => {
            return {
                user: {
                    name: "",
                    hash: prevState.user.hash,
                }
            }
        })
    }

    login = (name) => {
        console.log("hash:", this.state.user, this.state.user.hash)
        let user = {
            name,
            hash: this.state.user.hash,
        }
        console.log(`Logging user:`, user)

        ChatApi.UserLogin(user, (user) => {
            console.log(`user logged`, user)
            this.setState({
                user,
            })
            console.log("state: ", this.state.user)
            // TODO update cookies
        })
    }

    postMessage = (message) => {
        if (!this.state.user) { console.log("Can't post message, no logged user!"); return; }

        if (!message) { console.log("Can't post empty message!"); return; }

        console.log(`Posting message: "${message}" for user`, this.state.user);
        ChatApi.PostMessage({ user: this.state.user, text: message }, (message) => {
            this.appendMessage(message)
        });
    }

    appendUserAction = (userAction) => {
        this.setState((prevState, props) => {
            let activeUsers = [...prevState.activeUsers];

            let user = { ...prevState.user }

            if (userAction.action === "login") {
                activeUsers.push(userAction.name);
            } else if (userAction.action === "logout") {
                activeUsers = activeUsers.filter((it) => it !== userAction.name)

                // if it is our username = logout!
                if (userAction.name === this.state.user.name) {
                    user.name = ""
                }
            }

            activeUsers = activeUsers.filter((name) => name !== prevState.user.name);
            activeUsers.sort();

            return { activeUsers, user };
        })
    }

    appendMessage = (message) => {
        this.setState((prevState, props) => {
            let messages = this.state.messages.filter((it) => it.id !== message.id)
            messages.push(message)
            messages.sort(sortById)
            return { messages }
        })
    }

    render() {
        return (
            <div className="chat h700px">
                <div className="chat-left h100">
                    <ChatHeader
                        user={this.state.user}
                        onLogout={this.logout}
                        onUsernameSubmit={this.login}
                    ></ChatHeader>
                    <ChatBox
                        messages={this.state.messages}
                    ></ChatBox>
                    <ChatInput
                        user={this.state.user}
                        onPostMessage={this.postMessage}
                    ></ChatInput>
                </div >
                <ChatUserList activeUsers={this.state.activeUsers}></ChatUserList>
            </div>
        )
    }
}

function sortById(a, b) { return a.id - b.id }

export default Chat