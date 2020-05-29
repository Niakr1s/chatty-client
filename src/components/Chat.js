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

import { SortedMap, SortedSet } from 'immutable-sorted'

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            activeChat: "",
            chats: new SortedMap(),

            showAuthModal: false,
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
            this.setState({ username: "", activeChat: "", chats: new Map() })
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
                ChatApi.GetUsers(chatname, (users) => {
                    this.setState((prevState) => {
                        let chats = prevState.chats.set(chatname, {
                            ...this.newChat(chatname, true),
                            messages: messages === undefined ? new SortedMap() : messArrToMap(messages),
                            users: users === undefined ? new SortedSet() : usersArrToSet(users),
                        })
                        return { chats, activeChat: chatname }
                    })
                })
            })
        })
    }


    leaveChat = (chatname) => {
        ChatApi.LeaveChat(chatname, () => {
            this.setState((prevState) => {
                let chats = prevState.chats
                let chat = chats.get(chatname)
                if (chat !== undefined) chat.joined = false  // TODO change on events instead
                chats = chats.set(chatname, chat)
                return { chats }
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

            chat.messages = chat.messages.set(message.id, message)

            chats.set(chat.chat, chat)
            return { chats }
        })
    }

    newChat = (chatname, joined) => {
        return { chat: chatname, messages: new SortedMap(), joined, users: new SortedSet() }
    }

    setActiveChat = (chatname) => {
        this.setState({ activeChat: chatname })
    }

    render() {
        return (
            <div className="chat h100" >
                <ChatChatList
                    close={() => this.setState({ showChatsList: false })}
                    chats={this.state.chats}
                    activeChat={this.state.activeChat}
                    joinChat={this.joinChat}
                    leaveChat={this.leaveChat}
                    setActiveChat={this.setActiveChat}
                ></ChatChatList>
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
                        chat={this.state.chats.get(this.state.activeChat)}
                    ></ChatBox>
                    <ChatInput
                        onPostMessage={this.postMessage}
                    ></ChatInput>
                </div >
                <ChatUserList
                    close={() => this.setState({ showUserList: false })}
                    chat={this.state.chats.get(this.state.activeChat)}
                ></ChatUserList>
                {this.state.showAuthModal ? <AuthModal
                    close={() => this.setState({ showAuthModal: false })}
                    login={this.login}
                ></AuthModal> : null}
            </div >
        )
    }
}

function compareLexic(a, b) { return a.localeCompare(b) }

function chatArrToMap(chats) {
    return new SortedMap([...chats.map((chat) => {
        chat.messages = messArrToMap(chat.messages)
        chat.users = usersArrToSet(chat.users)
        return [chat.chat, chat]
    })], compareLexic)
}

function messArrToMap(messages) {
    return new SortedMap([...messages.map((message) => [message.id, message])])
}

function usersArrToSet(users) {
    return new SortedSet(users.map(user => user.user))
}


export default Chat