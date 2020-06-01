import React from "react"

import ChatBox from "./ChatComponents/ChatBox"
import ChatInput from "./ChatComponents/ChatInput"

import "./Chat.css"
import ChatHeader from "./ChatComponents/ChatHeader"
import ChatInfo from "./ChatComponents/ChatInfo"

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

            // { chat: chatname, messages: [id: {user, chat, id, text, time} ], joined: bool, users: [ username ], unread: bool}
            chats: new SortedMap(),

            showAuthModal: false,
        }
    }

    componentDidMount = () => {
        // trying to login
        ChatApi.UserLoginLogged((data) => this.userLogged(data.user))
    }

    setRead = (chatname) => {
        this.setState(prevState => {
            let chat = prevState.chats.get(chatname);
            if (!chat) return;
            chat.unread = false;
            prevState.chats = prevState.chats.set(chatname, chat);
            return {
                chats: prevState.chats
            }
        })
    }

    processEvent = (event) => {
        let loginLogoutEventProcess = (processUsers) => {
            this.setState(prevState => {
                let chatname = event.event.chat
                let username = event.event.user
                let chats = prevState.chats
                let chat = chats.get(chatname)
                if (chat !== undefined && username !== prevState.username) chat.users = processUsers(chat.users)
                chats = chats.set(chat.chat, chat)
                return {chats}
            });
        }
        

        console.log("Start processing event", event)
        switch (event.type) {
            case "LoginEvent":
                break
            case "LogoutEvent":
                break
            case "ChatJoinEvent":
                loginLogoutEventProcess((users) => users.add(event.event.user))
                break
            case "ChatLeaveEvent":
                loginLogoutEventProcess((users) => users.delete(event.event.user))
                break
            case "ChatCreatedEvent":
                this.setState((prevState) => {
                    prevState.chats = prevState.chats.set(event.event.chat, this.newChat(event.event.chat, false));
                    return {
                        chats: prevState.chats
                    }
                });
                break
            case "ChatRemovedEvent":
                this.setState((prevState) => {
                    prevState.chats = prevState.chats.delete(event.event.chat);
                    return {
                        chats: prevState.chats
                    }
                });
                break
            case "MessageEvent":
                this.setState((prevState) => {
                    let chat = prevState.chats.get(event.event.chat);
                    if (!chat) chat = this.newChat(event.event.chat, false);
                    chat.messages = chat.messages.set(event.event.id, event.event)
                    if (prevState.activeChat !== event.event.chat) {
                        chat.unread = true;
                    }
                    prevState.chats = prevState.chats.set(chat.chat, chat);
                    return {
                        chats: prevState.chats
                    }
                });
                break
            default:
                break
        }
    }

    startRequestOnTimeout = (successTimeout, failureTimeout, apiFn, onFailure, onData) => {
        if (this.state.username === "") {
            return;
        }

        apiFn((data) => {
            if (onData) onData(data)
            setTimeout(() => {
                this.startRequestOnTimeout(successTimeout, failureTimeout, apiFn, onFailure, onData);
            }, successTimeout)
        }, () => {
            if (onFailure) {
                onFailure();
                return;
            }
            setTimeout(() => {
                this.startRequestOnTimeout(successTimeout, failureTimeout, apiFn, onFailure, onData);
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
        this.startRequestOnTimeout(100, 0, ChatApi.Poll, () => this.logout(), this.processEvent )
        ChatApi.GetChats((chats) => {
            this.setState({ chats: chatReportsArrToMap(chats) })
        })
    }

    joinChat = (chatname) => {
        ChatApi.JoinChat(chatname, (chatReport) => {
            this.setState((prevState) => {
                let chats = prevState.chats.set(chatname, chatReportToChat(chatReport))
                return { chats, activeChat: chatname }
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
                let firstActiveChat = chats.find((chat) => chat.joined === true )
                console.log("firstActiveChat", firstActiveChat)
                let activeChat = firstActiveChat ? firstActiveChat.chat : "";
                return { chats, activeChat }
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
        return { chat: chatname, messages: new SortedMap(), joined, users: new SortedSet(), unread: 0 }
    }

    setActiveChat = (chatname) => {
        this.setState({ activeChat: chatname })
    }

    render() {
        console.log(this.state.chats);
        return (
            <div className="chat h100" >
                <ChatChatList
                    close={() => this.setState({ showChatsList: false })}
                    chats={this.state.chats}
                    activeChat={this.state.activeChat}
                    joinChat={this.joinChat}
                    leaveChat={this.leaveChat}
                    setActiveChat={this.setActiveChat}
                    setRead={this.setRead}
                ></ChatChatList>
                <div className="h100 w100">
                    <div className="flex blue space-between chat-header">
                        <ChatHeader
                            user={this.state.username}
                            onLogout={this.logout}
                            onLogin={this.login}
                        ></ChatHeader>
                        <ChatInfo 
                            activeChat={this.state.activeChat}
                            leaveChat={this.leaveChat}
                        ></ChatInfo>
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

function chatReportsArrToMap(chatReports) {
    return chatReports === undefined ? new SortedMap() : new SortedMap([...chatReports.map((chatReport) => {
        return [chatReport.chat, chatReportToChat(chatReport)]
    })], compareLexic)
}

function chatReportToChat(chatReport) {
    return {
        ...chatReport,
        messages: chatReport.messages === undefined ? new SortedMap() : messArrToMap(chatReport.messages),
        users: chatReport.users == undefined ? new SortedSet() : usersArrToSet(chatReport.users)
    }
}

function messArrToMap(messages) {
    return new SortedMap([...messages.map((message) => [message.id, message])])
}

function usersArrToSet(users) {
    return new SortedSet(users.map(user => user.user))
}


export default Chat
