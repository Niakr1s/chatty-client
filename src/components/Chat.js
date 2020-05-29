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
            username: "",
            activeChat: "",
            chats: new Map(),

            showAuthModal: false,
            showUserList: false,
            showChatsList: false,
        }
    }

    componentDidMount = () => {
        // trying to login
        ChatApi.UserLoginLogged((data) => this.userLogged(data.user))
    }

    startRequestOnTimeout = (successTimeout, failureTimeout, apiFn, onFailure) => {
        if (this.state.username === "") {
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
        console.log(`Logouting user:`, this.state.username)

        ChatApi.UserLogout().then(() => {
            this.setState({ username: "", actuveChat: "", chats: new Map() })
        })
    }

    login = (username) => {
        console.log(`Logging user:`, username)

        ChatApi.UserLogin(username, (data) => this.userLogged(data.user), () => {
            ChatApi.UserLoginLogged((data) => this.userLogged(data.user), (error) => {
                console.log(`Couldn't login user:`, error)
            })
        })
    }


    userLogged = (username) => {
        console.log(`logged user`, username)
        this.setState({ username })
        this.startRequestOnTimeout(10 * 1000, 10 * 1000, ChatApi.KeepAlive, () => this.logout())
        this.startRequestOnTimeout(10 * 1000, 0, ChatApi.Poll, () => this.logout())
        ChatApi.GetChats((chats) => {
            this.setState({ chats: chatArrToMap(chats) })
        })
    }

    joinChat = (chatname) => {
        ChatApi.JoinChat(chatname, () => {
            ChatApi.GetLastMessages(chatname, (messages) => {
                this.setState((prevState) => {
                    prevState.chats.set(chatname, {
                        chat: chatname,
                        joined: true,
                        messages: messages === undefined ? new Map() : messArrToMap(messages)
                    })
                    console.log("joinChat: prevState.chats", prevState.chats)
                    return { chats: prevState.chats, activeChat: chatname }
                })
            })
        })
    }


    leaveChat = (chatname) => {
        ChatApi.LeaveChat(chatname, () => {
            this.setState((prevState) => {
                let chat = prevState.chats.find((it) => it.chat === chatname)
                if (chat !== undefined) chat.joined = false  // TODO change on events instead
                return prevState
            })
        })
    }

    postMessage = (messageText) => {
        if (!this.state.username) { console.log("Can't post message, no logged user!"); return; }

        if (!messageText) { console.log("Can't post empty message!"); return; }

        console.log(`Posting message: "${messageText}" for user`, this.state.username);
        ChatApi.PostMessage({ text: messageText, chat: this.state.activeChat }, (message) => {
            this.appendMessage(message) // TODO remove after impl events
        });
    }

    appendMessage = (message) => {
        this.setState((prevState) => {
            let chats = prevState.chats
            let chat = chats.get(message.chat) || this.newChat(message.chat, false)

            chat.messages.set(message.id, message)

            chats.set(chat.chat, chat)
            return { chats: new Map([...chats.entries()].sort(sortMapByKeyLexic)) }
        })
    }

    newChat = (chatname, joined) => {
        return { chatname, messages: new Map(), joined }
    }

    setActiveChat = (chatname) => {
        this.setState({ activeChat: chatname })
    }

    render() {
        return (
            <div className="chat h100" >
                <div className="h100 w100">
                    <div className="flex blue space-between chat-header">
                        <ChatHeader
                            user={this.state.username}
                            onLogout={this.logout}
                            onLogin={this.login}
                        ></ChatHeader>
                        {/* TODO add class ChatInfo or something */}
                        <span className="float-right">{this.state.activeChat && "Chat: " + this.state.activeChat}</span>
                        <HeaderButtons
                            onAuthClick={() => { this.setState({ showAuthModal: true }) }}
                            onUsersClick={() => { this.setState((prevState) => { return { showUserList: !prevState.showUserList } }) }}
                            onChatsClick={() => { this.setState((prevState) => { return { showChatsList: !prevState.showChatsList } }) }}
                        />
                    </div>
                    <ChatBox
                        chats={this.state.chats}
                        activeChat={this.state.activeChat}
                    ></ChatBox>
                    <ChatInput
                        onPostMessage={this.postMessage}
                    ></ChatInput>
                </div >
                {this.state.showUserList && <ChatUserList
                    close={() => this.setState({ showUserList: false })}
                ></ChatUserList>
                }
                {
                    this.state.showChatsList && <ChatChatList
                        close={() => this.setState({ showChatsList: false })}
                        chats={this.state.chats}
                        activeChat={this.state.activeChat}
                        joinChat={this.joinChat}
                        leaveChat={this.leaveChat}
                        setActiveChat={this.setActiveChat}
                    ></ChatChatList>
                }
                {
                    this.state.showAuthModal ? <AuthModal
                        close={() => this.setState({ showAuthModal: false })}
                        login={this.login}
                    ></AuthModal> : null
                }
            </div >
        )
    }
}

function sortById(a, b) { return a.id - b.id }
function sortByName(a, b) { return a.chat.localeCompare(b.chat) }

function sortMapByKey(a, b) { return a[0] - b[0] }
function sortMapByKeyLexic(a, b) { return a[0].localeCompare(b[0]) }

function chatArrToMap(chats) {
    return new Map([...chats.map((chat) => {
        chat.messages = messArrToMap(chat.messages)
        return [chat.chat, chat]
    })].sort(sortMapByKeyLexic))
}

function messArrToMap(messages) {
    return new Map([...messages.map((message) => [message.id, message])].sort(sortMapByKey))
}


export default Chat