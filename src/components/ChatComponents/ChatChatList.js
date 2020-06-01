import React from "react"

class ChatChatList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div
                id="chat-left-modal"
                className="chat-left"
                onClick={(event) => {
                    if (event.target.id === "chat-left-modal") { this.props.close() }
                }}
            >
                <div className="darkblue chat-left">
                    <div className="userlist-header blue">
                        <span className="userlist-header-text">Chat list</span>
                    </div>
                    <ul className="userlist overflow-y blue-gradient">
                        {Array.from(this.props.chats.keys()).map((chatname) => {
                            let chat = this.props.chats.get(chatname)
                            return <li
                                className={"userlist-item lightblue cursor-default " +
                                    `${(this.props.activeChat === chat.chat) && "chat-active"}`}
                                key={chatname}
                                onClick={() => {
                                    if (!chat.joined) { this.props.joinChat(chat.chat) }
                                    else { this.props.setActiveChat(chat.chat) }
                                    this.props.setRead(chat.chat);
                                }}>{chatname}
                                {chat.joined && <span
                                    className="float-right joined"
                                    title="unread counter"
                                >{chat.unread && "new"}</span>}</li> // TODO instead 0 - unread messages
                        })}
                    </ul>
                    <div className="userlist-footer darkblue"></div>
                </div>
            </div >
        )
    }
}

export default ChatChatList
