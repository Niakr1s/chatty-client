import React from "react"

import ChatBox from "./ChatComponents/ChatBox"
import ChatInput from "./ChatComponents/ChatInput"

import "./Chat.css"
import ChatHeader from "./ChatComponents/ChatHeader"

import ChatUserList from "./ChatComponents/ChatUserList"
import ChatChatList from "./ChatComponents/ChatChatList"

import AuthModal from "./AuthComponents/AuthModal"

import * as ChatApi from './api/ChatApi'

import HeaderButtons from "./ChatComponents/HeaderButtons"

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
            chats: [],

            showAuthModal: false,
            showUserList: false,
            showChatsList: false,
        }
    }

    componentDidMount = () => {
        this.login()

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
    }

    startRequestOnTimeout = (successTimeout, failureTimeout, apiFn, onFailure) => {
        if (this.state.user.name === "") {
            return;
        }

        apiFn(() => {
            setTimeout(() => {
                this.startRequestOnTimeout(successTimeout, failureTimeout, apiFn, onFailure);
            }, successTimeout)
        }, () => {
            if (onFailure) {
                onFailure();
                return;
            }
            setTimeout(() => {
                this.startRequestOnTimeout(successTimeout, failureTimeout, apiFn, onFailure);
            }, failureTimeout)
        })
    }

    logout = () => {
        console.log(`Logouting user:`, this.state.user)

        ChatApi.UserLogout(this.state.user).then(() => {
            this.setState((prevState) => {
                return { user: { ...prevState.user, name: "" }, chats: [] }
            })
        })
    }

    login = (user) => {
        console.log(`Logging user:`, user)

        ChatApi.UserLogin(user, (data) => this.userLogged(data), (error) => {
            ChatApi.UserLoginLogged(user, (data) => this.userLogged(data), (error) => {
                console.log(`Couldn't login user:`, error)
            })
        })
    }


    userLogged = (user) => {
        console.log(`logged user`, user)
        this.setState((prevState) => {
            return { user: { ...prevState.user, ...user } }
        })
        this.startRequestOnTimeout(10 * 1000, 10 * 1000, ChatApi.KeepAlive, () => this.logout())
        this.startRequestOnTimeout(10 * 1000, 0, ChatApi.Poll, () => this.logout())
        ChatApi.GetChats((chats) => {
            this.setState({
                chats,
            })
        })
    }

    joinChat = (chatname) => {
        ChatApi.JoinChat(chatname, () => {
            this.setState((prevState) => {
                let chat = prevState.chats.find((it) => it.name === chatname)
                if (chat !== undefined) chat.joined = true  // TODO change on events instead
                return prevState
            })
        })
    }


    leaveChat = (chatname) => {
        ChatApi.LeaveChat(chatname, () => {
            this.setState((prevState) => {
                let chat = prevState.chats.find((it) => it.name === chatname)
                if (chat !== undefined) chat.joined = false  // TODO change on events instead
                return prevState
            })
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
        return (
            <div className="chat h700px" >
                <div className="h100 w100">
                    <div className="flex blue space-between chat-header">
                        <ChatHeader
                            user={this.state.user}
                            onLogout={this.logout}
                            onLogin={(user) => {
                                this.login(user)
                            }}
                        ></ChatHeader>
                        <HeaderButtons
                            onAuthClick={() => { this.setState({ showAuthModal: true }) }}
                            onUsersClick={() => { this.setState((prevState) => { return { showUserList: !prevState.showUserList } }) }}
                            onChatsClick={() => { this.setState((prevState) => { return { showChatsList: !prevState.showChatsList } }) }}
                        />
                    </div>
                    <ChatBox
                        messages={this.state.messages}
                    ></ChatBox>
                    <ChatInput
                        user={this.state.user}
                        onPostMessage={this.postMessage}
                    ></ChatInput>
                </div >
                {this.state.showUserList && <ChatUserList
                    close={() => this.setState({ showUserList: false })}
                    loggedUsers={this.state.loggedUsers}
                ></ChatUserList>
                }
                {
                    this.state.showChatsList && <ChatChatList
                        close={() => this.setState({ showChatsList: false })}
                        chats={this.state.chats}
                        joinChat={this.joinChat}
                        leaveChat={this.leaveChat}
                    ></ChatChatList>
                }
                {
                    this.state.showAuthModal ? <AuthModal
                        close={() => this.setState({ showAuthModal: false })}
                        login={(name) => this.login(name)}
                    ></AuthModal> : null
                }
            </div >
        )
    }
}

function sortById(a, b) { return a.id - b.id }

export default Chat