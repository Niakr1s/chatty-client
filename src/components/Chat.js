import React from "react"

import ChatBox from "./ChatComponents/ChatBox"
import ChatInput from "./ChatComponents/ChatInput"

import "./Chat.css"
import ChatHeader from "./ChatComponents/ChatHeader"

import ChatUserList from "./ChatComponents/ChatUserList"

import AuthModal from "./AuthComponents/AuthModal"

import * as ChatApi from './api/ChatApi'

import AuthBtn from "./ChatComponents/AuthBtn"

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: "",
                loginToken: 0,
            },
            messages: [],
            loggedUsers: [],
            showAuthModal: false,
        }
    }

    componentDidMount = () => {
        ChatApi.GetLastNMessages(100, (messages) => {
            this.setState({
                messages: messages,
            })
        });

        ChatApi.GetLoggedUsers((users) => {
            this.setState((prevState) => {
                return {
                    loggedUsers: users.sort(),
                }
            })
        })

        ChatApi.GetClientID((data) => {
            this.clientID = data.clientID
            console.log(`Got clientID: ${this.clientID}, starting long poll...`)
            this.startPollMessages();
            this.startPollUserActions();
            this.startKeepAlive();
        })

    }

    startKeepAlive = () => {
        const timeout = 10 * 1000;

        if (this.state.user.name === "") {
            setTimeout(() => {
                this.startKeepAlive();
            }, timeout)
            return;
        }

        ChatApi.KeepAlive(this.state.user, () => {
            console.log("Keep-alive package success", this.state.user)
            setTimeout(() => {
                this.startKeepAlive();
            }, timeout)
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

        ChatApi.UserLogout(this.state.user, () => {
            this.setState((prevState) => {
                return {
                    user: Object.assign({}, prevState.user, {
                        name: "",
                    })
                }
            })
        })
    }

    login = (user) => {
        console.log(`Logging user:`, user)

        ChatApi.UserLogin(user, (user) => {
            this.setState((prevState) => {
                return { user: Object.assign({}, { ...prevState.user }, user) }
            })
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
        // if it's us, check if it pseudo logout, happening after login with password
        if (userAction.action === "logout" && userAction.name === this.state.user.name) {
            // to ensure, we are sending KeepAlivePackage
            // and on error - clearing user.name
            ChatApi.KeepAlive(this.state.user, () => { }, (error) => {
                this.setState({ user: { ...this.state.user, name: "" } })
            })
        }

        this.setState((prevState, props) => {
            let loggedUsers = [...prevState.loggedUsers];

            let user = { ...prevState.user }

            if (userAction.action === "login") {
                loggedUsers.push(userAction.name);
            } else if (userAction.action === "logout") {
                loggedUsers = loggedUsers.filter((it) => it !== userAction.name)

                // if it is our username = logout!
                if (userAction.name === this.state.user.name) {
                    ChatApi.KeepAlive(this.state.user, () => { }, (error) => { user.name = "" })
                }
            }

            loggedUsers = loggedUsers.filter((name) => name !== prevState.user.name);
            loggedUsers.sort();

            return { loggedUsers, user };
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
        console.log(this.state)
        return (
            <div className="chat h700px">
                <div className="chat-left h100">
                    <div className="flex space-between blue">
                        <ChatHeader
                            user={this.state.user}
                            onLogout={this.logout}
                            onLogin={(user) => {
                                this.login(user)
                            }}
                        ></ChatHeader>
                        <AuthBtn onAuthClick={() => { this.setState({ showAuthModal: true }) }} />
                    </div>
                    <ChatBox
                        messages={this.state.messages}
                    ></ChatBox>
                    <ChatInput
                        user={this.state.user}
                        onPostMessage={this.postMessage}
                    ></ChatInput>
                </div >
                <ChatUserList loggedUsers={this.state.loggedUsers}></ChatUserList>
                {this.state.showAuthModal ? <AuthModal
                    close={() => this.setState({ showAuthModal: false })}
                    login={(name) => this.login(name)}
                ></AuthModal> : null
                }
            </div>
        )
    }
}

function sortById(a, b) { return a.id - b.id }

export default Chat