import React from "react"

class ChatChatList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("chatchatlist", this.props.chats)
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
                            let spanContents;
                            if (chat.joined) {
                                if (chat.unread !== undefined && chat.unread > 0) {
                                    spanContents = chat.unread;
                                }
                            } else {
                                spanContents = "join"
                            }
                            return <li
                                className={"userlist-item lightblue cursor-default " +
                                    `${(this.props.activeChat === chat.chat) ? "chat-active " : ""}`}
                                key={chatname}
                                onClick={() => {
                                    if (!chat.joined) { this.props.joinChat(chat.chat) }
                                    else { this.props.setActiveChat(chat.chat) }
                                    this.props.setRead(chat.chat);
                                }}>{chatname}
                                <span
                                    className="float-right joined"
                                    title="unread counter"
                                >{spanContents}</span></li> // TODO instead 0 - unread messages
                        })}
                    </ul>
                    <div className="userlist-footer darkblue"></div>
                </div>
            </div >
        )
    }
}

export default ChatChatList
