import React from "react"

class ChatChatList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div
                id="chat-left-modal"
                className="chat-modal"
                onClick={(event) => {
                    if (event.target.id === "chat-left-modal") { this.props.close() }
                }}
            >
                <div className="chat-left darkblue">
                    <div className="userlist-header blue">
                        <span className="userlist-header-text">Chat list</span>
                    </div>
                    <ul className="userlist overflow-y blue-gradient">
                        {this.props.chats.map((chat) => {
                            return <li
                                className={"userlist-item lightblue cursor-default " +
                                    `${(this.props.activeChat === chat.name) && "chat-active"}`}
                                key={chat.name}
                                onClick={() => {
                                    if (!chat.joined) { this.props.joinChat(chat.name) }
                                    else { this.props.setActiveChat(chat.name) }
                                }}>{chat.name}
                                {chat.joined && <span
                                    className="float-right joined"
                                    title="unread counter"
                                >0</span>}</li> // TODO instead 0 - unread messages
                        })}
                    </ul>
                    <div className="userlist-footer darkblue"></div>
                </div>
            </div >
        )
    }
}

export default ChatChatList