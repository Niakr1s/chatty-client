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
                        {Array.from(this.props.chats.keys()).map((chatname) => {
                            let chat = this.props.chats.get(chatname)
                            return <li
                                className={"userlist-item lightblue cursor-default " +
                                    `${(this.props.activeChat === chat.chat) && "chat-active"}`}
                                key={chat.chat}
                                onClick={() => {
                                    if (!chat.joined) { this.props.joinChat(chat.chat) }
                                    else { this.props.setActiveChat(chat.chat) }
                                }}>{chat.chat}
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